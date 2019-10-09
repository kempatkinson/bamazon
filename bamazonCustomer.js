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

Display();