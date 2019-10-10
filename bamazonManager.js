var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "russellwam",
    database: "bamazon"
});

// connection.connect(function (err) {
//     if (err) throw err;
//     Display();
// });

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    displayAll();
                    break;

                case "View Low Inventory":
                    displayLow();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}



function displayAll() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + res[i].price + "|| Stock: " + res[i].stock_quantity);
        }

    })
    connection.end();
}

function displayLow() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + res[i].price + "|| Stock: " + res[i].stock_quantity);
        }

    })
}

function addInventory() {
    inquirer.prompt({
        name: "id",
        message: "Whats the id of the item you'd like to add to?",
        type: "input",

    }).then(function (answer1) {

        inquirer.prompt({

            name: "quantity",
            message: "how many do you want to add?",
            type: "input"
        }).then(function (answer2) {

            connection.query(`SELECT * FROM products WHERE item_id = ${answer1.id};`, function (err, res) {

                if (err) throw err;
                var newstock = res[0].stock_quantity + parseInt(answer2.quantity);
                var sql = `UPDATE products SET stock_quantity =${newstock} WHERE item_id = ${answer1.id}`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;

                });
                console.log("your new stock for this item is: " + newstock)
            })




        })

    })
}

function addProduct() {
    inquirer.prompt({
        name: "name",
        message: "Whats the name of the item you'd like to add?",
        type: "input",

    }).then(function (answer1) {

        inquirer.prompt({

            name: "department",
            message: "whats the department?",
            type: "input"
        }).then(function (answer2) {

            inquirer.prompt({
                name: "price",
                message: "Whats the price of the item you'd like to add?",
                type: "input",

            }).then(function (answer3) {

                inquirer.prompt({

                    name: "quantity",
                    message: "how many do you want to add?",
                    type: "input"
                }).then(function (answer4) {
                    connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) 
                    VALUES ( "${answer1.name}", "${answer2.department}", ${answer3.price}, ${answer4.quantity});`
                        , function (err, res) {

                            if (err) throw err;


                            console.log("item added!")




                        })
                })
            })
        })
    })
}


runSearch()