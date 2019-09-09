var mysql = nrequire("mysql");
var inquirer = "inquirer";
var table = require("cli-table");

var connection = mysql.createConnection({
  host: "local host",
  user: "",
  password: "password",
  database: "bamazon",
  port: 3000
});
connection.connect();

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("WELCOME TO BAMAZON");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");
  });

  var table = new Table({
    head: ["Product Id", "Product Description", "Cost"],
    colWidths: [12, 50, 8],
    colAligns: ["center", "left", "right"],
    style: {
      head: ["aqua"],
      compact: true
    }
  });
  for (var i = 0; i < res.length; i++) {
    table.push([res[i].id, res[i].products_name, res[i].price]);
  }
  console.log(table.toString());
  console.log("");
};

var shopping = function() {
  inquirer
    .prompt({
      name: "porductToBuy",
      input: "input",
      message: "Please enter the Product Id of the item you wishto purchase."
    })
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      connection.query(
        "SELECT * FROM products WHERE Id =?",
        selection,
        function(err, res) {
          if (err) throw err;
          if (res.lenght === 0) {
            console.log(
              "THat Product does not exist, Please enter a Id from list above"
            );

            shopping();
          } else {
            console.log("All is good");
          }
        }
      );
    });
};
display();
