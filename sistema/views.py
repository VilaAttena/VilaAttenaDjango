from django.shortcuts import render, redirect
from .forms import NewUserForm, LoginForm, ProfileForm, ForgetPasswordForm


def home(request):
	return render(request, 'sistema/home.html')

def profile(request):
	form = ProfileForm(request.POST or None)
	return render(request, 'sistema/profile.html', {'form': form})

def ranking(request):
	return render(request, 'sistema/ranking.html')

def play(request):
	return render(request, 'sistema/play.html')

def sign_up(request):
	form = NewUserForm(request.POST or None)
	if form.is_valid():
		form.save()
		return redirect('url_home')
	return render(request, 'sistema/sign_up.html', {'form': form})

def sign_in(request):
	form = LoginForm(request.POST or None)
	
	return render(request, 'sistema/sign_in.html', {'form': form})

def forgetPassword(request):
	form = ForgetPasswordForm(request.POST or None)
	return render(request, 'sistema/forget.html', {'form': form})

