from django.urls import path
from .views import home, profile, ranking, play, register, forgetPassword
from django.contrib.auth.views import logout_then_login, login
from .forms import LoginForm

urlpatterns = [
	path('', home, name='url_home'),
	path('profile/', profile, name='url_profile'),
	path('ranking/', ranking, name='url_ranking'),
	path('play/', play, name='url_play'),
	path('accounts/register/', register, name='url_register'),
	path('accounts/login/', login, {'authentication_form': LoginForm}),
	path('forget/', forgetPassword, name='url_forgetPassword'),
	path('accounts/logout/', lambda request: logout_then_login(request, "/"), name='url_logout'),
]