from django.conf.urls import url

from cashapp_my.views import base, ui_view, dashboard, po_widget


urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^dashboard/$', dashboard),
	url(r'^po-widget/$', po_widget),
]