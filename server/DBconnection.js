const mysql = require("mysql2");

const databaseConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "oriya1234",
  port: 3306,
  database: "FullStackProject7",
});

// // Connect to the Database and running up the server
// databaseConnection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected To The Database.");
// });

module.exports = databaseConnection;
