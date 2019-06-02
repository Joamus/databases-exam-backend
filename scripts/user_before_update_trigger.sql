USE db_exam;

DELIMITER //

CREATE TRIGGER user_before_update
	BEFORE UPDATE
	ON user FOR EACH ROW

BEGIN
	DECLARE v_password varchar(64);

	SELECT password
	INTO v_password
	FROM user
	WHERE id = NEW.id;

	IF (v_password <> NEW.password) THEN
		SET NEW.password = hash_password(NEW.password);
	END IF;

END; //
