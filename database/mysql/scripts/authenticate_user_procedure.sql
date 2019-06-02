USE db_exam;

DELIMITER //

CREATE PROCEDURE authenticate_user (
	IN v_email VARCHAR(255),
    IN v_password VARCHAR(255)
)
BEGIN
	SELECT * 
    FROM user
    WHERE email = v_email AND password = hash_password(v_password);
END; //

DELIMITER ;
