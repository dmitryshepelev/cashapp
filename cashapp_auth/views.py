from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Base of auth module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'auth_base.html', {})


@require_http_methods(['GET'])
def ui_view(request):
	"""
	UiView of auth module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'auth_ui_view.html', {})


@require_http_methods(['GET'])
def sign_in(request):
	"""
	Sign in page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sign_in.html', {})


@require_http_methods(['GET'])
def sign_up(request):
	"""
	Sign up page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'sign_up.html', {})
