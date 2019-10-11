var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewSales();
                    break;

                case "Create New Department":
                    newDepartment();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}


function newDepartment() {
    inquirer.prompt({
        name: "name",
        message: "Whats the name of the depeartment you'd like to add?",
        type: "input",

    }).then(function (answer1) {

        inquirer.prompt({

            name: "costs",
            message: "whats the overhead costs?",
            type: "input"
        }).then(function (answer2) {


            connection.query(`INSERT INTO departments (department_name, over_head_costs) 
                    VALUES ( "${answer1.name}", ${answer2.costs});`
                , function (err, res) {
                    if (err) throw err;
                    console.log("department added!")

                })
        })
    })
}


runSearch();
var table = new Table({
    head: ['id', 'name', 'overhead costs', 'product sales', 'total profit']
    , colWidths: [30, 30, 30, 30, 30]
});
function viewSales() {
    // instantiate


    var query = "SELECT * FROM departments"
    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            
            
            var query2 = "SELECT * FROM products WHERE department_name='" + res[i].department_name + "'";

            connection.query(query2, function (err, res2) {
                if (err) throw err;

                var dept_product_sales = 0;

                for (var j = 0; j < res2.length; j++) {
                    dept_product_sales += res2[j].product_sales;
                }
                console.log(i)
                console.log(dept_product_sales)

                
                var total_sales = dept_product_sales - res[i].over_head_costs;

                table.push(
                    [res[i].department_id, res[i].department_name, res[i].over_head_costs, dept_product_sales, total_sales]
                )
            
            })
         

        }
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        console.log(table.toString());

    })

}

