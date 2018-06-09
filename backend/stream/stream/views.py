from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required


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

@login_required(login_url='login')
def home(request):
    if(request.user.is_superuser):
        return render(request, 'stream/home.html', {'message': 'admin ki jai'})
    else:
        return render(request, 'stream/home.html')
