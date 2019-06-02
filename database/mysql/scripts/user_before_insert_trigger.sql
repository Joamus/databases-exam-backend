USE db_exam;

DELIMITER //

CREATE TRIGGER user_before_insert
	BEFORE INSERT
	ON user FOR EACH ROW
BEGIN
	SET NEW.password = hash_password(NEW.password);
END; //
