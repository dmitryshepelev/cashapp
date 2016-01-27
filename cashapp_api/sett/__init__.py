from django.utils.module_loading import autodiscover_modules

from cashapp_api.sett.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_api_sett', register_to=urlpatterns)