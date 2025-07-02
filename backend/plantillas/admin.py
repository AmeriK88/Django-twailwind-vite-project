# plantillas/admin.py
from django.contrib import admin
from .models import Plantilla

@admin.register(Plantilla)
class PlantillaAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'created_at')
    list_filter  = ('created_at', 'created_by')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at',)
