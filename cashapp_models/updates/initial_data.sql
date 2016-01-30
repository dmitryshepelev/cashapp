INSERT INTO "cashapp_models_financetype" (name) VALUES ('card'), ('cash');

INSERT INTO
  "cashapp_models_currency" (code, hex, dec, label)
VALUES
  ('USD', '\0024', '36', 'usd'), ('EUR', '\20AC', '8364', 'euro'), ('RUB', '\20BD', '8381', 'rub'), ('BYR', '\70.', '112,46', 'byr')