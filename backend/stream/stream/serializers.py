from django.contrib.auth.models import User
from rest_framework import serializers, views, status
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'is_active',
        )
        model = User

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
