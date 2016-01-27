from django.conf.urls import url

from cashapp_my.views import base, ui_view, dashboard


urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^dashboard/$', dashboard),
]