from django.views.decorators.http import require_http_methods

from cashapp.decorators import api_authorized, request_wrapper
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.POTypeModel import POType


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_po_types(request):
	"""
	Get list of available po types
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	data = {'types': [type.serialize() for type in POType.objects.all()]}
	return ServerResponse.ok(data=data)