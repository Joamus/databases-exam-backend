USE db_exam;

DELIMITER // 

CREATE FUNCTION hash_password(v_password varchar(255))
	RETURNS VARCHAR(64)
	DETERMINISTIC
BEGIN
	RETURN SHA2(v_password, 256);
END; //

DELIMITER ;
