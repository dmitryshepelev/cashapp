from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_my.libs.SearchEngine import SearchEngine


@api_authorized()
@require_http_methods(['GET'])
@request_wrapper()
def search(request):
	"""
	Search engine
	:param request:
	GET:
		required query params:
			:parameter type: type of object to search instance
			:parameter q: search query
	:return:
	"""
	obj_type = request.get_params.get('type', None)
	q = request.get_params.get('q', None)

	if not obj_type or not q:
		return ServerResponse.bad_request(message = Message.error('Required params are not defined'))

	search_engine = SearchEngine()
	search_engine.obj_type = obj_type

	instances = search_engine.search(q, user = request.user)

	return ServerResponse.ok(data = {
		'type': search_engine.model.__name__,
		'q': q,
		'instances': [i.serialize() for i in instances]
	})
