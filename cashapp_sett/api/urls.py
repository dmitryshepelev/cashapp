from django.conf.urls import url
from cashapp_sett.api.controllers import get_ui_tabs, manage_lang

urlpatterns = [
	url(r'^getUiTabs/$', get_ui_tabs),
	url(r'^lang/$', manage_lang)
]
