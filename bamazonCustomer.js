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


function Display() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + res[i].price);
        }

    })
}


function productSearch() {
    inquirer.prompt({
        name: "id",
        message: "Whats the id of the item you'd like to buy?",
        type: "input",

    }).then(function (answer1) {

        inquirer.prompt({

            name: "quantity",
            message: "how many do you want?",
            type: "input"
        }).then(function (answer2) {
            connection.query(`SELECT * FROM products WHERE item_id = ${answer1.id};`, function (err, res) {
                if (err) throw err;

                if ((res[0].stock_quantity) < answer2.quantity) {
                    console.log("not enough in stock")
                } else {
                    var newstock = res[0].stock_quantity-answer2.quantity;
                    var sql = `UPDATE products SET stock_quantity =${newstock} WHERE item_id = ${answer1.id}`;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                    
                    });
                    console.log("your total is: " + res[0].price*answer2.quantity)
                }

            })




        })

    })
}

// Display();
productSearch();
