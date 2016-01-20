from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Base of my module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'my_base.html', {})


@require_http_methods(['GET'])
def ui_view(request):
	"""
	UiView of my module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'my_ui_view.html', {})


@require_http_methods(['GET'])
def dashboard(request):
	"""
	Page to show dashboard
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'dashboard.html', {})