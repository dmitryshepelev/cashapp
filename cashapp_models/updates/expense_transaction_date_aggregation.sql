CREATE VIEW transactions AS
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
	et.status_id = '59E5B178786A75546068E04097C8E13254g675e4' AND et.payment_object_id = 'e436a02f63991541f74acc13816db9d780f85043';

CREATE VIEW item_cost AS
SELECT
	transaction.guid, eir.date, eir.expense_item_id, eir.value
FROM
	"cashapp_models_expenseitemregister" as eir
	INNER JOIN transaction
	ON
		transaction.date = eir.date;

CREATE VIEW aggregated AS
SELECT
	DISTINCT ic.date as dt, t.count * ic.value as Sum
FROM
	transactions as t, item_cost as ic
WHERE
	t.date = ic.date AND
	t.expense_item_id = ic.expense_item_id AND
	t.guid = ic.guid;

SELECT
	date(a.dt) AS date, sum(a.Sum) as value
FROM aggregated as a
GROUP BY date;