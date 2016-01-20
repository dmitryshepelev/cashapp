from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def base(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'my_base.html', {})


@require_http_methods(['GET'])
def ui_view(request):
	"""
	Page to signin or signup
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


@require_http_methods(['GET'])
def conf(request, *args):
	"""
	Page to show dashboard
	:param request: http request
	:return: HttpResponse
	"""
	base_name = 'conf_{name}.html'
	return render(request, base_name.format(name=args[0] if len(args) == 1 else 'general'), {})