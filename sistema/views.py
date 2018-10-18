from django.shortcuts import render, redirect
from .forms import RegistrationForm, UserInfosForm, EditProfileForm, UserChangeForm, CharacterInfosForm
from django.contrib.auth import authenticate, login
from .models import UserProfile
from django.http import HttpResponse


def home(request):
	return render(request, 'sistema/home.html')

def profile(request):
	if request.user.is_authenticated:
		return render(request, 'sistema/profile.html', {'user': request.user})
	else:
		return redirect('url_home')

def edit_profile(request):
	if request.method == 'POST':
		form = EditProfileForm(request.POST, instance=request.user)

		if form.is_valid():
			form.save()
			return redirect('url_profile')

	if request.user.is_authenticated:
		form = EditProfileForm(instance=request.user)
		return render(request, 'sistema/edit_profile.html', {'form': form})		
	else:
		return redirect('url_home')

def ranking(request):
	if request.user.is_authenticated:
		return render(request, 'sistema/ranking.html')
	else:
		return redirect('url_home')

def create_character(request):
	if request.method == 'POST':
		form = CharacterInfosForm(request.POST, instance=request.user)

		if form.is_valid():
			character = form.save()
			character.userprofile.characterName = form.cleaned_data.get('characterName', None)
			character.userprofile.characterGender = form.cleaned_data.get('characterGender', None)
			character.userprofile.save()
			return redirect('url_play')

	if request.user.is_authenticated:
		user = request.user
		if user.userprofile.characterName is None or user.userprofile.characterGender is None:
			form = CharacterInfosForm()
			return render(request, 'sistema/create_character.html', {'form': form})
		else:
			return redirect('url_play')
	else:
		return redirect('url_home')	

def play(request):
	if request.method == 'POST':
		player = UserProfile.objects.get()
		player.playerX = request.POST['playerPosX']
		player.save()

	if request.user.is_authenticated:
		return render(request, 'sistema/play.html', {'user': request.user})
	else:
		return redirect('url_home')

def register(request):
	if request.user.is_authenticated:
		return redirect('url_home')
		
	if request.method == 'POST':
		form = RegistrationForm(request.POST)
		form2 = UserInfosForm(request.POST)

		if form.is_valid() and form2.is_valid():
			user = form.save()
			user.userprofile.birthdate = form2.cleaned_data.get('birthdate', None)
			user.userprofile.save()
			username = form.cleaned_data['username']
			password = form.cleaned_data['password1']
			user = authenticate(username=username, password=password)
			login(request, user)
			return redirect('url_home')
	else:
		form = RegistrationForm()
		form2 = UserInfosForm()
	return render(request, 'registration/register.html', {'form': form, 'form2': form2})

def forgetPassword(request):	
	return render(request, 'sistema/forget.html')
