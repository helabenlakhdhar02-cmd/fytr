from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, LogoutView
from .views import UserListView, UserDetailView,CustomTokenObtainPairView,PasswordResetOTPEmailView,PasswordResetConfirmationView
from django.views.generic import TemplateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('me/', UserDetailView.as_view(), name='user-detail'),


    path('reset-password-email/', PasswordResetOTPEmailView.as_view(), name='reset-password-email'),
    path('reset-password-confirmation/', PasswordResetConfirmationView.as_view(), name='reset-password-confirmation'),
    path('password-reset-success/', TemplateView.as_view(template_name='password_reset_success.html'), name='password_reset_success'),
]