from rest_framework import generics, serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.crypto import get_random_string

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super().validate(attrs)

        # Add extra responses
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'first_login': self.user.first_login,
        }

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user']={
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'first_login':user.first_login,
            # Add other fields as needed
        }
        return token
# A serializer to return user data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role', 'region']

class UsernameResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = CustomUser.objects.filter(email=value).first()
        if user is None:
            raise serializers.ValidationError("No user found with this email address.")
        return value

    def save(self):
        email = self.validated_data['email']
        user = CustomUser.objects.get(email=email)
        # Generate a 6-digit numeric OTP
        otp = get_random_string(length=6, allowed_chars='1234567890')
        user.username_reset_token = otp
        user.save()
        return {'user': user, 'otp': otp}

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = CustomUser.objects.filter(email=value).first()
        if user is None:
            raise serializers.ValidationError("No user found with this email address.")
        return value

    def save(self):
        email = self.validated_data['email']
        user = CustomUser.objects.get(email=email)
                # Generate a 6-digit numeric OTP
        otp = get_random_string(length=6, allowed_chars='1234567890')
        user.login_token = otp
        user.save()
        return {'user': user, 'otp': otp}
