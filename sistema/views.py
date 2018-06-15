from django.shortcuts import render, redirect
from .forms import RegistrationForm
from django.contrib.auth import authenticate, login

def home(request):
	return render(request, 'sistema/home.html')

def profile(request):	
	return render(request, 'sistema/profile.html')

def ranking(request):
	return render(request, 'sistema/ranking.html')

def play(request):
	return render(request, 'sistema/play.html')

def register(request):
	if request.method == 'POST':
		form = RegistrationForm(request.POST)

		if form.is_valid():
			form.save()
			username = form.cleaned_data['username']
			password = form.cleaned_data['password1']
			user = authenticate(username=username, password=password)
			login(request, user)
			return redirect('url_home')
	else:
		form = RegistrationForm()
	return render(request, 'registration/register.html', {'form': form})

def forgetPassword(request):	
	return render(request, 'sistema/forget.html')

