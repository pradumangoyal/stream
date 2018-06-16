from django.contrib import admin
from .models import Song_model
# Register your models here.

class Song_modelAdmin(admin.ModelAdmin):
    pass
admin.site.register(Song_model, Song_modelAdmin)
