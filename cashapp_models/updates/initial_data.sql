INSERT INTO
    "cashapp_models_currency" (code, hex, dec, label, exist, guid)
VALUES
    ('USD', '\0024', '36', 'usd', 'TRUE', 'witj599704vnd69kjfjtundf9433308542-49585'),
	('EUR', '\20AC', '8364', 'euro', 'TRUE', '86e4c0f40bce47d1a6bccada73583eb05jd03f94'),
	('RUB', '\20BD', '8381', 'rub', 'TRUE', '455sdfh7re8kl7bsfd5450454sdfg7434541werd'),
	('BYR', '\70.', '112,46', 'byr', 'TRUE', 'be03575b5441816144g4ds5fs4g1s451g541wer5');


INSERT INTO
	"cashapp_models_potype" (name, guid, exist)
VALUES
	('cash', '1ce29e09413440479387ef9262ac337f59fjrus5', 'TRUE'),
    ('card', '3a1f06fa5f8d4e408652f4071a71622730v68dwh', 'TRUE');


INSERT INTO
	"cashapp_models_categorylevel" (guid, exist, name)
VALUES
	('6e522ab019e74c3ead820c0ded579d9349357246', 'TRUE', 'L0');


INSERT INTO
	"cashapp_models_measure" (guid, exist, code, allow_floats)
VALUES
	('06d3e6db1c644b218294d4b74f952e484f25g675', 'TRUE', 'th', 'FALSE'),
	('65cf679476c5e437c8c70ed4ca3b04bc0645284g', 'TRUE', 'kg', 'TRUE');