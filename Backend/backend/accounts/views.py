from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, BlacklistMixin
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics,status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer,PasswordResetSerializer
from backend.settings import EMAIL_HOST_USER, BASE_URL

from django.core.mail import send_mail

from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import DetailView
from django.views import View
from django.http import HttpResponseBadRequest
from django.http import Http404
from django.urls import reverse

# For verifying OTP for password reset and setting a new password
class PasswordResetConfirmationView(DetailView):
    model = CustomUser
    template_name = 'password_reset_confirmation.html'
    context_object_name = 'user'

    def get_object(self, queryset=None):
        email = self.request.GET.get('email')
        otp = self.request.GET.get('otp')

        if not email or not otp:
            raise Http404("Invalid URL")

        user = CustomUser.objects.filter(email=email, login_token=otp).first()

        if user is None:
            raise Http404("Invalid OTP")

        return user

    def post(self, request, *args, **kwargs):
        user = self.get_object()
        new_password = request.POST.get('password')

        # Set the new password
        user.set_password(new_password)
        user.save()

        # Redirect to a success page
        return redirect(reverse('password_reset_success'))
    

#
class PasswordResetOTPEmailView(generics.CreateAPIView):
    serializer_class = PasswordResetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        data = serializer.save()

        # Generate a unique confirmation URL for your local server
        confirmation_url_password_reset = f'{BASE_URL}/api/accounts/reset-password-confirmation/?email={email}&otp={data["otp"]}'


        # Send an email with the OTP and the confirmation link
        subject = 'Password Reset OTP and Confirmation Link'
        message += f'\n\ you can click on the link below to reset your password:\n{confirmation_url_password_reset}'

        recipient_list = [email]

        send_mail(subject, message, EMAIL_HOST_USER, recipient_list)

        return Response({'message': 'Password reset OTP and confirmation link sent successfully.'}, status=status.HTTP_200_OK)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        if CustomUser.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.create_user(
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            region=data['region'],
            role=data['role'],
            password=data['password'],
            is_staff=data['role'] == 'admin',
            date_of_birth=data.get('date_of_birth'),
            phone=data.get('phone'),
            full_name=data.get('first_name') + ' ' + data['last_name'],
            gender=data.get('gender'),
        )
        refresh = RefreshToken.for_user(user)
        return Response({'access': str(refresh.access_token), 'refresh': str(refresh)})

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({'access': str(refresh.access_token), 'refresh': str(refresh)})
        return Response({'error': 'Invalid credentials'}, status=401)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Remove the refresh token from cookies
            response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
            response.delete_cookie('refresh_token')  # Delete the refresh token cookie
            return response
        except Exception as e:
            return Response({'error': 'Failed to log out', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# View to list all users
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only admins can access

    def get_queryset(self):
        # You can add custom filtering or ordering here if necessary
        return CustomUser.objects.all()

# View to retrieve a specific user by their ID
class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Only allow the authenticated user to access their own data
        return self.request.user