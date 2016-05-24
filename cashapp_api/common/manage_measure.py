from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.models.MeasureModel import Measure


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def manage_measure(request):
	"""
	Get list of available measures
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	data = {'measures': [measure.serialize() for measure in Measure.objects.all()]}
	return ServerResponse.ok(data=data)
