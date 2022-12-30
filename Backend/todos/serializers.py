from rest_framework import serializers
from .models import Service, Payment, ExpiredPayments

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class ExpiredpaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpiredPayments
        fields = ("payment_user_id","penalty_fee",)
    
    def to_representation(self, instance):
        return {
            'id':instance.id,
            'payment_service_logo' : instance.payment_user_id.service_id.logo,
            'payment_service_name' : instance.payment_user_id.service_id.name,
            'payment_service_expiration' : instance.payment_user_id.expirationdate,
            'payment_service_amount' : instance.payment_user_id.amount,
            'penalty_fee' : instance.penalty_fee,
        }

class PaymentSerializer(serializers.ModelSerializer):
    
           
    class Meta:
        model = Payment
        fields = "__all__"

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'amount':instance.amount,
            'service_id':instance.service_id.name,
            'logo':instance.service_id.logo,
            'amount':instance.amount,
            'paymentdate':instance.paymentdate,
                              
        }

 

    
       
    
    
   
