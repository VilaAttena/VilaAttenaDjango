from django.urls import path
from .views import home, profile, ranking, play, sign_up, sign_in, forgetPassword

urlpatterns = [
	path('', home, name='url_home'),
	path('profile/', profile, name='url_profile'),
	path('ranking/', ranking, name='url_ranking'),
	path('play/', play, name='url_play'),
	path('sign_up/', sign_up, name='url_signup'),
	path('sign_in/', sign_in, name='url_signin'),
	path('forget/', forgetPassword, name='url_forgetPassword'),
]