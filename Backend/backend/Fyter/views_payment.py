from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Payment, CourseEnrollment, SkillPoint, Project, Service
from .serializers_payment import PaymentSerializer, CourseEnrollmentSerializer, SkillPointSerializer


class CreatePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        payment_type = request.data.get('payment_type')  # project/service/course
        total_amount = request.data.get('total_amount')
        receiver_id = request.data.get('receiver_id')
        project_id = request.data.get('project_id', None)
        service_id = request.data.get('service_id', None)
        transaction_ref = request.data.get('transaction_ref', '')

        payment = Payment.objects.create(
            payer=request.user,
            receiver_id=receiver_id,
            payment_type=payment_type,
            total_amount=total_amount,
            project_id=project_id,
            service_id=service_id,
            transaction_ref=transaction_ref,
            status='completed'  # mark as completed — integrate real gateway later
        )

        # If project payment → update project status
        if payment_type == 'project' and project_id:
            Project.objects.filter(id=project_id).update(status='completed')

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return payments where user is payer or receiver
        return Payment.objects.filter(
            payer=user
        ) | Payment.objects.filter(receiver=user)


class CourseEnrollView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        course_title = request.data.get('course_title')
        course_price = request.data.get('course_price')
        formateur_id = request.data.get('formateur_id')

        # Create payment for course
        payment = Payment.objects.create(
            payer=request.user,
            receiver_id=request.data.get('formateur_user_id'),
            payment_type='course',
            total_amount=course_price,
            status='completed'
        )

        # Create enrollment
        enrollment = CourseEnrollment.objects.create(
            freelancer=request.user,
            formateur_id=formateur_id,
            payment=payment,
            course_title=course_title,
            course_price=course_price
        )

        return Response(
            CourseEnrollmentSerializer(enrollment).data,
            status=status.HTTP_201_CREATED
        )


class AddSkillPointView(APIView):
    """Called when a freelancer loses a BettaArena project — they earn 1 skill point"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        skill_point, created = SkillPoint.objects.get_or_create(
            freelancer=request.user
        )
        skill_point.add_point()
        return Response({
            'points': skill_point.points,
            'free_courses_unlocked': skill_point.free_courses_unlocked,
            'message': f'You now have {skill_point.points} skill points!'
        })


class MySkillPointsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        skill_point, _ = SkillPoint.objects.get_or_create(freelancer=request.user)
        return Response(SkillPointSerializer(skill_point).data)