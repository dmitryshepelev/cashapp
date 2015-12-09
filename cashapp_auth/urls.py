from django.conf.urls import url
from cashapp_auth.views import ui_view, sign_in, sign_up

urlpatterns = [
    url(r'^$', ui_view),
    url(r'^signin/$', sign_in),
    url(r'^signup/$', sign_up),
]