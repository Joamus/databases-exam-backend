DELIMITER // 

CREATE FUNCTION hash_password(v_new_password varchar(255))
RETURNS VARCHAR(64)
READS SQL DATA
DETERMINISTIC
BEGIN
RETURN SHA2(v_new_password, 256);
END; //

DELIMITER ;
