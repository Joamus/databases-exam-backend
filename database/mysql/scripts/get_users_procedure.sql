USE db_exam;

DELIMITER $$

CREATE PROCEDURE get_users ()
BEGIN
	SELECT a.first_name, a.last_name, a.address, a.city_postal_code, b.name
    FROM user a LEFT JOIN city b 
    ON a.city_postal_code = b.postal_code;
END; $$

DELIMITER ;

CALL get_users();