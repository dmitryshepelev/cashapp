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
				last_register = po.poregister_set.annotate(max_date=Max('date')).first()
				result[po_type].append(dict(guid=po.guid, name=po.name, currency=po.currency_id, balance=last_register.balance))

			return ServerResponse.ok(data=result)

		else:
			# Get all
			result = {'po': []}

			payment_objects = request.user.paymentobject_set.all()

			for po in payment_objects:
				last_register = po.poregister_set.annotate(max_date=Max('date')).first()
				result['po'].append(dict(guid=po.guid, type=po.type_id, name=po.name, currency=dict(code=po.currency.code, dec=po.currency.dec, label=po.currency.label), balance=last_register.balance))

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
				result[item_name] = [dict(type=widget.object_type, guid=widget.object_guid, order=widget.order_number) for widget in Widget.objects.filter(pers_id=request.user.pers.pk)]

		return ServerResponse.ok(data=result)

	if request.is_DELETE:
		pass

	if request.is_PUT:
		pass

	if request.is_POST:
		pass