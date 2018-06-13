from django.forms import ModelForm
from django import forms
from .models import User

class NewUserForm(ModelForm):
	confirmPassword = forms.CharField(label='Confirmar Senha', widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirme sua senha'}))	
	class Meta:
		model = User
		fields = '__all__'
		labels = {
			'name': 'Nome',
			'login': 'Nome de Usuário',
			'email': 'E-mail',
			'dateBirth': 'Data de Nascimento',
			'password': 'Senha',			
		}		
		widgets = { 
    	'name': forms.TextInput(attrs={'class': 'form-control',	'placeholder': 'Informe seu nome'}),
    	'login': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Informe seu nome de usuário'}),
    	'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Informe seu e-mail'}),
    	'dateBirth': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
    	'password': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Informe sua senha'}),     	   
    }
	
	def clean_login(self):
		login = self.cleaned_data['login']
		try:
			match = User.objects.get(login = login)
		except:
			return self.cleaned_data['login'] 
		raise forms.ValidationError('Esse Nome de Usuário já está sendo usado!')

	def clean_email(self):
		email = self.cleaned_data['email']
		try:
			match = User.objects.get(email = email)
		except:
			return self.cleaned_data['email']
		raise forms.ValidationError('Esse E-mail já está cadastrado!')

	def clean_confirmPassword(self):
		password = self.cleaned_data['password']
		confirmPassword = self.cleaned_data['confirmPassword']
		MIN_LENGTH = 8
		if password and confirmPassword:
			if password != confirmPassword:
				raise forms.ValidationError('As senhas não coincidem!')
			else:
				if len(password) < MIN_LENGTH:
					raise forms.ValidationError('A senha deve conter pelo menos 8 carateres!')
				if password.isdigit():
					raise forms.ValidationError('A senha não pode contar apenas números!')

class LoginForm(ModelForm):
	class Meta:
		model = User
		fields = ['login', 'password']
		labels = {
			'login': 'Usuário',
			'password': 'Senha',
		}
		widgets = {
			'login': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nome de usuário'}),
			'password': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Senha'}),
		}

class ProfileForm(ModelForm):
	class Meta:
		model = User
		fields = ['name', 'login', 'email', 'dateBirth']
		labels = {
			'name': 'Nome',
			'login': 'Nome de Usuário',
			'email': 'E-mail',
			'dateBirth': 'Data de Nascimento',
		}
		widgets = {
			'name': forms.TextInput(attrs={'class': 'form-control',}),
			'login': forms.TextInput(attrs={'class': 'form-control',}),
			'email': forms.EmailInput(attrs={'class': 'form-control',}),
			'dateBirth': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
		}

class ForgetPasswordForm(ModelForm):
	class Meta:
		model = User
		fields = ['email']
		labels = {
			'email': 'E-mail',			
		}
		widgets = {
			'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Informe seu email'}),
		}