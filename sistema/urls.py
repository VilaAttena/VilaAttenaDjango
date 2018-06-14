from django.urls import path
from .views import home, profile, ranking, play, register, forgetPassword

urlpatterns = [
	path('', home, name='url_home'),
	path('profile/', profile, name='url_profile'),
	path('ranking/', ranking, name='url_ranking'),
	path('play/', play, name='url_play'),
	path('accounts/register/', register, name='url_register'),
	path('forget/', forgetPassword, name='url_forgetPassword'),
]