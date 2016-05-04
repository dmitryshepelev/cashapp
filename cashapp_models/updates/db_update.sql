CREATE TABLE "cashapp_models_category" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(30) NOT NULL UNIQUE, "parent_id" integer NULL CHECK ("parent_id" >= 0));
CREATE TABLE "cashapp_models_categorylevel" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(3) NOT NULL UNIQUE);
CREATE TABLE "cashapp_models_currency" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "code" varchar(3) NOT NULL UNIQUE, "hex" varchar(10) NOT NULL, "dec" varchar(20) NOT NULL, "label" varchar(30) NULL);
CREATE TABLE "cashapp_models_expenseitem" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(100) NOT NULL UNIQUE, "description" varchar(1000) NULL, "category_id" varchar(40) NOT NULL);
CREATE TABLE "cashapp_models_expenseitemregister" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "date" timestamp with time zone NOT NULL, "value" numeric(17, 2) NOT NULL, "expense_item_id" varchar(40) NOT NULL)
;
CREATE TABLE "cashapp_models_expensetransaction" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "date" timestamp with time zone NOT NULL, "description" varchar(1000) NULL);
CREATE TABLE "cashapp_models_expensetransactionitem" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "count" double precision NOT NULL, "expense_item_id" varchar(40) NOT NULL, "transaction_id" varchar(40) NOT NUL
L);
CREATE TABLE "cashapp_models_incometransaction" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "date" timestamp with time zone NOT NULL, "description" varchar(1000) NULL, "value" numeric(17, 2) NOT NULL);
CREATE TABLE "cashapp_models_measure" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "code" varchar(3) NOT NULL UNIQUE, "allow_floats" boolean NOT NULL);
CREATE TABLE "cashapp_models_paymentobject" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(30) NOT NULL, "allow_negative" boolean NOT NULL, "currency_id" varchar(40) NOT NULL);
CREATE TABLE "cashapp_models_poregister" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "date" timestamp with time zone NOT NULL, "value" numeric(17, 2) NOT NULL, "payment_object_id" varchar(40) NOT NULL);
CREATE TABLE "cashapp_models_potype" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(10) NOT NULL UNIQUE);
CREATE TABLE "cashapp_models_supplier" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(50) NOT NULL UNIQUE, "description" varchar(1000) NULL);
CREATE TABLE "cashapp_models_transactionstatus" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "name" varchar(20) NOT NULL UNIQUE);
CREATE TABLE "cashapp_models_transfertransaction" ("id" serial NOT NULL PRIMARY KEY, "guid" varchar(40) NOT NULL UNIQUE, "exist" boolean NOT NULL, "date" timestamp with time zone NOT NULL, "description" varchar(1000) NULL, "value" numeric(17, 2) NOT NULL, "targ
et_payment_object_id" integer NOT NULL CHECK ("target_payment_object_id" >= 0), "payment_object_id" varchar(40) NOT NULL, "status_id" varchar(40) NOT NULL, "user_id" integer NOT NULL);
ALTER TABLE "cashapp_models_paymentobject" ADD COLUMN "type_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_paymentobject" ALTER COLUMN "type_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_paymentobject" ADD COLUMN "user_id" integer NOT NULL;
ALTER TABLE "cashapp_models_paymentobject" ALTER COLUMN "user_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_incometransaction" ADD COLUMN "payment_object_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_incometransaction" ALTER COLUMN "payment_object_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_incometransaction" ADD COLUMN "status_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_incometransaction" ALTER COLUMN "status_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_incometransaction" ADD COLUMN "user_id" integer NOT NULL;
ALTER TABLE "cashapp_models_incometransaction" ALTER COLUMN "user_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "payment_object_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "payment_object_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "status_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "status_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "supplier_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "supplier_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "user_id" integer NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "user_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitem" ADD COLUMN "measure_id" varchar(40) NULL;
ALTER TABLE "cashapp_models_expenseitem" ALTER COLUMN "measure_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitem" ADD COLUMN "suppler_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_expenseitem" ALTER COLUMN "suppler_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_category" ADD COLUMN "level_id" varchar(40) NOT NULL;
ALTER TABLE "cashapp_models_category" ALTER COLUMN "level_id" DROP DEFAULT;
ALTER TABLE "cashapp_models_paymentobject" ADD COLUMN "primary" boolean DEFAULT false NOT NULL;
ALTER TABLE "cashapp_models_paymentobject" ALTER COLUMN "primary" DROP DEFAULT;
CREATE INDEX "cashapp_models_category_guid_41e6fb2d_like" ON "cashapp_models_category" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_category_name_bacf597_like" ON "cashapp_models_category" ("name" varchar_pattern_ops);
CREATE INDEX "cashapp_models_categorylevel_guid_3a58376e_like" ON "cashapp_models_categorylevel" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_categorylevel_name_6eb04408_like" ON "cashapp_models_categorylevel" ("name" varchar_pattern_ops);
CREATE INDEX "cashapp_models_currency_guid_6deee84a_like" ON "cashapp_models_currency" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_currency_code_5e48de32_like" ON "cashapp_models_currency" ("code" varchar_pattern_ops);
ALTER TABLE "cashapp_models_expenseitem" ADD CONSTRAINT "cashapp_mod_category_id_59f235b_fk_cashapp_models_category_guid" FOREIGN KEY ("category_id") REFERENCES "cashapp_models_category" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expenseitem_b583a629" ON "cashapp_models_expenseitem" ("category_id");
CREATE INDEX "cashapp_models_expenseitem_guid_e3ba1fb_like" ON "cashapp_models_expenseitem" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expenseitem_name_3aebd041_like" ON "cashapp_models_expenseitem" ("name" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expenseitem_category_id_59f235b_like" ON "cashapp_models_expenseitem" ("category_id" varchar_pattern_ops);
ALTER TABLE "cashapp_models_expenseitemregister" ADD CONSTRAINT "cash_expense_item_id_ae9117e_fk_cashapp_models_expenseitem_guid" FOREIGN KEY ("expense_item_id") REFERENCES "cashapp_models_expenseitem" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expenseitemregister_f95ffd24" ON "cashapp_models_expenseitemregister" ("expense_item_id");
CREATE INDEX "cashapp_models_expenseitemregister_guid_3bf54b58_like" ON "cashapp_models_expenseitemregister" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expenseitemregister_expense_item_id_ae9117e_like" ON "cashapp_models_expenseitemregister" ("expense_item_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expensetransaction_guid_587ec97d_like" ON "cashapp_models_expensetransaction" ("guid" varchar_pattern_ops);
ALTER TABLE "cashapp_models_expensetransactionitem" ADD CONSTRAINT "cas_expense_item_id_1d1130ba_fk_cashapp_models_expenseitem_guid" FOREIGN KEY ("expense_item_id") REFERENCES "cashapp_models_expenseitem" ("guid") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "cashapp_models_expensetransactionitem" ADD CONSTRAINT "D8e2fb3879d31d822360170a1e64b328" FOREIGN KEY ("transaction_id") REFERENCES "cashapp_models_expensetransaction" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expensetransactionitem_f95ffd24" ON "cashapp_models_expensetransactionitem" ("expense_item_id");
CREATE INDEX "cashapp_models_expensetransactionitem_f847de52" ON "cashapp_models_expensetransactionitem" ("transaction_id");
CREATE INDEX "cashapp_models_expensetransactionitem_guid_4dcba0fc_like" ON "cashapp_models_expensetransactionitem" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expensetransaction_expense_item_id_1d1130ba_like" ON "cashapp_models_expensetransactionitem" ("expense_item_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_expensetransactioni_transaction_id_4be9fd4b_like" ON "cashapp_models_expensetransactionitem" ("transaction_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_incometransaction_guid_3935d961_like" ON "cashapp_models_incometransaction" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_measure_guid_5ca9f0c6_like" ON "cashapp_models_measure" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_measure_code_2556be7e_like" ON "cashapp_models_measure" ("code" varchar_pattern_ops);
ALTER TABLE "cashapp_models_paymentobject" ADD CONSTRAINT "cashapp_mo_currency_id_77ad94b2_fk_cashapp_models_currency_guid" FOREIGN KEY ("currency_id") REFERENCES "cashapp_models_currency" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_paymentobject_2c7d5721" ON "cashapp_models_paymentobject" ("currency_id");
CREATE INDEX "cashapp_models_paymentobject_guid_15e2abd_like" ON "cashapp_models_paymentobject" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_paymentobject_currency_id_77ad94b2_like" ON "cashapp_models_paymentobject" ("currency_id" varchar_pattern_ops);
ALTER TABLE "cashapp_models_poregister" ADD CONSTRAINT "D77b96e924f4543aa3375f3bbc2aadb8" FOREIGN KEY ("payment_object_id") REFERENCES "cashapp_models_paymentobject" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_poregister_7c1e1a4b" ON "cashapp_models_poregister" ("payment_object_id");
CREATE INDEX "cashapp_models_poregister_guid_1d5b84ed_like" ON "cashapp_models_poregister" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_poregister_payment_object_id_5be64a05_like" ON "cashapp_models_poregister" ("payment_object_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_potype_guid_27c88b02_like" ON "cashapp_models_potype" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_potype_name_33675988_like" ON "cashapp_models_potype" ("name" varchar_pattern_ops);
CREATE INDEX "cashapp_models_supplier_guid_50be3ebb_like" ON "cashapp_models_supplier" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_supplier_name_1c57081_like" ON "cashapp_models_supplier" ("name" varchar_pattern_ops);
CREATE INDEX "cashapp_models_transactionstatus_guid_57b7f5e2_like" ON "cashapp_models_transactionstatus" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_transactionstatus_name_1622ba6c_like" ON "cashapp_models_transactionstatus" ("name" varchar_pattern_ops);
ALTER TABLE "cashapp_models_transfertransaction" ADD CONSTRAINT "payment_object_id_34245ff_fk_cashapp_models_paymentobject_guid" FOREIGN KEY ("payment_object_id") REFERENCES "cashapp_models_paymentobject" ("guid") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "cashapp_models_transfertransaction" ADD CONSTRAINT "cas_status_id_69cd1f7b_fk_cashapp_models_transactionstatus_guid" FOREIGN KEY ("status_id") REFERENCES "cashapp_models_transactionstatus" ("guid") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "cashapp_models_transfertransaction" ADD CONSTRAINT "cashapp_models_transfertransact_user_id_406cac8_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_transfertransaction_7c1e1a4b" ON "cashapp_models_transfertransaction" ("payment_object_id");
CREATE INDEX "cashapp_models_transfertransaction_dc91ed4b" ON "cashapp_models_transfertransaction" ("status_id");
CREATE INDEX "cashapp_models_transfertransaction_e8701ad4" ON "cashapp_models_transfertransaction" ("user_id");
CREATE INDEX "cashapp_models_transfertransaction_guid_2c3ac6af_like" ON "cashapp_models_transfertransaction" ("guid" varchar_pattern_ops);
CREATE INDEX "cashapp_models_transfertransacti_payment_object_id_34245ff_like" ON "cashapp_models_transfertransaction" ("payment_object_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_transfertransaction_status_id_69cd1f7b_like" ON "cashapp_models_transfertransaction" ("status_id" varchar_pattern_ops);
CREATE INDEX "cashapp_models_paymentobject_94757cae" ON "cashapp_models_paymentobject" ("type_id");
ALTER TABLE "cashapp_models_paymentobject" ADD CONSTRAINT "cashapp_models_p_type_id_542e1d9f_fk_cashapp_models_potype_guid" FOREIGN KEY ("type_id") REFERENCES "cashapp_models_potype" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_paymentobject_e8701ad4" ON "cashapp_models_paymentobject" ("user_id");
ALTER TABLE "cashapp_models_paymentobject" ADD CONSTRAINT "cashapp_models_paymentobject_user_id_40d7892a_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_incometransaction_7c1e1a4b" ON "cashapp_models_incometransaction" ("payment_object_id");
ALTER TABLE "cashapp_models_incometransaction" ADD CONSTRAINT "payment_object_id_3b5340f_fk_cashapp_models_paymentobject_guid" FOREIGN KEY ("payment_object_id") REFERENCES "cashapp_models_paymentobject" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_incometransaction_dc91ed4b" ON "cashapp_models_incometransaction" ("status_id");
ALTER TABLE "cashapp_models_incometransaction" ADD CONSTRAINT "cas_status_id_71698403_fk_cashapp_models_transactionstatus_guid" FOREIGN KEY ("status_id") REFERENCES "cashapp_models_transactionstatus" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_incometransaction_e8701ad4" ON "cashapp_models_incometransaction" ("user_id");
ALTER TABLE "cashapp_models_incometransaction" ADD CONSTRAINT "cashapp_models_incometransacti_user_id_7dc4597a_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expensetransaction_7c1e1a4b" ON "cashapp_models_expensetransaction" ("payment_object_id");
ALTER TABLE "cashapp_models_expensetransaction" ADD CONSTRAINT "D4dd82920c208e20435a1c44336504bf" FOREIGN KEY ("payment_object_id") REFERENCES "cashapp_models_paymentobject" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expensetransaction_dc91ed4b" ON "cashapp_models_expensetransaction" ("status_id");
ALTER TABLE "cashapp_models_expensetransaction" ADD CONSTRAINT "cas_status_id_606a8267_fk_cashapp_models_transactionstatus_guid" FOREIGN KEY ("status_id") REFERENCES "cashapp_models_transactionstatus" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expensetransaction_c5bcd634" ON "cashapp_models_expensetransaction" ("supplier_id");
ALTER TABLE "cashapp_models_expensetransaction" ADD CONSTRAINT "cashapp_mo_supplier_id_22ff533b_fk_cashapp_models_supplier_guid" FOREIGN KEY ("supplier_id") REFERENCES "cashapp_models_supplier" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expensetransaction_e8701ad4" ON "cashapp_models_expensetransaction" ("user_id");
ALTER TABLE "cashapp_models_expensetransaction" ADD CONSTRAINT "cashapp_models_expensetransact_user_id_6d94d89c_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expenseitem_80c371ce" ON "cashapp_models_expenseitem" ("measure_id");
ALTER TABLE "cashapp_models_expenseitem" ADD CONSTRAINT "cashapp_mode_measure_id_36fbe3f0_fk_cashapp_models_measure_guid" FOREIGN KEY ("measure_id") REFERENCES "cashapp_models_measure" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_expenseitem_fea8e5e5" ON "cashapp_models_expenseitem" ("suppler_id");
ALTER TABLE "cashapp_models_expenseitem" ADD CONSTRAINT "cashapp_mod_suppler_id_11b2eedf_fk_cashapp_models_supplier_guid" FOREIGN KEY ("suppler_id") REFERENCES "cashapp_models_supplier" ("guid") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "cashapp_models_category_80e0bd5f" ON "cashapp_models_category" ("level_id");
ALTER TABLE "cashapp_models_category" ADD CONSTRAINT "cashapp__level_id_34c07200_fk_cashapp_models_categorylevel_guid" FOREIGN KEY ("level_id") REFERENCES "cashapp_models_categorylevel" ("guid") DEFERRABLE INITIALLY DEFERRED;


ALTER TABLE "cashapp_models_category" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.134000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_category" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_category" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.164000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_category" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_categorylevel" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.208000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_categorylevel" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_categorylevel" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.237000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_categorylevel" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_currency" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.267000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_currency" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_currency" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.299000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_currency" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitem" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.330000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expenseitem" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitem" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.363000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expenseitem" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitemregister" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.393000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expenseitemregister" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expenseitemregister" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.425000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expenseitemregister" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.457000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransaction" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.489000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expensetransaction" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransactionitem" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.521000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expensetransactionitem" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_expensetransactionitem" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.554000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_expensetransactionitem" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_incometransaction" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.586000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_incometransaction" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_incometransaction" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.618000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_incometransaction" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_measure" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.651000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_measure" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_measure" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.683000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_measure" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_paymentobject" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.716000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_paymentobject" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_paymentobject" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.748000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_paymentobject" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_poregister" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.780000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_poregister" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_poregister" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.813000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_poregister" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_potype" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.845000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_potype" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_potype" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.878000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_potype" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_supplier" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.909000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_supplier" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_supplier" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.942000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_supplier" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_transactionstatus" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:15.976000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_transactionstatus" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_transactionstatus" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:16.009000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_transactionstatus" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_transfertransaction" ADD COLUMN "creation_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:16.045000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_transfertransaction" ALTER COLUMN "creation_datetime" DROP DEFAULT;
ALTER TABLE "cashapp_models_transfertransaction" ADD COLUMN "last_edited_datetime" timestamp with time zone DEFAULT '2016-05-04T10:35:16.079000+00:00'::timestamptz NOT NULL;
ALTER TABLE "cashapp_models_transfertransaction" ALTER COLUMN "last_edited_datetime" DROP DEFAULT;
