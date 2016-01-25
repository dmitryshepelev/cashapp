from django.conf.urls import url
from cashapp_sett.api.controllers import get_ui_tabs, manage_lang, get_currencies, set_init_cash

urlpatterns = [
	url(r'^getUiTabs/$', get_ui_tabs),
	url(r'^lang/$', manage_lang),
	url(r'^getCurrencies/$', get_currencies),
	url(r'^setInitCash/$', set_init_cash)
]
