import json
from decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Max
from django.views.decorators.http import require_http_methods

from cashapp import settings
from cashapp.classes.Message import Message
from cashapp.classes.Request import Request
from cashapp.classes.ServerResponse import ServerResponse
from cashapp_api.server_errors import ServerErrorText
from cashapp_models.models.POModel import PaymentObject
from cashapp_sett import services


@login_required
@require_http_methods(['GET'])
def get_ui_tabs(request):
	"""
	Returns ui tabs depends on current user
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	user = request.user

	generate_tabs_result = services.generate_ui_tab_collection(user)

	return ServerResponse.ok(data=generate_tabs_result.data)


@login_required
@require_http_methods(['GET'])
def get_currencies(request):
	"""
	Get list of available currencies
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	return ServerResponse.ok(data=services.get_available_currencies().data)


@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
def manage_po(request, po_type):
	"""
	Manage the payment objects depending on HTTP method
	GET: return already created PO
	DELETE:
	PUT:
	POST: create new PO
	:param request: HTTP request
	:param po_type: payment object type
	:return: ServerResponse instance
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		result = {po_type: []}

		finances = request.user.paymentobject_set.filter(type_id=po_type)

		for f in finances:
			last_register = f.poregister_set.annotate(max_date=Max('date')).first()
			result[po_type].append(dict(guid=f.guid, name=f.name, currency=f.currency_id, created=True, balance=last_register.balance))

		return ServerResponse.ok(data=result)

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		if not isinstance(request.data, list):
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.NOT_AN_ARRAY))

		instances = []
		try:
			for index, value in enumerate(request.data):
				instance = PaymentObject.parse(value, po_type, request.user.pk)

				if instance is not None:
					inst = dict(id=value.get('id', index))
					try:
						instance.save(balance=Decimal(value.get('balance')))
						inst.__setitem__('guid', instance.guid)
					except Exception as e:
						inst.__setitem__('error', True)
					finally:
						instances.append(inst)

			if len(instances) == 0:
				return ServerResponse.bad_request(message=Message.warning(ServerErrorText.NO_PO_CREATED))

		except Exception as e:
			return ServerResponse.internal_server_error(message=Message.error(e.message)) if settings.DEBUG else ServerResponse.internal_server_error()

		return ServerResponse.created(data={'instances': instances})