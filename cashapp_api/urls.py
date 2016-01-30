from django.conf.urls import url, include
from cashapp_api import auth, my, sett, common

urlpatterns = [
	url(r'^auth/', include(auth.urlpatterns)),
	url(r'^my/', include(my.urlpatterns)),
	url(r'^sett/', include(sett.urlpatterns)),
	url(r'^cmn/', include(common.urlpatterns)),
]
