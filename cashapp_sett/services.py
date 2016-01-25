import datetime
from decimal import Decimal
from cashapp import settings
from cashapp.classes.Repository.CurrencyRepository import CurrencyRepository
from cashapp.classes.Repository.FinanceRegisterRepository import FinanceRegisterRepository
from cashapp.classes.Repository.FinanceRepository import FinanceRepository
from cashapp_sett.classes.ServiceResult import ServiceResult


currency_repository = CurrencyRepository()
finance_repository = FinanceRepository()
finance_register_repository = FinanceRegisterRepository()


def generate_ui_tab_collection(user):
	"""
	Generate ui tabs collection
	:param user: current user
	:return: ServiceResult instance
	"""
	result = ServiceResult()

	keys = ['heading', 'toState', 'show', 'active']
	default_tab_values = [
		['general_title', 'sett.general', False, False],
		['set_cash_title', 'sett.setCash', False, False]
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


def get_available_currencies():
	"""
	Returns available currencies
	:return: ServiceResult
	"""
	result = ServiceResult()

	currencies = currency_repository.get_all()

	result.data = {
		'currencies': [{'code': currency.code, 'hex': currency.hex, 'dec': currency.dec, 'label': currency.label} for currency in currencies]
	}
	return result


def set_finances(cards, cashes, user_pk):
	"""
	Set finances
	:param cards: list of cards
	:param cashes: list of cashes
	:param user_pk: current user primary key
	:return: ServiceResult
	"""
	result = ServiceResult()

	card_count = 0
	cash_count = 0

	for index, card in enumerate(cards):
		if card.get('balance'):
			finance_item = finance_repository.create(
				name=card.get('name', 'card_{number}'.format(number=index)),
				currency_id=currency_repository.get_by_code(card.get('currency', {}).get('code', 'byr')).pk,
				user_id=user_pk,
				type_id=1,
			)
			finance_register = finance_register_repository.create(data=datetime.datetime.now(), balance=Decimal(card.get('balance')), finance_id=finance_item.guid)
			card_count = index

	for index, cash in enumerate(cashes):
		if cash.get('balance'):
			finance_item = finance_repository.create(
				name=None,
				currency_id=currency_repository.get_by_code(cash.get('currency', {}).get('code', 'byr')).pk,
				user_id=user_pk,
				type_id=2,
			)
			finance_register = finance_register_repository.create(data=datetime.datetime.now(), balance=Decimal(cash.get('balance')), finance_id=finance_item.guid)
			cash_count = index

	if cash_count == 0 and card_count == 0:
		result.is_succeed = False
		result.data = {'error': 'No cashes were created'}
		return result

	return result