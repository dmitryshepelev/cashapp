from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_http_methods

from cashapp.decorators import request_wrapper, api_authorized
from cashapp.libs.Message import Message
from cashapp.libs.ServerResponse import ServerResponse
from cashapp_models.Exceptions.ModelsAppBaseException import CreationError
from cashapp_models.models.CategoryModel import Category
from cashapp_my.forms.CategoryForm import CategoryForm


@api_authorized()
@require_http_methods(['POST'])
@request_wrapper()
def manage_category(request):
	"""
	Manage category
	:param request: HttpRequest
	:return: ServerResponse
	"""
	field_name = 'category'

	if request.is_POST:
		form = CategoryForm(request.data)

		if form.errors:
			return ServerResponse.bad_request(data = form.errors)

		name = request.data.get('name')
		parent_guid = request.data.get('parent_guid', None)
		if parent_guid:
			# create subcategory
			try:
				parent_category = Category.objects.get(guid = parent_guid)
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
