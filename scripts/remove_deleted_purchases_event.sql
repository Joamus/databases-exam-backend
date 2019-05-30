USE db_exam;

DELIMITER //

CREATE EVENT remove_deleted_purchases
ON SCHEDULE
EVERY 1 DAY
STARTS (CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 1 HOUR)
DO
BEGIN

DELETE FROM purchase
WHERE DATE(created_at) = CURRENT_DATE();

END; //

DELIMITER ;

drop event clear_out_purchases;