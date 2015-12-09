from django.utils.module_loading import autodiscover_modules
from cashapp_auth.urls import urlpatterns


def autodiscover():
    autodiscover_modules('cashapp_auth', register_to=urlpatterns)