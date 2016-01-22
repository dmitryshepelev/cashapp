from cashapp import settings
from cashapp_sett.classes.ServiceResult import ServiceResult


def generate_ui_tab_collection(user):
	"""
	Generate ui tabs collection
	:param user: current user
	:return: ServiceResult instance
	"""
	result = ServiceResult()

	keys = ['heading', 'toState', 'show']
	default_tab_values = [
		['general_title', 'sett.general', False],
		['set_cash_title', 'sett.setCash', False]
	]

	result.data = {
		'tabs': [dict(zip(keys, tab_values)) for tab_values in default_tab_values]
	}
	return result


def get_language():
	"""
	Get current ui language
	:return: ServiceResult
	"""
	result = ServiceResult()

	# TODO: read lang key from profile personalization
	result.data = {
		'key': settings.CURRENT_LANGUAGE
	}
	return result


def set_language(key):
	"""
	Set current ui language
	:param key: language key
	:return: ServiceResult
	"""
	result = ServiceResult()

	# TODO: write lang key in profile personalization
	settings.CURRENT_LANGUAGE = key if key in settings.AVAILABLE_LANGUAGES else 'en'

	result.data = {
		'key': settings.CURRENT_LANGUAGE
	}
	return result