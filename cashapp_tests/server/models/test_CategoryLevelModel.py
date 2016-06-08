from unittest import TestCase

from cashapp import settings
from cashapp_models.exceptions.BoundCategoryLevelException import BoundCategoryLevelException
from cashapp_models.models.CategoryLevelModel import CategoryLevel
from cashapp_tests.server import Dummies


class TestCategoryLevel(TestCase):
	def setUp(self):
		self.category_level = Dummies.get_or_create_root_category_level()

	def test_serialized_instance_has_right_fields(self):
		serialized = self.	category_level.serialize()

		self.assertIn('name', serialized)
		self.assertNotIn('pk', serialized)

	def test_should_be_next_category_level(self):
		next_category_level = self.category_level.next_level()

		self.assertEquals(next_category_level.name, 'L1')

	def test_should_be_a_root_level(self):
		root_category = CategoryLevel.objects.get_root_level()

		self.assertEquals(root_category.name, self.category_level.name)
		self.assertEquals(root_category.guid, self.category_level.guid)

	def test_should_be_a_new_category_level_created(self):
		CategoryLevel.objects.all().delete()
		self.category_level = Dummies.get_or_create_root_category_level()

		levels_count = len(CategoryLevel.objects.all())

		category_level = CategoryLevel.objects.create_level()

		self.assertEqual(len(CategoryLevel.objects.all()), levels_count + 1)

	def test_should_be_a_BoundCategoryLevelException_during_creation(self):
		levels_count = len(CategoryLevel.objects.all())

		for i in range(levels_count, settings.MAX_CATEGORY_NESTING):
			CategoryLevel.objects.create_level()

		self.assertRaises(BoundCategoryLevelException, CategoryLevel.objects.create_level)
