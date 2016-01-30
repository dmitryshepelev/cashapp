from django.conf.urls import url

from cashapp_sett.views import base, ui_view, general, manage_po


urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^general/$', general),
	url(r'^po/$', manage_po),
]