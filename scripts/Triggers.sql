DELIMITER //


CREATE TRIGGER check_user_id
BEFORE INSERT
ON purchase FOR EACH ROW

BEGIN

IF (NEW.user_id = null) THEN
	SIGNAL SQLSTATE '22000' SET message_text = 'user_id cannot be null';
END IF;

END; //

INSERT INTO purchase (address, basket_id, created_at, updated_at, city_postal_code, user_id)
VALUES ("Grønjodskollegiet 2", "some_basket_id", SYSDATE(), SYSDATE(), 2300, 2);

INSERT INTO purchase (address, basket_id, created_at, updated_at, city_postal_code, user_id)
VALUES ("Grønjodskollegiet 2", "some_basket_id", SYSDATE(), SYSDATE(), 2300, null);

select * from purchase;


