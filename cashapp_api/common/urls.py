from django.conf.urls import url

from cashapp_api.common.manage_currency import manage_currency
from cashapp_api.common.manage_po import manage_po, manage_po_transaction
from cashapp_api.common.manage_po_types import manage_po_types
from cashapp_api.common.manage_transaction import manage_transaction

urlpatterns = [
	url(r'^currency/$', manage_currency),
	url(r'^po_types/$', manage_po_types),
	url(r'^po/$', manage_po),
	url(r'^po/(?P<guid>[a-zA-z0-9]{40})/$', manage_po),
	url(r'^po/(?P<guid>[a-zA-z0-9]{40})/transactions/$', manage_po_transaction),
	url(r'^transaction/$', manage_transaction),
	url(r'^transaction/(?P<transaction_type>income|expense|transfer)/$', manage_transaction),
]
