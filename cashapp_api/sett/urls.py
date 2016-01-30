from django.conf.urls import url

from cashapp_api.sett.controllers import get_ui_tabs


urlpatterns = [
	url(r'^getUiTabs/$', get_ui_tabs),
]
