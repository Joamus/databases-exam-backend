user_before_insert

DELIMITER //


CREATE TRIGGER check_user_id
BEFORE INSERT
ON purchase FOR EACH ROW

BEGIN

IF (NEW.user_id IS null) THEN
	SIGNAL SQLSTATE '22000' SET message_text = 'user_id cannot be null';
END IF;

END; //
