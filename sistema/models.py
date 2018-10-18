from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate = models.DateField(null=True, blank=False)
    characterName = models.CharField(max_length=10, null=True)
    GENDER = (('Masculino', 'Masculino'), ('Feminino', 'Feminino'))
    characterGender = models.CharField(choices=GENDER, max_length=9, null=True, blank=False, default='')
    playerX = models.IntegerField(null=True)
    playerY = models.IntegerField(null=True)

    def __str__(self):
        return self.user.username

def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])

post_save.connect(create_profile, sender=User)