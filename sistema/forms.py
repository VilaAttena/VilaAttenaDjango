from django.forms import EmailField
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django import forms


class UserCreationForm(UserCreationForm):
    email = forms.EmailField(label='Email', required=True) 
    firstName = forms.CharField(label='Nome', required=True)
    lastName = forms.CharField(label='Sobrenome', required=True)

    class Meta:
        model = User
        fields = ("firstName", "lastName", "username", "email", "password1", "password2")


    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.firstName = self.cleaned_data["firstName"] 
        user.lastName = self.cleaned_data["lastName"] 
        user.email = self.cleaned_data["email"]                
        if commit:
            user.save()
        return user

    def clean_username(self):        
        username = self.cleaned_data.get('username')
        
        try:
            match = User.objects.get(username=username)
        except User.DoesNotExist:            
            return username        
        raise forms.ValidationError('Esse Nome de Usuário já existe!')

    def clean_email(self):        
        email = self.cleaned_data.get('email')
        
        try:
            match = User.objects.get(email=email)
        except User.DoesNotExist:            
            return email        
        raise forms.ValidationError('Esse E-mail já está cadastrado!')

    def clean_password(self):
        password = self.cleaned_data['password1']
        confirmPassword = self.cleaned_data['password2']
        MIN_LENGTH = 8
        if password and confirmPassword:
            if password != confirmPassword:
                raise forms.ValidationError('As senhas não coincidem!')
            else:
                if len(password) < MIN_LENGTH:
                    raise forms.ValidationError('A senha deve conter pelo menos 8 carateres!')
                if password.isdigit():
                    raise forms.ValidationError('A senha não pode contar apenas números!')
