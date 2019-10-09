DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
( "hammer", "tools", 20, 20),
("wrench", "tools", 10, 15),
( "tv", "entertainment", 100, 25),
("ps4", "entertainment", 250, 18),
("xbox", "entertainment", 250, 30),
( "pot", "cooking", 25, 20),
("pan", "cooking", 20, 30),
("spatula", "cooking", 25, 3),
("serving utensils", "cooking", 30, 100),
("whisk", "cooking", 3, 40);

SELECT * FROM products;0