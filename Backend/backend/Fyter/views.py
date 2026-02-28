from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Poste, PostImage, PostComment,Certification, PostuledRequest, SoloFinRequest,Chatroom, Message
from .serializers import PosteSerializer,CertificationSerializer, FreelancerProfileSerializer,PostImageSerializer,GetPostesSerializer,CreateCommentSerializer, PostuledRequestSerializer, SoloFinRequestSerializer, ProjectApplicationStatusSerializer, SoloFinStatusSerializer,CustomUserSerializer
from rest_framework.views import APIView
from django.http import Http404
from accounts.models import CustomUser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import viewsets, filters
class PosteView(APIView):
    def post(self, request):  # Add 'self' as the first argument
        if request.method == 'POST':
            serializer = PosteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_these(self,pk):
        try:
            user = CustomUser.objects.get(username=pk)

            post = Poste.objects.filter(user=user)
            return post
        except Poste.DoesNotExist:
            raise Http404    
       
    def get(self,request,pk=None):
        if pk:
            data = self.get_these(pk)
            serializer = GetPostesSerializer(data, many=True)
        else:
            postes = Poste.objects.all()
            serializer = GetPostesSerializer(postes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LikedView(APIView):
    def post(self, request, pk, id):
        try:
            post = get_object_or_404(Poste, id=id)
            user = get_object_or_404(CustomUser, username=pk)
            post.like.add(user)  # Add the user to the likes of the post
            post.save()
            return Response({"message": "Post liked successfully!"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
    def delete(self, request, pk, id):
        try:
            post = get_object_or_404(Poste, id=id)
            user = get_object_or_404(CustomUser, username=pk)
            
            # Check if the user has liked the post
            if user not in post.like.all():
                return Response({"message": "You have not liked this post yet!"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Remove the user from the likes of the post
            post.like.remove(user)
            post.save()
            return Response({"message": "Post unliked successfully!"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateCommentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new comment
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CertificationListCreateView(generics.ListCreateAPIView):
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Certification.objects.filter(user=self.request.user)  # Only user's certifications

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Auto-assign user

class CertificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Certification.objects.filter(user=self.request.user)
    
from .serializers import UserProfileSerializer
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    def put(self, request):
        user = request.user
        if user.role == "freelancer":
            freelancer = user.freelancer  # Assuming OneToOne relation exists
            user_serializer = UserProfileSerializer(user, data=request.data, partial=True)
            freelancer_serializer = FreelancerProfileSerializer(freelancer, data=request.data, partial=True)
            
            # Ensure to call .is_valid() before accessing .errors
            if user_serializer.is_valid() and freelancer_serializer.is_valid():
                user_serializer.save()
                freelancer_serializer.save()
                return Response({"user": user_serializer.data, "freelancer": freelancer_serializer.data})
            
            # Call .is_valid() to avoid accessing errors before validation
            if not user_serializer.is_valid():
                print("User serializer errors:", user_serializer.errors)
            if not freelancer_serializer.is_valid():
                print("Freelancer serializer errors:", freelancer_serializer.errors)

            return Response({"user_errors": user_serializer.errors, "freelancer_errors": freelancer_serializer.errors}, status=400)

        # For other roles
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)




from rest_framework import viewsets
from .models import Project, Service
from .serializers import ProjectSerializer, ServiceSerializer
from .permissions import IsClient, IsFreelancer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsClient]  # Allow only clients

    def get_queryset(self):
        """
        Optionally restricts the returned projects to a given user.
        """
        queryset = Project.objects.all()
        client = self.request.query_params.get('client', None)
        if client is not None:
            queryset = queryset.filter(client_id=client)
        return queryset

    def perform_create(self, serializer):
        # Get the ClientUser instance associated with the current user
        client_user = ClientUser.objects.get(user=self.request.user)
        serializer.save(client=client_user)
        project = serializer.save()
        # Only create chatroom if project type is bettaArena and chatroom doesn't exist
        if project.type == 'bettaArena' and not Chatroom.objects.filter(project=project).exists():
            chatroom = Chatroom.objects.create(
                project=project,
                room_name=project.title,
                owner=project.client.user  # assuming client is a ClientUser with a .user FK
            )
            chatroom.users.add(project.client.user)  # add client as first user


    def perform_update(self, serializer):
        # Ensure the client is the currently authenticated user
        if self.request.user.role == 'client':
            client_user = ClientUser.objects.get(user=self.request.user)
            serializer.save(client=client_user)
        else:
            serializer.save()
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsFreelancer]

    def get_queryset(self):
        queryset = Service.objects.all()
        freelancer = self.request.query_params.get('freelancer', None)
        if freelancer is not None:
            queryset = queryset.filter(freelancer_id=freelancer)
        return queryset
        

    def perform_create(self, serializer):
        freelancer = Freelancer.objects.get(user=self.request.user)
        serializer.save(freelancer=freelancer)

class PublicProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]  # Allow public access for GET requests

    def get_queryset(self):
        """
        Optionally restricts the returned projects based on query parameters.
        """
        queryset = Project.objects.all()
        return queryset
        
class PublicServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]  # Allow public access for GET requests

    def get_queryset(self):
        
        queryset = Service.objects.all()
        
        return queryset
    

   

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Service, Freelancer
from .serializers import ServiceSerializer
@api_view(['GET'])

def getjustfreelancerservice(request, username):
    try:
        user = CustomUser.objects.get(username=username)
        freelancer = Freelancer.objects.get(user=user)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)
    except Freelancer.DoesNotExist:
        return Response({'error': 'Freelancer profile not found.'}, status=404)

    services = Service.objects.filter(freelancer=freelancer)
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)



from .models import ClientUser, Project
@api_view(['GET'])
def get_client_projects_by_username(request, username):
    try:
        user = CustomUser.objects.get(username=username)
        client = ClientUser.objects.get(user=user)
    except (CustomUser.DoesNotExist, ClientUser.DoesNotExist):
        return Response({'error': 'Client not found.'}, status=404)

    projects = Project.objects.filter(client=client)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


from .models import Freelancer, ClientUser
from .serializers import FreelancerSerializer, ClientUserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

class FreelancerListView(generics.ListAPIView):
    queryset = Freelancer.objects.all()
    serializer_class = FreelancerSerializer
    permission_classes = [AllowAny]

class ClientUserListView(generics.ListAPIView):
    queryset = ClientUser.objects.all()
    serializer_class = ClientUserSerializer
    permission_classes = [AllowAny]

class PostuledRequestViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les candidatures aux projets normaux et BettaArena
    """
    serializer_class = PostuledRequestSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['project__title', 'status']
    ordering_fields = ['created_at', 'status']
    
    def get_queryset(self):
        user = self.request.user
        
        # Si l'utilisateur est un client, montrer les candidatures pour ses projets
        if hasattr(user, 'client'):
            return PostuledRequest.objects.filter(project__client__user=user)
        
        # Si l'utilisateur est un freelancer, montrer ses candidatures
        return PostuledRequest.objects.filter(freelancer=user)
    
    @action(detail=False, methods=['get'])
    def my_applications(self, request):
        """Récupérer toutes les candidatures du freelancer connecté"""
        applications = PostuledRequest.objects.filter(freelancer=request.user)
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def project_applications(self, request):
        """Récupérer toutes les candidatures pour les projets du client connecté"""
        if not hasattr(request.user, 'client'):
            return Response(
                {"detail": "Only clients can view project applications."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        project_id = request.query_params.get('project_id')
        if project_id:
            applications = PostuledRequest.objects.filter(
                project__client__user=request.user,
                project_id=project_id
            )
        else:
            applications = PostuledRequest.objects.filter(project__client__user=request.user)
        
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Mettre à jour le statut d'une candidature (accepter/rejeter)"""
        application = self.get_object()
        
        # Vérifier que l'utilisateur est le client propriétaire du projet
        if not hasattr(request.user, 'client') or application.project.client.user != request.user:
            return Response(
                {"detail": "You don't have permission to update this application status."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = ProjectApplicationStatusSerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            # Si le statut est "accepted" pour un projet BettaArena, vérifier le nombre de participants
            if (serializer.validated_data.get('status') == 'accepted' and 
                application.project.type == 'bettaArena'):
                accepted_count = application.project.postuled_requests.filter(status='accepted').count()
                if accepted_count >= 6:
                    return Response(
                        {"detail": "This BettaArena project already has the maximum number of accepted participants (6)."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            serializer.save()
            
            # Si le statut est "accepted", mettre à jour le statut du projet si nécessaire
            if serializer.validated_data.get('status') == 'accepted':
                project = application.project
                if project.status == 'open':
                    project.status = 'in_progress'
                    project.save()
            
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class SoloFinRequestViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les demandes SoloFin
    """
    serializer_class = SoloFinRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Si l'utilisateur est un client, montrer les demandes SoloFin pour ses projets
        if hasattr(user, 'client'):
            return SoloFinRequest.objects.filter(project__client__user=user)
        
        # Si l'utilisateur est un freelancer, montrer ses demandes SoloFin
        return SoloFinRequest.objects.filter(freelancer=user)
    
    @action(detail=False, methods=['get'])
    def my_requests(self, request):
        """Récupérer toutes les demandes SoloFin du freelancer connecté"""
        solofin_requests = SoloFinRequest.objects.filter(freelancer=request.user)
        serializer = self.get_serializer(solofin_requests, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def project_requests(self, request):
        """Récupérer toutes les demandes SoloFin pour les projets du client connecté"""
        if not hasattr(request.user, 'client'):
            return Response(
                {"detail": "Only clients can view SoloFin requests."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        project_id = request.query_params.get('project_id')
        if project_id:
            solofin_requests = SoloFinRequest.objects.filter(
                project__client__user=request.user,
                project_id=project_id
            )
        else:
            solofin_requests = SoloFinRequest.objects.filter(project__client__user=request.user)
        
        serializer = self.get_serializer(solofin_requests, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Mettre à jour le statut d'une demande SoloFin (accepter/rejeter)"""
        solofin_request = self.get_object()
        
        # Vérifier que l'utilisateur est le client propriétaire du projet
        if not hasattr(request.user, 'client') or solofin_request.project.client.user != request.user:
            return Response(
                {"detail": "You don't have permission to update this SoloFin request status."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = SoloFinStatusSerializer(solofin_request, data=request.data, partial=True)
        if serializer.is_valid():
            # Si le statut est "accepted", vérifier qu'aucune autre demande n'est déjà acceptée
            if serializer.validated_data.get('status') == 'accepted':
                if SoloFinRequest.objects.filter(
                    project=solofin_request.project, 
                    status='accepted'
                ).exists():
                    return Response(
                        {"detail": "This SoloFin project already has an accepted freelancer."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Mettre à jour le statut du projet
                project = solofin_request.project
                if project.status == 'open':
                    project.status = 'in_progress'
                    project.save()
            
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class GererPostesView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            post = Poste.objects.get(id=id)
        except Poste.DoesNotExist:
            return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)
        # Optionally, check if request.user is the owner
        if post.user != request.user:
            return Response({'error': 'You do not have permission to edit this post.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PosteSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            post = Poste.objects.get(id=id)
        except Poste.DoesNotExist:
            return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)
        # Optionally, check if request.user is the owner
        if post.user != request.user:
            return Response({'error': 'You do not have permission to delete this post.'}, status=status.HTTP_403_FORBIDDEN)
        post.delete()
        return Response({'message': 'Post deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_services(request):
    user = request.user
    try:
        freelancer = Freelancer.objects.get(user=user)
    except Freelancer.DoesNotExist:
        return Response({'error': 'Freelancer profile not found.'}, status=404)
    services = Service.objects.filter(freelancer=freelancer)
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Project, PostuledRequest, SoloFinRequest, Freelancer
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_to_bettaarena(request, project_id):
    """
    Allow a freelancer to apply to a BettaArena project (max 6 freelancers).
    """
      # Get the Freelancer instance
    try:
        freelancer = request.user.freelancer
    except Freelancer.DoesNotExist:
        return Response({'error': 'You must be a freelancer to apply.'}, status=400)

    try:
        project = Project.objects.get(id=project_id, type='bettaArena')
    except Project.DoesNotExist:
        return Response({'error': 'BettaArena project not found.'}, status=404)

    if project.postuled_requests.count() >= 6:
        return Response({'error': 'Maximum 6 freelancers can apply to this BettaArena project.'}, status=400)

    # Prevent duplicate applications
    if PostuledRequest.objects.filter(project=project, freelancer=request.user).exists():
        return Response({'error': 'You have already applied to this project.'}, status=400)

    postuled_request=PostuledRequest.objects.create(project=project, freelancer=request.user, message=request.data.get('message', ''))
    chatroom = Chatroom.objects.filter(project=project).first()
    if chatroom:
        chatroom.users.add(freelancer.user)  # Use the CustomUser instance
        if postuled_request.message:
            Message.objects.create(
                room=chatroom,
                sender=freelancer.user,  # Use the CustomUser instance
                content=postuled_request.message
            )
    return Response({'success': 'Application submitted.'})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_to_solofin(request, project_id):
    """
    Allow a freelancer to apply to a SoloFin project (many can apply, but only one accepted).
    """
    # Get the Freelancer instance
    try:
        freelancer = request.user.freelancer
    except Exception:
        return Response({'error': 'You must be a freelancer to apply.'}, status=400)

    try:
        project = Project.objects.get(id=project_id, type='soloFin')
    except Project.DoesNotExist:
        return Response({'error': 'SoloFin project not found.'}, status=404)

    # Prevent duplicate applications (OneToOne for freelancer/project)
    if SoloFinRequest.objects.filter(project=project, freelancer=request.user).exists():
        return Response({'error': 'You have already applied to this SoloFin project.'}, status=400)
    if SoloFinRequest.objects.filter( freelancer=request.user).exists():
        return Response({'error': 'You have already applied to another SoloFin project.'}, status=400)
   
    if PostuledRequest.objects.filter(freelancer=request.user).exists():
            return Response({'error': 'You have already applied to another Bettarrina project.'}, status=400)

    chatroom = Chatroom.objects.create(
        project=project,
        room_name=project.title,
        owner=freelancer.user  # freelancer is the owner
    )
    # Add both freelancer and client user as participants
    chatroom.users.add(freelancer.user)
    chatroom.users.add(project.client.user)

    solofin_request = SoloFinRequest.objects.create(project=project, freelancer=request.user, message=request.data.get('message', ''))
    if solofin_request.message:
        Message.objects.create(
            room=chatroom,
            sender=freelancer.user,
            content=solofin_request.message
        )

    return Response({'success': 'Application submitted.'})

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chatroom, Message
from .serializers import ChatroomSerializer, MessageSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_chatrooms(request):
    """
    Return a list of chatrooms where the user is owner or participant,
    with chatroom name, owner, phase, users (with role), and users_banned (with role).
    """
    user = request.user
    chatrooms = Chatroom.objects.filter(users=user).distinct() | Chatroom.objects.filter(owner=user).distinct()
    chatrooms = chatrooms.distinct()
    chatroom_list = []
    for chatroom in chatrooms:
        chatroom_list.append({
            "id": chatroom.id,
            "room_name": chatroom.room_name,
            "owner": getattr(chatroom.owner, "full_name", str(chatroom.owner)),  # Adjust as needed
            "phase": chatroom.phase,
            "users": [
                {
                    "id": u.id,
                    "full_name": getattr(u, "full_name", str(u)),
                    "role": getattr(u, "role", None)
                } for u in chatroom.users.all()
            ],
            "users_banned": [
                {
                    "id": u.id,
                    "full_name": getattr(u, "full_name", str(u)),
                    "role": getattr(u, "role", None)
                } for u in chatroom.users_banned.all()
            ],
        })
    return Response(chatroom_list)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chatroom_messages(request, chatroom_id):
    """
    Return all messages in a chatroom.
    """
    try:
        chatroom = Chatroom.objects.get(id=chatroom_id)
    except Chatroom.DoesNotExist:
        return Response({'error': 'Chatroom not found.'}, status=404)
    messages = Message.objects.filter(room=chatroom).order_by('id')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chatroom
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_chatroom_phase(request, chatroom_id):
    """
    Allow the client (the user with role 'client' in chatroom.users) to advance the chatroom to the next phase automatically.
    """
    chatroom = get_object_or_404(Chatroom, id=chatroom_id)
    # Find the client in chatroom.users
    client_user = chatroom.users.filter(role='client').first()
    if not client_user or request.user != client_user:
        return Response({'error': 'Only the client can change the phase.'}, status=403)
    phase_order = ['phase1', 'phase2', 'phase3', 'phase4']
    try:
        current_index = phase_order.index(chatroom.phase)
    except ValueError:
        return Response({'error': 'Invalid current phase.'}, status=400)
    if current_index >= len(phase_order) - 1:
        return Response({'error': 'Already at the last phase.'}, status=400)
    chatroom.phase = phase_order[current_index + 1]
    chatroom.save()
    return Response({'success': True, 'phase': chatroom.phase})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ban_user_from_chatroom(request, chatroom_id):
    """
    Add a user from chatroom.users to chatroom.users_banned (do not remove from users).
    Only the client (user with role='client' in chatroom.users) can ban users.
    If the user is already banned, unban them.
    """
    chatroom = get_object_or_404(Chatroom, id=chatroom_id)
    # Find the client in chatroom.users
    client_user = chatroom.users.filter(role='client').first()
    if not client_user or request.user != client_user:
        return Response({'error': 'Only the client can ban users.'}, status=403)
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({'error': 'user_id is required.'}, status=400)
    user_to_ban = chatroom.users.filter(id=user_id).first()
    if not user_to_ban:
        return Response({'error': 'User not in chatroom.'}, status=404)
    if chatroom.users_banned.filter(id=user_id).exists():
        chatroom.users_banned.remove(user_to_ban)
        return Response({'success': True, 'unbanned_user_id': user_id, 'action': 'unbanned'})
    else:
        chatroom.users_banned.add(user_to_ban)
        return Response({'success': True, 'banned_user_id': user_id, 'action': 'banned'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_message(request, chatroom_id):
    """
    Post a new message to a chatroom.
    Prevent banned users from sending messages.
    """
    try:
        chatroom = Chatroom.objects.get(id=chatroom_id)
    except Chatroom.DoesNotExist:
        return Response({'error': 'Chatroom not found.'}, status=404)

    # Check if user is banned
    if chatroom.users_banned.filter(id=request.user.id).exists():
        return Response({'error': 'You are banned from this chatroom.'}, status=403)

    content = request.data.get('content')
    if not content:
        return Response({'error': 'Content is required.'}, status=400)
    message = Message.objects.create(
        room=chatroom,
        sender=request.user,
        content=content
    )
    serializer = MessageSerializer(message)
    return Response(serializer.data, status=201)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Service, Chatroom, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ContactServiceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, service_id):
        message = request.data.get('message', '').strip()
        if not message:
            return Response({'error': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)

        client = request.user
        freelancer = service.freelancer.user  # Adjust if your Service model is different

        # Check if chatroom already exists for this service and these users
        chatroom = Chatroom.objects.filter(service=service, users=client).filter(users=freelancer).first()
        if not chatroom:
            chatroom = Chatroom.objects.create(
                service=service,
                room_name=f"Service: {service.title}",
                owner=client
            )
            chatroom.users.add(client, freelancer)
        else:
            # If chatroom exists, just add users if not already present
            chatroom.users.add(client, freelancer)

        # Add the first message
        Message.objects.create(
            room=chatroom,
            sender=client,
            content=message
        )

        return Response({'success': 'Chatroom created and message sent.', 'chatroom_id': chatroom.id}, status=status.HTTP_201_CREATED)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from accounts.models import CustomUser

@api_view(['GET'])
@permission_classes([AllowAny])
def all_usernames(request):
    """
    Return a list of all usernames.
    """
    usernames = list(CustomUser.objects.values_list('username', flat=True))
    return Response({'usernames': usernames})

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Freelancer, ClientUser, Formateur
from .serializers import (
    FreelancerProfileSerializer,
    ClientProfileSerializer,
    FormateurProfileSerializer,
)

class ProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'freelancer':
            try:
                profile = user.freelancer
                serializer = FreelancerProfileSerializer(profile)
            except Freelancer.DoesNotExist:
                return Response({'error': 'Freelancer profile not found.'}, status=404)
        elif user.role == 'client':
            try:
                profile = user.client
                serializer = ClientProfileSerializer(profile)
            except ClientUser.DoesNotExist:
                return Response({'error': 'Client profile not found.'}, status=404)
        elif user.role == 'formateur':
            try:
                profile = user.formateur
                serializer = FormateurProfileSerializer(profile)
            except Formateur.DoesNotExist:
                return Response({'error': 'Formateur profile not found.'}, status=404)
        else:
            serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data
        if user.role == 'freelancer':
            try:
                profile = user.freelancer
            except Freelancer.DoesNotExist:
                return Response({'error': 'Freelancer profile not found.'}, status=404)
            user_serializer = CustomUserSerializer(user, data=data, partial=True)
            profile_serializer = FreelancerProfileSerializer(profile, data=data, partial=True)
            user_valid = user_serializer.is_valid()
            profile_valid = profile_serializer.is_valid()
            if user_valid and profile_valid:
                user_serializer.save()
                profile_serializer.save()
                return Response({'user': user_serializer.data, 'freelancer': profile_serializer.data})
            return Response({'user_errors': user_serializer.errors, 'freelancer_errors': profile_serializer.errors}, status=400)
        elif user.role == 'client':
            try:
                profile = user.client
            except ClientUser.DoesNotExist:
                return Response({'error': 'Client profile not found.'}, status=404)
            user_serializer = CustomUserSerializer(user, data=data, partial=True)
            profile_serializer = ClientProfileSerializer(profile, data=data, partial=True)
            user_valid = user_serializer.is_valid()
            profile_valid = profile_serializer.is_valid()
            if user_valid and profile_valid:
                user_serializer.save()
                profile_serializer.save()
                return Response({'user': user_serializer.data, 'client': profile_serializer.data})
            return Response({'user_errors': user_serializer.errors, 'client_errors': profile_serializer.errors}, status=400)
        elif user.role == 'formateur':
            try:
                profile = user.formateur
            except Formateur.DoesNotExist:
                return Response({'error': 'Formateur profile not found.'}, status=404)
            user_serializer = CustomUserSerializer(user, data=data, partial=True)
            profile_serializer = FormateurProfileSerializer(profile, data=data, partial=True)
            user_valid = user_serializer.is_valid()
            profile_valid = profile_serializer.is_valid()
            if user_valid and profile_valid:
                user_serializer.save()
                profile_serializer.save()
                return Response({'user': user_serializer.data, 'formateur': profile_serializer.data})
            return Response({'user_errors': user_serializer.errors, 'formateur_errors': profile_serializer.errors}, status=400)
        else:
            serializer = CustomUserSerializer(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
