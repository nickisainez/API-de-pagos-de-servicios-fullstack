from .models import Service, ExpiredPayments, Payment
from rest_framework import viewsets
from .serializers import ServiceSerializer, ExpiredpaymentsSerializer, PaymentSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .pagination import StandardResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.throttling import UserRateThrottle


class ServiceTodos(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    permission_classes = [IsAdminUser]

    serializer_class = ServiceSerializer
    
    http_method_names = ['get', 'put','post', 'patch', 'delete']

    throttle_classes = [UserRateThrottle]

class ExpiredView(viewsets.ModelViewSet):
    queryset = ExpiredPayments.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExpiredpaymentsSerializer
    pagination_class = StandardResultsSetPagination
    
    throttle_classes = [UserRateThrottle] 

   
class PaymentView(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ('paymentdate','expirationdate')
    search_fields = ['paymentdate','expirationdate']
    ordering_fields = ['paymentdate','expirationdate']

    throttle_classes = [UserRateThrottle]

