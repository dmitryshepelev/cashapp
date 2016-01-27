from django.utils.module_loading import autodiscover_modules

from cashapp_api.authoruze.urls import urlpatterns


def autodiscover():
    autodiscover_modules('cashapp_api_auth', register_to=urlpatterns)