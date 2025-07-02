from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Plantilla(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file        = models.FileField(upload_to='plantillas/')
    thumbnail   = models.ImageField(upload_to='plantillas/thumbnails/')
    created_by  = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
