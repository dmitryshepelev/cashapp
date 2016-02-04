from django.conf.urls import url
from cashapp_api.common.controllers import manage_currency, manage_po, manage_pers, manage_widgets, manage_register


urlpatterns = [
	url(r'^currency/$', manage_currency),
	url(r'^po/$', manage_po),
	url(r'^po/(?P<po_type>cash|card)/$', manage_po),
	url(r'^pers/$', manage_pers),
	url(r'^widget/$', manage_widgets),
	url(r'^reg/(?P<po_guid>[a-zA-z0-9]{40})/$', manage_register)
]
