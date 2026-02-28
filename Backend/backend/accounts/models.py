from django.contrib.auth.models import AbstractUser
from django.db import models
from Fyter.models import ClientUser, Formateur, Freelancer

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('freelancer', 'Freelancer'),
        ('formateur', 'Formateur'),
        ('admin', 'Admin'),
    ]
    date_of_birth = models.DateField(null=True, blank=True)
    profileImg=models.ImageField(upload_to='profile/',default='default/profile.jpg')

    email = models.EmailField(unique=True)
    region = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    phone = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    first_login=models.BooleanField(default=True)


    GENDER_CHOICES = [
            ('M', 'Male'),
            ('F', 'Female'),
            ('O', 'Other'),
        ]

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    is_authorized = models.BooleanField(default=True)
    username_reset_token = models.CharField(max_length=6, null=True, blank=True)
    login_token = models.CharField(max_length=6, blank=True, null=True)
    def __str__(self):
        return self.username
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.role == 'client':
            ClientUser.objects.get_or_create(user=self)
        elif self.role == 'freelancer':
            Freelancer.objects.get_or_create(user=self)
        elif self.role == 'formateur':
            Formateur.objects.get_or_create(user=self)