from django.utils.module_loading import autodiscover_modules
from cashapp_sett.api.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_sett_api', register_to=urlpatterns)