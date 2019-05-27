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
