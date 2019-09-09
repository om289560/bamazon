var mysql = require("mysql");
var inquirer = ("inquirer");
var table = require ("cli-table");

var connection = mysql.createConnection({
    host: "local host",
    user: "",
    password: "password",
    database: "bamazon",
    port: 3000
});
connection.connect();

var display =function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("WELCOME TO BAMAZON");
        console.log("");
        console.log("Find Your Product Below");
        console.log("");
    });

};
