from django.conf.urls import url

from cashapp_my.views import base, ui_view, dashboard, po_details, po_modal, manage_po

urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^dashboard/$', dashboard),
	url(r'^po/$', manage_po),
	url(r'^po/details/$', po_details),
	url(r'^po/modal/$', po_modal),
]