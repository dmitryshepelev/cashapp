from django.utils.module_loading import autodiscover_modules

from cashapp_api.common.urls import urlpatterns


def autodiscover():
	autodiscover_modules('cashapp_api_common', register_to=urlpatterns)