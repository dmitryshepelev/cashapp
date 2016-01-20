from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Base of sett module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sett_base.html', {})


@require_http_methods(['GET'])
def ui_view(request):
	"""
	UiView of sett module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sett_ui_view.html', {})


@require_http_methods(['GET'])
def general(request):
	"""
	Page of general settings
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'general.html', {})


@require_http_methods(['GET'])
def set_cash(request):
	"""
	Set initial cash page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'set_cash.html', {})