from django.utils.module_loading import autodiscover_modules
from cashapp_my.api.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_my_api', register_to=urlpatterns)