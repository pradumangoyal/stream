from django.db import models

# Create your models here.

class Song_model(models.Model):
    url = models.CharField(max_length=500)
    volume = models.CharField(max_length=30)
    duration = models.CharField(max_length=30)
    seek = models.CharField(max_length=30)
    play = models.CharField(max_length=2)
    mute = models.CharField(max_length=2)
    title = models.CharField(max_length=500)
    dj = models.CharField(max_length=30)
