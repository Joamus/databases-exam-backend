user_before_insert

DELIMITER //


CREATE TRIGGER purchase_before_insert
BEFORE INSERT
ON purchase FOR EACH ROW

BEGIN

IF (NEW.user_id IS null) THEN
	SIGNAL SQLSTATE '22000' SET message_text = 'user_id cannot be null';
END IF;

END; //

