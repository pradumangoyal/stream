from .models import Song_model
from rest_framework import viewsets
from .serilaizers import SongSerializer

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song_model.objects.get(id=1)
    serializer_class = SongSerializer
