from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
@login_required
def base(request):
	"""
	Base of my module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'my_base.html', {})


@require_http_methods(['GET'])
@login_required
def ui_view(request):
	"""
	UiView of my module
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'my_ui_view.html', {})


@require_http_methods(['GET'])
@login_required
def dashboard(request):
	"""
	Page to show dashboard
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'dashboard.html', {})


@require_http_methods(['GET'])
@login_required
def po_widget(request):
	"""
	Partial page to show widget
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'po_widget.html', {})


@require_http_methods(['GET'])
@login_required
def manage_po(request):
	"""
	Set initial cash page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'manage_po.html', {})


@require_http_methods(['GET'])
@login_required
def po_modal(request):
	"""
	Set initial cash page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'po_modal.html', {})
