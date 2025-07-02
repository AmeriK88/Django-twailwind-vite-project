# plantillas/serializers.py
from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Plantilla

class PlantillaSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Plantilla
        fields = [
            'id',
            'title',
            'description',
            'thumbnail',
            'download_url',
            'created_at',
            'created_by',
        ]
        read_only_fields = ['id', 'created_at', 'created_by']

    def get_download_url(self, obj):
        request = self.context.get('request')
        # 'plantilla-download' es el basename + action name por default:
        url = reverse('plantilla-download', args=[obj.pk], request=request)
        return url
