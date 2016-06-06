CREATE OR REPLACE FUNCTION date_range(start_date DATE, end_date DATE)
	RETURNS TABLE(date DATE) AS
	$body$
	SELECT
		$1 + s.a AS dates
	FROM
		generate_series(0, $2 - $1) AS s(a)
	$body$
	LANGUAGE sql;


CREATE OR REPLACE FUNCTION get_expense_transactions_with_expense_items(payment_object_id VARCHAR(40), status_id VARCHAR(40))
	RETURNS TABLE (guid VARCHAR(40), date TIMESTAMPTZ, count FLOAT, expense_item_id VARCHAR(40)) AS
	$body$
		SELECT
			et.guid, et.date, eti.count AS count, eti.expense_item_id AS expense_item_id
		FROM
			"cashapp_models_expensetransaction" AS et
			INNER JOIN (
				SELECT
					eti.count, eti.transaction_id, eti.expense_item_id
				FROM
					"cashapp_models_expensetransactionitem" as eti
			) eti
			ON
				eti.transaction_id = et.guid
		WHERE
			et.status_id = $2 AND et.payment_object_id = $1
	$body$
	language sql;


CREATE OR REPLACE FUNCTION get_expense_transactions_aggregated_by_days(payment_object_id VARCHAR(40), status_id VARCHAR(40))
	RETURNS TABLE (date DATE, value FLOAT) AS
	$body$
		SELECT
			date(a.dt) AS date, sum(a.Sum) as value
		FROM
			(
				SELECT
					DISTINCT ic.date as dt, t.count * ic.value as Sum
				FROM
					get_expense_transactions_with_expense_items($1, $2) as t,
					(
						SELECT
							trs.guid, eir.date, eir.expense_item_id, eir.value
						FROM
							"cashapp_models_expenseitemregister" as eir
							INNER JOIN
								get_expense_transactions_with_expense_items($1, $2) AS trs
							ON
								trs.date = eir.date
					) as ic
				WHERE
					t.date = ic.date AND
					t.expense_item_id = ic.expense_item_id AND
					t.guid = ic.guid
			) as a
		GROUP BY date
		ORDER BY date DESC
	$body$
	LANGUAGE sql;


CREATE OR REPLACE FUNCTION get_aggregated_poregisers(payment_object_id VARCHAR(40), start_date DATE, end_date DATE)
	RETURNS TABLE (date DATE, value DECIMAL) AS
	$body$
		SELECT
			date(por.date) as date, por.value
		FROM
			cashapp_models_poregister as por
			INNER JOIN
			(
				SELECT
					date(date) as dt, max(date) as max_dt
				FROM
					cashapp_models_poregister
				WHERE
					payment_object_id = $1
					AND date >= DATE($2)
					AND date <= DATE($3)
				GROUP BY
					dt
			) AS t2
			ON
				por.date = t2.max_dt
		ORDER BY
			date DESC;
	$body$
	LANGUAGE sql;


CREATE OR REPLACE FUNCTION increase_poregister_values(payment_object_id VARCHAR(40), value DECIMAL, start_date DATE, end_date DATE)
	RETURNS VOID AS
	$body$
		UPDATE cashapp_models_poregister SET value = value + $2, last_edited_datetime = NOW()
		WHERE payment_object_id = $1 AND date BETWEEN $3 AND $4;
	$body$
	LANGUAGE sql;


CREATE OR REPLACE FUNCTION decrease_poregister_values(payment_object_id VARCHAR(40), value FLOAT, start_date DATE, end_date DATE)
	RETURNS VOID AS
	$body$
		UPDATE cashapp_models_poregister SET value = value - $2, last_edited_datetime = NOW()
		WHERE payment_object_id = $1 AND date BETWEEN $3 AND $4;
	$body$
	LANGUAGE sql;