from django.utils.module_loading import autodiscover_modules
from cashapp_my.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_my', register_to=urlpatterns)