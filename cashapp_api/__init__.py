from django.utils.module_loading import autodiscover_modules

from cashapp_api.urls import urlpatterns


def autodiscover():
    autodiscover_modules('cashapp_api', register_to=urlpatterns)