CREATE TABLE "cashapp_models_currency" (
  "id" serial NOT NULL PRIMARY KEY,
  "code" varchar(3) NOT NULL,
  "hex" varchar(10) NOT NULL,
  "dec" varchar(20) NOT NULL,
  "label" varchar(30) NULL
);
CREATE INDEX "cashapp_models_currency_c1336794" ON "cashapp_models_currency" ("code");
CREATE INDEX "cashapp_models_currency_code_7445a88a1b721ce_like" ON "cashapp_models_currency" ("code" varchar_pattern_ops);

INSERT INTO
  "cashapp_models_currency" (code, hex, dec, label)
VALUES
  ('USD', '\0024', '36', 'usd'), ('EUR', '\20AC', '8364', 'euro'), ('RUB', '\20BD', '8381', 'rub'), ('BYR', '\70.', '112,46', 'byr')


CREATE TABLE "cashapp_models_finance" (
	"id" serial NOT NULL PRIMARY KEY,
	"guid" varchar(40) NOT NULL UNIQUE,
	"is_exist" boolean NOT NULL,
	"name" varchar(30) NULL,
	"is_locked" boolean NOT NULL,
	"currency_id" integer NOT NULL
);

CREATE TABLE "cashapp_models_financeregister" (
	"id" serial NOT NULL PRIMARY KEY,
	"guid" varchar(40) NOT NULL UNIQUE,
	"is_exist" boolean NOT NULL,
	"data" timestamp with time zone NOT NULL,
	"balance" numeric(17, 2) NOT NULL,
	"finance_id" varchar(40) NOT NULL
);

CREATE TABLE "cashapp_models_financetype" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(10) NOT NULL
);

ALTER TABLE "cashapp_models_finance" ADD COLUMN "type_id" integer NOT NULL;
ALTER TABLE "cashapp_models_finance" ALTER COLUMN "type_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_finance" ADD COLUMN "user_id" integer NOT NULL;
ALTER TABLE "cashapp_models_finance" ALTER COLUMN "user_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_finance" ADD CONSTRAINT "cashapp_model_currency_id_e07f46f_fk_cashapp_models_currency_id" FOREIGN KEY ("currency_id") REFERENCES "cashapp_models_currency" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "cashapp_models_finance_2c7d5721" ON "cashapp_models_finance" ("currency_id");
CREATE INDEX "cashapp_models_finance_guid_43ff558c_like" ON "cashapp_models_finance" ("guid" varchar_pattern_ops);

ALTER TABLE "cashapp_models_financeregister" ADD CONSTRAINT "cashapp_mode_finance_id_6c588b6a_fk_cashapp_models_finance_guid" FOREIGN KEY ("finance_id") REFERENCES "cashapp_models_finance" ("guid") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "cashapp_models_financeregister_65ed131b" ON "cashapp_models_financeregister" ("finance_id");
CREATE INDEX "cashapp_models_financeregister_guid_794ac67d_like" ON "cashapp_models_financeregister" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_financeregister_finance_id_6c588b6a_like" ON "cashapp_models_financeregister" ("finance_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_finance_94757cae" ON "cashapp_models_finance" ("type_id");

ALTER TABLE "cashapp_models_finance" ADD CONSTRAINT "cashapp_model_type_id_68645f30_fk_cashapp_models_financetype_id" FOREIGN KEY ("type_id") REFERENCES "cashapp_models_financetype" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "cashapp_models_finance_e8701ad4" ON "cashapp_models_finance" ("user_id");

ALTER TABLE "cashapp_models_finance" ADD CONSTRAINT "cashapp_models_finance_user_id_36b0a5f3_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;

INSERT INTO "cashapp_models_financetype" (name) VALUES ('card'), ('cash')