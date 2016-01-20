from django.utils.module_loading import autodiscover_modules
from cashapp_sett.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_sett', register_to=urlpatterns)