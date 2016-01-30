from django.conf.urls import url

from cashapp_api.sett.controllers import get_ui_tabs, get_currencies, manage_po


urlpatterns = [
	url(r'^getUiTabs/$', get_ui_tabs),
	url(r'^getCurrencies/$', get_currencies),
	url(r'^po/(?P<po_type>cash|card)/$', manage_po)
]
