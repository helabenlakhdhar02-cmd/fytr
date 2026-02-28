from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Authentication backend that allows login with either username or email
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        
        try:
            # Try to fetch the user by username or email
            user = UserModel.objects.filter(
                Q(username=username) | Q(email=username)
            ).first()
            
            # Check the password
            if user and user.check_password(password):
                return user
                
        except UserModel.DoesNotExist:
            return None
            
        return None
