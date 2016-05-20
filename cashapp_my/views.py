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
	Get manage po modal template
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'po_modal.html', {})


@require_http_methods(['GET'])
@login_required
def po_details(request):
	"""
	PO details page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'po_details.html', {})


@require_http_methods(['GET'])
@login_required
def transaction_modal(request, transaction_type):
	"""
	Get transact modal template of specified type
	:param request: http request
	:param transaction_type: income|expense|transfer
	:return: HttpResponse
	"""
	return render(request, 'transaction_modal_{type}.html'.format(type=transaction_type))


@require_http_methods(['GET'])
@login_required
def category(request):
	"""
	Category page
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'category.html', {})


@require_http_methods(['GET'])
@login_required
def category_modal(request):
	"""
	Category modal template
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'category_modal.html', {})


@require_http_methods(['GET'])
@login_required
def expense_item(request):
	"""
	Expense item template
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'expense_item.html', {})


@require_http_methods(['GET'])
@login_required
def supplier(request):
	"""
	Supplier template
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'supplier.html', {})


@require_http_methods(['GET'])
@login_required
def supplier_modal(request):
	"""
	Supplier modal template
	:param request: http request
	:return: HttpResponse
	"""
	return render(request, 'supplier_modal.html', {})