USE db_exam;

DELIMITER $$

CREATE PROCEDURE create_user (
	IN v_email VARCHAR(255),
    IN v_password VARCHAR(255),
    IN v_address VARCHAR(255),
    IN v_role VARCHAR(10),
    IN v_first_name VARCHAR(255),
    IN v_last_name VARCHAR(255),
    IN v_city_postal VARCHAR(4),
    OUT v_message VARCHAR(100)
)
BEGIN
	INSERT INTO user (email, password, address, role, first_name, last_name, created_at, updated_at, city_postal_code, will_delete_at)
    VALUES (v_email, hash_password(v_password), v_address, v_role, v_first_name, v_last_name, NOW(), NOW(), v_city_postal, null);
    
	SET v_message = "The user was created successfully!";
    
END; $$

DELIMITER ;

