from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def ui_view(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render_to_response('ui_view.html', {}, context_instance=RequestContext(request))


def sign_in(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render_to_response('sign_in.html', {}, context_instance=RequestContext(request))


def sign_up(request):
	"""
	Page to signin or signup
	:param request: http request
	:return: HttpResponse
	"""
	return render_to_response('sign_up.html', {}, context_instance=RequestContext(request))
