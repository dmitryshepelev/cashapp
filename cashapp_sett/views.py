from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
@login_required
def base(request):
	"""
	Base of sett module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sett_base.html', {})


@require_http_methods(['GET'])
@login_required
def ui_view(request):
	"""
	UiView of sett module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sett_ui_view.html', {})


@require_http_methods(['GET'])
@login_required
def general(request):
	"""
	Page of general settings
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'general.html', {})


