# plantillas/views.py
from rest_framework import viewsets, permissions
from .models import Plantilla
from .serializers import PlantillaSerializer
from rest_framework.decorators import action
from django.http import FileResponse
import os

class PlantillaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET listado y detalle abiertos a todos.
    """
    queryset = Plantilla.objects.all().order_by('-created_at')
    serializer_class = PlantillaSerializer
    permission_classes = [permissions.AllowAny]

    @action(
        detail=True,
        methods=['get'],
        url_path='download',
        permission_classes=[permissions.IsAuthenticated]
    )
    def download(self, request, pk=None):
        """
        Sirve el ZIP únicamente si el usuario está autenticado.
        """
        plantilla = self.get_object()
        filepath = plantilla.file.path
        filename = os.path.basename(filepath)
        return FileResponse(
            open(filepath, 'rb'),
            as_attachment=True,
            filename=filename
        )
