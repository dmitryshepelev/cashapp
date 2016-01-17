from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'base.html', {})


@require_http_methods(['GET'])
def ui_view(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'ui_view.html', {})


@require_http_methods(['GET'])
def sign_in(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sign_in.html', {})


@require_http_methods(['GET'])
def sign_up(request):
	"""
	Page to signup or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sign_up.html', {})
