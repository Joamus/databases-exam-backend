USE db_exam;

DELIMITER //

CREATE FUNCTION purchase_count(v_user_id INT)
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN

DECLARE amount INT;
SELECT COUNT(*)
INTO amount
FROM purchase
WHERE user_id = v_user_id;
RETURN amount;
END; //

DELIMITER ;