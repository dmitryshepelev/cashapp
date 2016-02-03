from decimal import Decimal

from django.db.models import Max
from django.views.decorators.http import require_http_methods

from cashapp import settings
from cashapp.classes.Message import Message
from cashapp.classes.Request import Request
from cashapp.classes.ServerResponse import ServerResponse
from cashapp_api.server_errors import ServerErrorText
from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.WidgetModel import Widget


@require_http_methods(['GET'])
def manage_currency(request):
	"""
	Get list of available currencies
	:param request: HttpRequest
	:return: ServerResponse instance
	"""
	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	data = {
		'currencies': [{
			'code': currency.code,
			'hex': currency.hex,
			'dec': currency.dec,
			'label': currency.label
		} for currency in Currency.objects.all()]
	}

	return ServerResponse.ok(data=data)


@require_http_methods(['GET', 'PUT', 'POST', 'DELETE'])
def manage_po(request, po_type=None):
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
		if po_type:
			# Get by type
			result = {po_type: []}

			payment_objects = request.user.paymentobject_set.filter(type_id=po_type)

			for po in payment_objects:
				result[po_type].append(dict(guid=po.guid, name=po.name, currency=po.currency_id, balance=po.get_last_register().balance))

			return ServerResponse.ok(data=result)

		else:
			# Get all
			result = {'po': []}

			payment_objects = request.user.paymentobject_set.all()

			for po in payment_objects:
				result['po'].append(dict(guid=po.guid, type=po.type_id, name=po.name, currency=po.currency.get_vm('code', 'dec', 'label'), balance=po.get_last_register().balance))

			return ServerResponse.ok(data=result)

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		if not po_type:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.TYPE_ISNT_SPECIFIED))

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


@require_http_methods(['GET'])
def manage_pers(request):
	"""
	Manage PERS
	:param request: HTTP request
	:return: ServerResponse instance
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		result = {}

		item_names = request.request.GET.get('i', '').split(',')

		for item_name in item_names:
			if item_name == 'widget':
				result[item_name] = []

				for widget in Widget.objects.filter(pers_id=request.user.pers.pk):
					result[item_name].append(widget.get_vm())

		return ServerResponse.ok(data=result)

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		pass


@require_http_methods(['POST', 'DELETE'])
def manage_widgets(request):
	"""
	Manage PERS
	:param request: HTTP request
	GET:
	DELETE: delete existing widget: Required params: guid. returns deleted widget guid
	PUT:
	POST: create new widget. Required params: guid, type. Returns created widget vm
	:return: ServerResponse instance
	"""
	request = Request(request)

	if not request.user.is_authenticated():
		return ServerResponse.unauthorized()

	if request.is_GET:
		pass

	if request.is_DELETE:
		# Get request param
		guid = request.get('guid')

		if not guid:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		# Get widget to delete
		widget = Widget.objects.get(guid=guid)

		# Check if current user is owner of this widget
		if not widget.pers.user.pk == request.user.pk:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		widget.delete()
		return ServerResponse.ok(data={'guid': guid})

	if request.is_PUT:
		pass

	if request.is_POST:

		guid = request.data.get('guid')
		type = request.data.get('type')

		if not guid or not type:
			return ServerResponse.bad_request(message=Message.error(ServerErrorText.INVALID_DATA))

		widget = Widget.objects.create(object_guid=guid, object_type=type, pers_id=request.user.pers.pk)

		return ServerResponse.created(data={'widget': widget.get_vm()})