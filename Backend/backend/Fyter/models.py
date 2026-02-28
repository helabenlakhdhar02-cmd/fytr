from django.db import models
from django.conf import settings
from rest_framework import serializers

# Create your models here.
class Poste(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='likes')
    def __str__(self):
        return self.title
    def total_likes(self):
        return self.likes.count
class PostImage(models.Model):
    post = models.ForeignKey(Poste, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images/')

    def __str__(self):
        return f"Image for {self.post.title}"

class PostComment(models.Model):
    post = models.ForeignKey(Poste, related_name='comments', on_delete=models.CASCADE)
    name= models.ForeignKey(settings.AUTH_USER_MODEL, related_name='usercomments', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.name} on {self.post.title}"




class ClientUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='client')
    company_name = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.full_name}"

class Freelancer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='freelancer')
    skills = models.TextField(help_text="List of skills", blank=True)
    portfolio_link = models.URLField(blank=True, null=True)
    verified = models.BooleanField(default=False)
    bio = models.TextField(blank=True, null=True)
    
    rate = models.DecimalField(max_digits=3, decimal_places=2, default=2.00, help_text="Hourly rate of the freelancer")
    score = models.DecimalField(max_digits=3, decimal_places=2, default=0.00, help_text="Rating score (0 to 10)")
    level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert')
    ], default='beginner', help_text="Freelancer's skill level")

    def __str__(self):
        return f"{self.user.full_name}"

class Formateur(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='formateur')
    expertise = models.CharField(max_length=255)
    experience_years = models.PositiveIntegerField(default=0)
    verified = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Formateur: {self.user.username}"
    

class Certification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="certifications")
    title = models.CharField(max_length=255)  # Example: "AWS Certified Solutions Architect"
    institution = models.CharField(max_length=255, blank=True, null=True)  # Example: "Amazon AWS"
    issue_date = models.DateField()  # Date when certification was issued
    expiry_date = models.DateField(blank=True, null=True)  # Optional expiration date
    certificate_file = models.FileField(upload_to="certifications/", blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True, null=True)  # Unique ID from institution
    credential_url = models.URLField(blank=True, null=True)  # Verification link

    def __str__(self):
        return f"{self.title} - {self.user.username}"

    class Meta:
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"
        ordering = ["-issue_date"]  # Show latest certifications first





class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    technologies = models.CharField(max_length=300)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateTimeField()
    client = models.ForeignKey(ClientUser, on_delete=models.CASCADE, related_name='projects')
    status = models.CharField(max_length=50, choices=[
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ],default='open')
    
    type = models.CharField(max_length=50, choices=[
        ('normal', 'Normal'),
        ('soloFin', 'SoloFin'),
        ('bettaArena', 'BettaArena')
    ], default='normal')
    skills_required = models.CharField(max_length=300)
    ratings = models.FloatField(default=0.0)
    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    technologies = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE, related_name='services')
    category = models.CharField(max_length=100)
    skills = models.CharField(max_length=300)

    def __str__(self):
        return self.title

class Chatroom(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True, related_name='chatrooms')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True, blank=True, related_name='chatrooms')
    room_name = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_rooms')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='chatrooms')
    phase = models.CharField(max_length=50, choices=[
        ('phase1', 'Phase 1'),
        ('phase2', 'Phase 2'),
        ('phase3', 'Phase 3'),
        ('phase4', 'Phase 4'),
    ], default='phase1')
    users_banned = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='banned_chatrooms', blank=True)

    def __str__(self):
        return self.room_name

class Message(models.Model):
    room = models.ForeignKey(Chatroom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} in {self.room.room_name}"
    
class PrivetChat(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_privet_messages')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_privet_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)  # Add this field to track read status
    
    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"




class PostuledRequest(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='postuled_requests')
    freelancer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='postuled_requests')
    message = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('accepted', 'Accepted'),
            ('rejected', 'Rejected'),
        ],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('project', 'freelancer')

    def save(self, *args, **kwargs):
        if self.project.type == 'bettaArena' and self.project.postuled_requests.count() >= 6:
            raise ValueError("A BettaArena project cannot have more than 6 postulants.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.freelancer.username} -> {self.project.title} ({self.status})"

class SoloFinRequest(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='solofin_requests')
    freelancer = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='solofin_request')
    message = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('accepted', 'Accepted'),
            ('rejected', 'Rejected'),
        ],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.project.type != 'soloFin':
            raise ValueError("This request type is only for SoloFin projects.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"SoloFin: {self.freelancer.username} -> {self.project.title} ({self.status})"
