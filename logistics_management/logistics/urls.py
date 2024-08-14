from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, ShipmentViewSet

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'shipments', ShipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]