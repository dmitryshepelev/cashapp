from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from cashapp import services
from cashapp.classes.ServerResponse import ServerResponse


@login_required
@require_http_methods(['GET'])
def get_ui_tabs(request):
	"""
	Returns ui tabs depends on current user
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	user = request.user

	default_tab_values = [
		['general_title', 'sett.general', False, False],
		['po_title', 'sett.po', False, False]
	]

	generate_tabs_result = services.generate_ui_tab_collection(default_tab_values)

	return ServerResponse.ok(data=generate_tabs_result.data)