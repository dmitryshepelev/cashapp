from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
def ui_template(request, templ_type, name):
	"""
	Returns angular-ui element template
	:param request: HTTP request
	:param name: template name
	:return: HttpResponse instance
	"""
	templ_type = 'angular-ui' if templ_type == 'ui' else ''
	return render(request, '{type}/{name}.html'.format(type=templ_type, name=name), {})
