from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
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
