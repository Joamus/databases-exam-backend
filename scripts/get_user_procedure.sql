USE db_exam;

DELIMITER //

CREATE PROCEDURE get_user (
	v_user_id INT
)
BEGIN
	SELECT a.first_name, a.last_name, a.address, a.city_postal_code, b.name
    FROM user a LEFT JOIN city b 
    ON a.city_postal_code = b.postal_code
    WHERE a.id = v_user_id;
END; //

DELIMITER ;
