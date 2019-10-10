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

function viewSales() {
    // instantiate
    var table = new Table({
        head: ['name', 'overhead costs', 'product sales']
        , colWidths: [50, 50, 50]
    });
    
    var query = "SELECT * FROM departments";

    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_name , res[i].over_head_costs , `third value`]
            );
        }
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
    })
    console.log(table.toString());

    connection.end();
}  