from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PosteView, LikedView, CreateCommentView, CertificationListCreateView, CertificationDetailView,
    UserProfileView, ProjectViewSet, ServiceViewSet, PublicProjectListView, PublicServiceListView,
    getjustfreelancerservice, FreelancerListView, ClientUserListView,
    PostuledRequestViewSet, SoloFinRequestViewSet,get_client_projects_by_username,
    GererPostesView, my_services, apply_to_bettaarena, apply_to_solofin,
    my_chatrooms, chatroom_messages,post_message, change_chatroom_phase, ban_user_from_chatroom,
    ContactServiceView, all_usernames, ProfileDetailView
)

# Créer un routeur pour les viewsets
router = DefaultRouter()
router.register(r'project-applications', PostuledRequestViewSet, basename='project-applications')
router.register(r'solofin-requests', SoloFinRequestViewSet, basename='solofin-requests')

urlpatterns = [
    # Vos URLs existantes
    path('posts/', PosteView.as_view(), name='post-list-create'),
    path('posts/<str:pk>/', PosteView.as_view(), name='post-retrieve-update-destroy'),
    path('like/<str:pk>/<int:id>/', LikedView.as_view(), name='like-retrieve-update-destroy'),
    path('comment/', CreateCommentView.as_view(), name='comment-list-create'),
     path("certifications/", CertificationListCreateView.as_view(), name="certification-list-create"),
    path("certifications/<int:pk>/", CertificationDetailView.as_view(), name="certification-detail"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("client/project/", ProjectViewSet.as_view({'get': 'list', 'post': 'create'}), name="user-projects"),
    path("client/project/<int:pk>/", ProjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name="user-project-detail"),
    path("client/projects/<str:username>/", get_client_projects_by_username, name="client-projects-by-username"),
    path("freelancer/service/", ServiceViewSet.as_view({'get': 'list', 'post': 'create'}), name="user-services"),
    path("public/projects/", PublicProjectListView.as_view(), name="public-projects"),
    path("public/services/", PublicServiceListView.as_view(), name="public-services"),
    path('freelancer/services/<str:username>/', getjustfreelancerservice, name='getjustfreelancerservice'),
    path('freelancers/', FreelancerListView.as_view(), name='freelancer-list'),
    path('clients/', ClientUserListView.as_view(), name='clientuser-list'),
    path('user-profile/', ProfileDetailView.as_view(), name='profile-detail'),

    # Nouvelles URLs pour les candidatures aux projets
    path('', include(router.urls)),
    path('posts/manage/<int:id>/', GererPostesView.as_view(), name='manage-post'),
    path('freelancer/my-services/', my_services, name='my-services'),
    path("freelancer/service/<int:pk>/", ServiceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name="user-service-detail"),
    path('projects/<int:project_id>/apply/bettaarena/', apply_to_bettaarena, name='apply-to-bettaarena'),
    path('projects/<int:project_id>/apply/solofin/', apply_to_solofin, name='apply-to-solofin'),
    path('chatrooms/my/', my_chatrooms, name='my-chatrooms'),
    path('chatrooms/<int:chatroom_id>/messages/', chatroom_messages, name='chatroom-messages'),
    path('chatroom/<int:chatroom_id>/messages/', post_message, name='post-message'),
    path('chatroom/<int:chatroom_id>/change-phase/', change_chatroom_phase, name='change-chatroom-phase'),
    path('chatroom/<int:chatroom_id>/ban-user/', ban_user_from_chatroom, name='ban-user-from-chatroom'),
    path('services/<int:service_id>/contact/', ContactServiceView.as_view(), name='contact_service'),
    path('usernames/', all_usernames, name='all_usernames'),
]
