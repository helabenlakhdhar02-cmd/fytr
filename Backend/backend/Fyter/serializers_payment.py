from rest_framework import serializers
from .models import Payment, CourseEnrollment, SkillPoint

class PaymentSerializer(serializers.ModelSerializer):
    payer_username = serializers.CharField(source='payer.username', read_only=True)
    receiver_username = serializers.CharField(source='receiver.username', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'payment_type', 'status',
            'payer', 'payer_username',
            'receiver', 'receiver_username',
            'project', 'service',
            'total_amount', 'platform_fee', 'receiver_amount',
            'transaction_ref', 'created_at', 'updated_at'
        ]
        read_only_fields = ['platform_fee', 'receiver_amount', 'created_at', 'updated_at']

class CourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseEnrollment
        fields = '__all__'
        read_only_fields = ['enrolled_at']

class SkillPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillPoint
        fields = '__all__'
        read_only_fields = ['updated_at']