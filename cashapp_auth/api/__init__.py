from django.utils.module_loading import autodiscover_modules
from cashapp_auth.api.urls import urlpatterns


def autodiscover():
    autodiscover_modules('cashapp_auth_api', register_to=urlpatterns)