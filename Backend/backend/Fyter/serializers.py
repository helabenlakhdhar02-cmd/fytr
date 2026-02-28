from .models import Poste, PostImage, PostComment,Certification,Chatroom,Message,PostuledRequest,SoloFinRequest

from accounts.models import CustomUser
from rest_framework import serializers
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    profileImg = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'full_name', 'profileImg']

    def get_profileImg(self, obj):
        if obj.profileImg:
            return f"{settings.BASE_URL}{obj.profileImg.url}"
        return None

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['__all__']

class PosteSerializer(serializers.ModelSerializer):
    files = serializers.ListField(
        child=serializers.ImageField(),  # This will allow an array of images
        required=False
    )
    username = serializers.CharField(max_length=200, required=False)

    class Meta:
        model = Poste
        fields = ['title', 'username', 'content', 'files']

    def create(self, validated_data):
        request = self.context.get('request')
        images_data = validated_data.pop('files', [])  
        print("list images")
        print(images_data)   # ✅ Extract images from request.FILES
        username = validated_data.pop('username', None)

        # Handle case where user is not found
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(f"User with username {username} does not exist.")
        
        validated_data['user'] = user
        post = Poste.objects.create(**validated_data)

        # Save images
        for image in images_data:
            PostImage.objects.create(post=post, image=image)

        return post


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']


class PostCommentSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()  # Display username instead of user ID

    class Meta:
        model = PostComment
        fields = ['id', 'name', 'content', 'created_at']

class GetPostesSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)  # Include images in response
    user = UserSerializer(read_only=True)
    likes = serializers.StringRelatedField(many=True, source="like")
    comments = PostCommentSerializer(many=True, read_only=True)  # Include comments

    class Meta:
        model = Poste
        fields = ['id','likes', 'user','title', 'content', 'comments','images', 'created_at', 'updated_at']


class CreateCommentSerializer(serializers.ModelSerializer):
    post_id = serializers.IntegerField(write_only=True)  # Accept post ID
    username = serializers.CharField(write_only=True)  # Accept username

    class Meta:
        model = PostComment
        fields = ['post_id', 'username', 'content', 'created_at']

    def create(self, validated_data):
        post_id = validated_data.pop('post_id')
        username = validated_data.pop('username')

        # Get post
        try:
            post = Poste.objects.get(id=post_id)
        except Poste.DoesNotExist:
            raise serializers.ValidationError("Post does not exist.")

        # Get user
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")

        # Create and return the comment
        comment = PostComment.objects.create(post=post, name=user, **validated_data)
        return comment
    

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"  # Includes all fields
        read_only_fields = ["user"]  # `user` is set automatically

from .models import  ClientUser, Freelancer, Formateur, Certification

class UserProfileSerializer(serializers.ModelSerializer):
    role_details = serializers.SerializerMethodField()
    certifications = CertificationSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "email", "full_name", "phone", "region", "role",
            "profileImg", "gender", "date_of_birth", "first_login", "is_authorized",
            "role_details", "certifications"
        ]

    def get_role_details(self, obj):
        """Returns role-specific details based on user role"""
        if obj.role == "client" and hasattr(obj, "client"):
            return ClientUserSerializer(obj.client).data
        elif obj.role == "freelancer" and hasattr(obj, "freelancer"):
            return FreelancerSerializer(obj.freelancer).data
        elif obj.role == "formateur" and hasattr(obj, "formateur"):
            return FormateurSerializer(obj.formateur).data
        return None  # If no additional details

class ClientUserSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True) 
    class Meta:
        model = ClientUser
        fields = ["user","company_name", "industry"]

class FreelancerSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Freelancer
        fields = ["user","skills","rate","level","score", "portfolio_link", "verified", "bio"]




class FormateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formateur
        fields = ["expertise", "experience_years", "verified", "description"]
class FreelancerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Freelancer
        fields = ["skills", "rate", "level", "score", "portfolio_link", "bio"]
class UserPutSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "email", "full_name", "phone", "region", "role",
            "profileImg", "gender", "date_of_birth", "first_login", "is_authorized",
            
        ]


from .models import Project, Service
class ProjectSerializer(serializers.ModelSerializer):
    client=ClientUserSerializer(read_only=True) 
    class Meta:
        model = Project
        fields = ['id','type' ,'title', 'description', 'technologies', 'budget', 'deadline', 'client', 'status', 'skills_required', 'ratings']
        read_only_fields = ['ratings']

class ServiceSerializer(serializers.ModelSerializer):
    freelancer = FreelancerSerializer(read_only=True)  # Include freelancer details

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'technologies', 'price', 'availability', 'freelancer', 'category', 'skills']


class PostuledRequestSerializer(serializers.ModelSerializer):
    freelancer_username = serializers.CharField(write_only=True)
    freelancer_details = UserSerializer(source='freelancer', read_only=True)
    project_details = ProjectSerializer(source='project', read_only=True)
    
    class Meta:
        model = PostuledRequest
        fields = ['id', 'project', 'freelancer_username', 'message', 'status', 'created_at', 
                  'freelancer_details', 'project_details']
        read_only_fields = ['status', 'created_at']
    
    def create(self, validated_data):
        freelancer_username = validated_data.pop('freelancer_username')
        project_id = validated_data.get('project').id
        
        try:
            freelancer = CustomUser.objects.get(username=freelancer_username)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"freelancer": "Freelancer not found."})
        
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise serializers.ValidationError({"project": "Project not found."})
        
        # Vérifier si le projet est de type BettaArena
        if project.type == 'bettaArena':
            # Vérifier si le nombre maximum de postulants est atteint
            if project.postuled_requests.count() >= 6:
                raise serializers.ValidationError(
                    {"project": "This BettaArena project already has the maximum number of participants (6)."}
                )
        
        # Vérifier si le freelancer a déjà postulé à ce projet
        if PostuledRequest.objects.filter(project=project, freelancer=freelancer).exists():
            raise serializers.ValidationError(
                {"project": "You have already applied to this project."}
            )
        
        validated_data['freelancer'] = freelancer
        return PostuledRequest.objects.create(**validated_data)

class SoloFinRequestSerializer(serializers.ModelSerializer):
    freelancer_username = serializers.CharField(write_only=True)
    freelancer_details = UserSerializer(source='freelancer', read_only=True)
    project_details = ProjectSerializer(source='project', read_only=True)
    
    class Meta:
        model = SoloFinRequest
        fields = ['id', 'project', 'freelancer_username', 'message', 'status', 'created_at',
                  'freelancer_details', 'project_details']
        read_only_fields = ['status', 'created_at']
    
    def create(self, validated_data):
        freelancer_username = validated_data.pop('freelancer_username')
        project_id = validated_data.get('project').id
        
        try:
            freelancer = CustomUser.objects.get(username=freelancer_username)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"freelancer": "Freelancer not found."})
        
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise serializers.ValidationError({"project": "Project not found."})
        
        # Vérifier si le projet est de type SoloFin
        if project.type != 'soloFin':
            raise serializers.ValidationError(
                {"project": "This request type is only for SoloFin projects."}
            )
        
        # Vérifier si le freelancer a déjà une demande SoloFin en cours
        if SoloFinRequest.objects.filter(freelancer=freelancer).exists():
            raise serializers.ValidationError(
                {"freelancer": "You already have an active SoloFin request. Complete or cancel it before applying to another."}
            )
        
        # Vérifier si le projet a déjà une demande SoloFin acceptée
        if SoloFinRequest.objects.filter(project=project, status='accepted').exists():
            raise serializers.ValidationError(
                {"project": "This SoloFin project already has an accepted freelancer."}
            )
        
        validated_data['freelancer'] = freelancer
        return SoloFinRequest.objects.create(**validated_data)

class ProjectApplicationStatusSerializer(serializers.ModelSerializer):
    """Sérialiseur pour mettre à jour le statut d'une candidature (accepter/rejeter)"""
    class Meta:
        model = PostuledRequest
        fields = ['status']
        
class SoloFinStatusSerializer(serializers.ModelSerializer):
    """Sérialiseur pour mettre à jour le statut d'une demande SoloFin"""
    class Meta:
        model = SoloFinRequest
        fields = ['status']

from .models import Chatroom, Message

class ChatroomSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()

    class Meta:
        model = Chatroom
        fields = ['id', 'room_name', 'owner_name','phase']

    def get_owner_name(self, obj):
        # Adjust according to your user model
        return getattr(obj.owner, 'full_name', str(obj.owner))

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'sender_name', 'content', 'timestamp']

    def get_sender_name(self, obj):
        # Adjust according to your user model
        return getattr(obj.sender, 'full_name', str(obj.sender))

from rest_framework import serializers
from accounts.models import CustomUser
from .models import Freelancer, ClientUser, Formateur

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'role', 'date_of_birth', 'profileImg', 'region',
            'phone', 'full_name', 'gender', 'is_authorized', 'first_login'
        ]

class FreelancerProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = Freelancer
        fields = ['id', 'user', 'skills', 'portfolio_link', 'verified', 'bio', 'rate', 'score', 'level']

class ClientProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = ClientUser
        fields = ['id', 'user', 'company_name', 'industry']

class FormateurProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = Formateur
        fields = ['id', 'user', 'expertise', 'experience_years', 'verified', 'description']



