USE db_exam;

DELIMITER //

CREATE FUNCTION get_full_address(v_user_id INT)
RETURNS VARCHAR(255)
READS SQL DATA
DETERMINISTIC
BEGIN

DECLARE v_postal_code VARCHAR(4);
DECLARE v_city_name VARCHAR(255);
DECLARE v_address VARCHAR(255);

SELECT address, city_postal_code
INTO v_address, v_postal_code
FROM user
WHERE id = v_user_id;

SELECT name
INTO v_city_name
FROM city
WHERE postal_code = v_postal_code;

RETURN CONCAT(v_postal_code, " ", v_city_name, ", ", v_address);
END; //

DELIMITER ;
