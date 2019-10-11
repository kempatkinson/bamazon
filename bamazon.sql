DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id),
  product_sales INT(10) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES 
( "hammer", "tools", 20, 20, 0),
("wrench", "tools", 10, 15, 0),
( "tv", "entertainment", 100, 25, 0),
("ps4", "entertainment", 250, 18, 0),
("xbox", "entertainment", 250, 30, 0),
( "pot", "cooking", 25, 20, 0),
("pan", "cooking", 20, 30, 0),
("spatula", "cooking", 25, 3, 0),
("serving utensils", "cooking", 30, 100, 0),
("whisk", "cooking", 3, 40, 0);

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,4) NULL,
    PRIMARY KEY (department_id)
    );
    
INSERT INTO departments (department_name, over_head_costs)
VALUES
	("tools", 1000),
    ("entertainment", 10000),
    ("cooking", 5000);

SELECT * FROM products;

SELECT * FROM products WHERE department_name='entertainment';