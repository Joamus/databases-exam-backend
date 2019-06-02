USE db_exam;

DELIMITER // 

CREATE PROCEDURE reset_password
(
	IN user_id INT
)
BEGIN
	DECLARE v_password varchar(10);

	SELECT LOWER(CONCAT(SUBSTRING(first_name FROM 1 FOR 2), SUBSTRING(last_name FROM 1 FOR 2)))
	INTO v_password
	FROM user
	WHERE id = user_id;
		
	UPDATE user
	SET password = v_password
	WHERE id = user_id;
END; //

DELIMITER ;
