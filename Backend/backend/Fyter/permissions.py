from rest_framework import permissions

class IsClient(permissions.BasePermission):
    """
    Custom permission to only allow clients to create, update, or delete projects.
    """
    def has_permission(self, request, view):
        return request.user.role == 'client'

class IsFreelancer(permissions.BasePermission):
    """
    Custom permission to only allow freelancers to create, update, or delete services.
    """
    def has_permission(self, request, view):
        return request.user.role == 'freelancer'
