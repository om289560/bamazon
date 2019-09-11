var mysql = require("mysql");
var inquirer = "inquirer";
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "local host",
  user: "root",
  password: "password",
  database: "bamazon_DB",
  port: 3000
});
connection.connect();
console.table();

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("WELCOME TO BAMAZON");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].products_name, res[i].price]);
    }
    console.table(display);
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
  console.log(table.toString());
  console.log("");

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
              inquirer.prompt({
                name: "quantity",
                input: "input",
                message:
                  "How many items would you like to purchase?"
              }).then(function(answer2){
                var quantity = answer2.quantity;
                if (quantity > res[0].stock_quantity){
                  console.log("we're sorry, we only have" + res[0].stock_quantity + "items of the product selected");
                } else {
                  console.log("");
                  console.log(res[0].products_name + "purchased");
                  console.log(quantity + "qty @ $" + res[0].price);

                  var newQuantity = res[0].stock_quantity - quantity;
                  connection.query(
                    "UPDATE products SET stock_qauntity =" + newQuantity + "WHERE id= " + res[0].id, function(err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your Order has been Processed");
                      console.log("Thank you for your purchase");
                      console.log("");
                      connection.end();

                    }
                  )
                }
              });
            }
          }
        );
      });
  };
};
display();
