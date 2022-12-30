from rest_framework import routers
from .api import ServiceTodos, ExpiredView, PaymentView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

router.register('servicios/todos',ServiceTodos, 'Servicios')
router.register('servicios/expiraciones',ExpiredView, 'Vencidos')
router.register('servicios/pagos',PaymentView, 'Pagos')

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls