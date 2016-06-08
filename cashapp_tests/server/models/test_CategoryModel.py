from unittest import TestCase

from cashapp_models.models.CategoryModel import Category
from cashapp_tests.server import Dummies


class TestCategoryModel(TestCase):
	def setUp(self):
		self.category = Dummies.get_or_create_root_category()

	def test_should_be_a_subscount_in_serialized_model(self):
		serialized = self.category.serialize()

		self.assertIn('subs_count', serialized)
		self.assertEqual(serialized['subs_count'], len(self.category.get_subs()))

	def test_should_be_a_parent_category_equals_None(self):
		self.assertIsNone(self.category.get_parent())

	def test_should_be_a_parent_category(self):
		sub_category = Category.objects.create_sub('test_sub', self.category)

		self.assertEqual(sub_category.get_parent().guid, self.category.guid)
