from django.conf.urls import url, include
from cashapp_api import authoruze, my, sett

urlpatterns = [
	url(r'^auth/', include(authoruze.urlpatterns)),
	url(r'^my/', include(my.urlpatterns)),
	url(r'^sett/', include(sett.urlpatterns)),
]
