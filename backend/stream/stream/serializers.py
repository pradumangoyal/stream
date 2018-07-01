from django.contrib.auth.models import User
from rest_framework import serializers, views, status
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'is_active',
        )
        model = User

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class UserRegSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'], is_active=False)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
