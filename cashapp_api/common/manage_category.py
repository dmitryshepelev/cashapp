from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.Exceptions.ModelsAppBaseException import CreationError
from cashapp_models.models.CategoryModel import Category
from cashapp_my.forms.CategoryForm import CategoryForm


@api_authorized()
@require_http_methods(['GET', 'PUT', 'POST'])
@request_wrapper()
def manage_category(request, guid = None):
	"""
	Manage category
	:param request: HttpRequest
	GET:
		'/api/cmn/category/' - get all roots
		'/api/cmn/category/?subs=true' - get all roots
		'/api/cmn/category/{guid}/' - get category by guid
		'/api/cmn/category/{guid}/?subs=true' - get category with subs
	:return: ServerResponse
	"""
	field_name = 'category'

	if request.is_GET:
		subs_field_name = 'subs'
		parent_field_name = 'parent'

		if guid:
			try:
				category = Category.objects.get(guid = guid, owner_id = request.user.pk)
			except ObjectDoesNotExist as e:
				return ServerResponse.not_found()

			result = {field_name: category.serialize()}

			if request.request.GET.get(subs_field_name, False):
				result[field_name][subs_field_name] = [s.serialize() for s in category.get_subs()]

			if request.request.GET.get(parent_field_name, False):
				parent_category = category.get_parent()

				result[field_name][parent_field_name] = parent_category.serialize() if parent_category else None

			return ServerResponse.ok(data = result)

		else:
			categories = Category.objects.get_roots(owner_id = request.user.pk)
			return ServerResponse.ok(data = {field_name: {subs_field_name: [c.serialize() for c in categories]}})

	if request.is_PUT:
		category_guid = request.data.get('guid', None)

		if not category_guid:
			return ServerResponse.bad_request(message=Message.error('Guid is not defined'))

		try:
			category = Category.objects.get(guid = category_guid, owner_id = request.user.pk)
			category.update(request.data)
			category.save()
		except ObjectDoesNotExist as e:
			return ServerResponse.not_found()
		except Exception as e:
			return ServerResponse.internal_server_error(message=Message.error('The error was occured during saving process'))

		return ServerResponse.ok(data={field_name: category.serialize()})

	if request.is_POST:
		form = CategoryForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		name = request.data.get('name')
		parent_guid = request.data.get('parent_guid', None)
		if parent_guid:
			# create subcategory
			try:
				parent_category = request.user.category_set.get(guid = parent_guid)
			except ObjectDoesNotExist as e:
				return ServerResponse.not_found(message = Message.error('Parent category does not exist'))

			try:
				category = Category.objects.create_sub(name, parent_category)
			except CreationError as e:
				return ServerResponse.internal_server_error(message = Message.error(e.message))

		else:
			# create root level category
			category = Category.objects.create_root(name)

		category.owner = request.user
		category.save()

		return ServerResponse.created(data = {field_name: category.serialize()})
