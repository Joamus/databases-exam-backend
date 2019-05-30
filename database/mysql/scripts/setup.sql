USE db_exam;

DELIMITER //

CREATE TRIGGER user_before_insert
BEFORE INSERT
ON user FOR EACH ROW

BEGIN

SET NEW.password = hash_password(NEW.password);

END; //

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

if (v_password <> NEW.password) THEN
	SET NEW.password = hash_password(NEW.password);
END IF;

END; //



USE db_exam;

DELIMITER // 

CREATE PROCEDURE reset_password
(
	IN user_id INT
)
BEGIN
DECLARE v_first_name varchar(255);
DECLARE v_last_name varchar(255);

SELECT LOWER(SUBSTRING(first_name FROM 1 FOR 2)), LOWER(SUBSTRING(last_name FROM 1 FOR 2))
INTO v_first_name, v_last_name
FROM user
WHERE id = user_id;
    
UPDATE user
SET password = CONCAT(v_first_name, v_last_name)
WHERE id = user_id;
    
END; //

DELIMITER ;

USE db_exam;

DELIMITER //


CREATE TRIGGER purchase_before_insert
BEFORE INSERT
ON purchase FOR EACH ROW

BEGIN

IF (NEW.user_id IS null) THEN
	SIGNAL SQLSTATE '22000' SET message_text = 'user_id cannot be null';
END IF;

END; //

USE db_exam;

DELIMITER // 

CREATE FUNCTION hash_password(v_new_password varchar(255))
RETURNS VARCHAR(64)
READS SQL DATA
DETERMINISTIC
BEGIN
RETURN SHA2(v_new_password, 256);
END; //

DELIMITER;
