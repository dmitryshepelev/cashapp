import json
from cashapp import settings


class TranslateUtil(object):
	@staticmethod
	def translate(*args, **kwargs):
		"""
		Translate value by key and use specified language package
		:param args: value keys
		:param kwargs: lang identifier
		:return: localized value or ''
		"""
		package = open('cashapp/static/res/locale/{identifier}.json'.format(identifier=kwargs.get('lang', settings.CURRENT_LANGUAGE)))
		data = json.load(package)

		return dict([(key, data.get(key, '')) for key in args])