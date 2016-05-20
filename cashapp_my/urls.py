from django.conf.urls import url

from cashapp_my.views import base, ui_view, dashboard, po_details, po_modal, manage_po, transaction_modal, category, \
	category_modal, expense_item, supplier, supplier_modal

urlpatterns = [
	url(r'^$', base),
	url(r'^uiview/$', ui_view),
	url(r'^dashboard/$', dashboard),
	url(r'^po/$', manage_po),
	url(r'^po/details/$', po_details),
	url(r'^po/modal/$', po_modal),
	url(r'^transaction/modal/(?P<transaction_type>income|expense|transfer)/$', transaction_modal),
	url(r'^category/$', category),
	url(r'^category/modal/$', category_modal),
	url(r'^supplier/$', supplier),
	url(r'^supplier/modal/$', supplier_modal),
	url(r'^expense_item/$', expense_item)
]
