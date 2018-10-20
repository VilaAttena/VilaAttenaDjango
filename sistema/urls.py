from django.urls import path, re_path
from .views import home, profile, edit_profile, rankingLevel, rankingPong, rankingFishing, rankingBreakout, rankingFlappyBird, rankingGuitarHero, rankingMaze, play, create_character, register, forgetPassword
from django.contrib.auth.views import logout_then_login, login, password_reset, password_reset_done, password_reset_confirm, password_reset_complete
from .forms import LoginForm

urlpatterns = [
	path('', home, name='url_home'),
	path('profile/', profile, name='url_profile'),
	path('edit_profile/', edit_profile, name='url_edit_profile'),
	path('rankingLevel/', rankingLevel, name='url_rankingLevel'),
	path('rankingPong/', rankingPong, name='url_rankingPong'),
	path('rankingFishing/', rankingFishing, name='url_rankingFishing'),
	path('rankingBreakout/', rankingBreakout, name='url_rankingBreakout'),
	path('rankingFlappyBird/', rankingFlappyBird, name='url_rankingFlappyBird'),
	path('rankingGuitarHero/', rankingGuitarHero, name='url_rankingGuitarHero'),
	path('rankingMaze/', rankingMaze, name='url_rankingMaze'),
	path('create_character/', create_character, name='url_create_character'),
	path('play/', play, name='url_play'),
	path('accounts/register/', register, name='url_register'),
	path('accounts/login/', login, {'authentication_form': LoginForm}),
	path('forget/', forgetPassword, name='url_forgetPassword'),
	path('accounts/logout/', lambda request: logout_then_login(request, "/"), name='url_logout'),
	path('reset-password/', password_reset, name='reset_password'),
	path('reset-password/done/', password_reset_done, name='reset_password_done'),
	re_path(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/', password_reset_confirm, name='reset_password_confirm'),
	path('reset-password/complete/', password_reset_complete, name='reset_password_complete'),

]