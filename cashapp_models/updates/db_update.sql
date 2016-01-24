CREATE TABLE "cashapp_models_currency" (
  "id" serial NOT NULL PRIMARY KEY,
  "code" varchar(3) NOT NULL,
  "hex" varchar(10) NOT NULL,
  "dec" varchar(20) NOT NULL,
  "label" varchar(30) NULL);
CREATE INDEX "cashapp_models_currency_c1336794" ON "cashapp_models_currency" ("code");
CREATE INDEX "cashapp_models_currency_code_7445a88a1b721ce_like" ON "cashapp_models_currency" ("code" varchar_pattern_ops);

INSERT INTO
  "cashapp_models_currency" (code, hex, dec, label)
VALUES
  ('USD', '\0024', '36', 'usd'), ('EUR', '\20AC', '8364', 'euro'), ('RUB', '\20BD', '8381', 'rub'), ('BYR', '\70.', '112,46', 'byr')