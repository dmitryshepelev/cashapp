from django.conf.urls import url

from cashapp_api.auth.controllers import sign_up
from cashapp_api.auth.controllers import sign_in


urlpatterns = [
	url(r'^signup/$', sign_up),
	url(r'^signin/$', sign_in)
]
