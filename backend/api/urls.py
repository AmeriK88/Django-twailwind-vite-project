# api/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from plantillas.views import PlantillaViewSet

router = DefaultRouter()
router.register(r'plantillas', PlantillaViewSet, basename='plantilla')

urlpatterns = [
    path('', include(router.urls)),
]
