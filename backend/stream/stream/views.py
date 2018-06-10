from django.http import HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from . import serializers

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = User.objects.get(username=username)
            user.is_active = False
            user.save()
            return redirect('../login')
    else:
        form = UserCreationForm()
    return render(request, 'stream/signup.html', {'form': form})

def try_d(request, id):
    return HttpResponse("Try {}".format(id))


@login_required(login_url='login')
def home(request):
    if(request.user.is_superuser):
        active_users = User.objects.filter(is_active = True)
        inactive_users = User.objects.filter(is_active = False)
        return render(request, 'stream/admin.html', {'active_users': active_users, 'inactive_users': inactive_users})
    else:
        return render(request, 'stream/home.html')

@login_required(login_url='login')
def toggle(request):
    if(request.user.is_superuser):
        if(request.method == 'POST'):
            user = request.POST['user']
            user = get_object_or_404(User, username=user)
            if(user):
                user.is_active = not user.is_active
                user.save()
    return redirect('home')

@login_required(login_url='login')
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, username):
        user = get_object_or_404(User, username=username)

        if( request.user.is_superuser ):
            if request.method == 'GET':
                serializer = serializers.UserSerializer(user)
                return Response(serializer.data)

            elif request.method == 'PUT':
                serializer = serializers.UserSerializer(user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif request.method == 'DELETE':
                snippet.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return redirect('home')
