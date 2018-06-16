from .models import Song_model
from rest_framework import serializers

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
                    'url', 
                    'volume',   
                    'duration', 
                    'seek', 
                    'play',     
                    'mute',     
                    'dj'
        )
        model = Song_model
