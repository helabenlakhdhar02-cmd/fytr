from django.contrib import admin
from .models import PostuledRequest,Poste,PrivetChat,PostComment,PostImage,ClientUser,Formateur,Freelancer,Certification,Project,Service, SoloFinRequest

admin.site.register(Poste)
admin.site.register(PostComment)
admin.site.register(PostImage)
admin.site.register(ClientUser)
admin.site.register(Freelancer)
admin.site.register(Formateur)
admin.site.register(Certification)
admin.site.register(Project)
admin.site.register(Service)
admin.site.register(PrivetChat)
admin.site.register(PostuledRequest)
admin.site.register(SoloFinRequest)
from .models import Chatroom, Message

@admin.register(Chatroom)
class ChatroomAdmin(admin.ModelAdmin):
    list_display = ['room_name', 'owner']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['room', 'sender', 'content', 'timestamp']