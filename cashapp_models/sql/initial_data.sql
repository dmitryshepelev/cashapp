INSERT INTO
    "cashapp_models_currency" (code, hex, dec, label, exist, guid, creation_datetime, last_edited_datetime)
VALUES
    ('USD', '\0024', '36', 'usd', 'TRUE', 'witj599704vnd69kjfjtundf9433308542-49585', CURRENT_DATE, current_date),
	('EUR', '\20AC', '8364', 'euro', 'TRUE', '86e4c0f40bce47d1a6bccada73583eb05jd03f94', CURRENT_DATE, current_date),
	('RUB', '\20BD', '8381', 'rub', 'TRUE', '455sdfh7re8kl7bsfd5450454sdfg7434541werd', CURRENT_DATE, current_date),
	('BYR', '\70.', '112,46', 'byr', 'TRUE', 'be03575b5441816144g4ds5fs4g1s451g541wer5', CURRENT_DATE, current_date);


INSERT INTO
	"cashapp_models_potype" (name, guid, exist, creation_datetime, last_edited_datetime)
VALUES
	('cash', '1ce29e09413440479387ef9262ac337f59fjrus5', 'TRUE', CURRENT_DATE, current_date),
    ('card', '3a1f06fa5f8d4e408652f4071a71622730v68dwh', 'TRUE', CURRENT_DATE, current_date);


INSERT INTO
	"cashapp_models_categorylevel" (guid, exist, name, creation_datetime, last_edited_datetime)
VALUES
	('6e522ab019e74c3ead820c0ded579d9349357246', 'TRUE', 'L0', CURRENT_DATE, current_date);


INSERT INTO
	"cashapp_models_measure" (guid, exist, code, allow_floats, creation_datetime, last_edited_datetime)
VALUES
	('06d3e6db1c644b218294d4b74f952e484f25g675', 'TRUE', 'th', 'FALSE', CURRENT_DATE, current_date),
	('65cf679476c5e437c8c70ed4ca3b04bc0645284g', 'TRUE', 'kg', 'TRUE', CURRENT_DATE, current_date);


INSERT INTO
	"cashapp_models_paymentobject" (guid, exist, name, allow_negative, currency_id, user_id, type_id, "primary", creation_datetime, last_edited_datetime)
VALUES
	('e436a02f63991541f74acc13816db9d780f85043', 'TRUE', 'Visa', 'FALSE', 'be03575b5441816144g4ds5fs4g1s451g541wer5', 2, '3a1f06fa5f8d4e408652f4071a71622730v68dwh', 'TRUE', CURRENT_DATE, current_date),
	('32b1a544766c654183098ee06186d019b5916357', 'TRUE', 'Наличные 1', 'FALSE', '455sdfh7re8kl7bsfd5450454sdfg7434541werd', 2, '1ce29e09413440479387ef9262ac337f59fjrus5', 'FALSE', CURRENT_DATE, current_date);


INSERT INTO
	"cashapp_models_transactionstatus" (guid, exist, name, creation_datetime, last_edited_datetime)
VALUES
	('59E5B178786A75546068E04097C8E13254g675e4', 'True', 'success', CURRENT_DATE, current_date);