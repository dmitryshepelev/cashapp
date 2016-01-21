from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Base of auth module
	:param request: http request
	:return: HttpResponse
	"""
	redirect_url = request.GET.get('next', '')
	return render(request, 'auth_base.html', {'redirect_url': redirect_url})


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


@require_http_methods(['GET'])
def sign_out(request):
	"""
	Sign out current user
	:param request: HTTP request
	:return: redirect to '/'
	"""
	logout(request)
	return redirect('/')
