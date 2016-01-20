from django.conf.urls import url, include
from cashapp_my import api

from cashapp_my.views import base, ui_view, dashboard, conf


urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^dashboard/$', dashboard),
	url(r'^conf/(ui_view|general|init)/$', conf),

	url(r'^api/', include(api.urlpatterns))
]