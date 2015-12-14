from django.conf.urls import url
from cashapp_auth.views import base, sign_in, sign_up, ui_view

urlpatterns = [
    url(r'^$', base),
    url(r'^uiview/$', ui_view),
    url(r'^signin/$', sign_in),
    url(r'^signup/$', sign_up),
]