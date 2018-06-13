from django.db import models


class User(models.Model):
	name = models.CharField(max_length=100)
	login = models.CharField(max_length=20)
	email = models.EmailField(max_length=200)
	dateBirth = models.DateField(auto_now=False, auto_now_add=False)
	password = models.CharField(max_length=100)	

	def __str__(self):
		return self.login

