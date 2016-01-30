from django.conf.urls import url
from cashapp_api.common.controllers import manage_currency, manage_po


urlpatterns = [
	url(r'^currency/$', manage_currency),
	url(r'^po/(?P<po_type>cash|card)/$', manage_po)
]
