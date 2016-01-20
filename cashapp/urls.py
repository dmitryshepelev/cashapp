"""cashapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin
from cashapp.views import ui_template

import cashapp_auth
import cashapp_my
import cashapp_sett


urlpatterns = [
	url(r'^admin/', admin.site.urls),
	url(r'^auth/', include(cashapp_auth.urlpatterns)),
	url(r'^my/', include(cashapp_my.urlpatterns)),
	url(r'^sett/', include(cashapp_sett.urlpatterns)),

	url(r'^uitempl/(?P<templ_type>ui)/(?P<name>\w+)/$', ui_template)
]