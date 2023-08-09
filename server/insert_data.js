// // const http = require("http");

// // const host = "localhost";
// // const port = 8000;

// // const requestListener = function (req, res) {
// //   res.writeHead(200);
// //   res.end("Hello World from Node.js HTTP Server");
// // };

// // const server = http.createServer(requestListener);
// // server.listen(port, host, () => {
// //   console.log(`Server is running on http://${host}:${port}`);
// // });

const mysql = require("mysql2");
const fs = require("fs");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oriya1234",
  port: 3306,
  database: "FullStackProject7",
});

// // // Define the TRUNCATE TABLE query
// // const truncateTableQuery = `TRUNCATE TABLE ${tableName}`;

// // // Truncate the table
// // connection.query(truncateTableQuery, (err, result) => {
// //   if (err) {
// //     console.error("Error truncating table:", err);
// //     connection.end();
// //     return;
// //   }
// //   console.log("Table truncated.");

// Read JSON data from the file
const jsonData = fs.readFileSync("C:/FullStack/data/users.json", "utf8");
const data = JSON.parse(jsonData);

// // Function to remove duplicates from JSON data based on a unique identifier
// function removeDuplicates(data, key) {
//   const uniqueMap = new Map();
//   data.forEach((item) => {
//     if (!uniqueMap.has(item[key])) {
//       uniqueMap.set(item[key], item);
//     }
//   });
//   return Array.from(uniqueMap.values());
// }

// // Usage:
// // Read JSON data from the file
// const jsonData = fs.readFileSync("C:/FullStack/data/milk.json", "utf8");
// const data = JSON.parse(jsonData);

// // Remove duplicates based on the "id" (assuming "id" is the unique identifier)
// const uniqueData = removeDuplicates(data, "id");

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");

  // Define the table name
  const tableName = "users";

  //   // Define the DROP TABLE query
  //   const dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

  //   // Execute the DROP TABLE query
  //   // connection.query(dropTableQuery, (err, result) => {
  //   //   if (err) {
  //   //     console.error("Error dropping table:", err);
  //   //     connection.end();
  //   //     return;
  //   //   }
  //   //   console.log("Table dropped or does not exist.");

  //   // Define the table creation query
  //   const createTableQuery = `
  //       CREATE TABLE IF NOT EXISTS ${tableName} (
  //         id int NOT NULL AUTO_INCREMENT,
  //         name VARCHAR(255),
  //         username VARCHAR(255),
  //         password VARCHAR(255),
  //         phone VARCHAR(255),
  //         email VARCHAR(255),
  //         address VARCHAR(255),
  //         user_rank VARCHAR(255),
  //         PRIMARY KEY(id)
  //       )
  //     `;

  //   // Create the table
  //   connection.query(createTableQuery, (err, result) => {
  //     if (err) {
  //       console.error("Error creating table:", err);
  //       connection.end();
  //       return;
  //     }
  //     console.log("Table created or already exists.");

  // Define the INSERT query
  const insertQuery =
    "INSERT INTO " +
    tableName +
    " (id, name, username, password, phone, email, address, user_rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  // Insert the data into the table
  data.forEach((entry) => {
    const values = [
      entry.id,
      entry.name,
      entry.username,
      entry.password,
      entry.phone,
      entry.email,
      entry.address,
      entry.rank,
    ];
    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }
      console.log("Inserted data with ID:", result.insertId);
    });
  });

  data.forEach((entry) => {
    console.log(entry.id);
  });

  // Close the connection after all data has been inserted
  connection.end((err) => {
    if (err) {
      console.error("Error closing connection:", err);
      return;
    }
    console.log("MySQL connection closed.");
  });
});
//});

// //const mysql = require("mysql2");
// //const express = require("express");

// // // Initial Variables
// // const app = express();
// // app.use(express.json());

// //const hostname = "127.0.0.1";
// const port = process.env.PORT || 3000;

// // const host = "localhost";
// // const port = 3000;

// // const requestListener = function (req, res) {
// //   res.writeHead(200);
// //   res.end("Hello World from Node.js HTTP Server");
// // };

// // const server = http.createServer(requestListener);
// // server.listen(port, host, () => {
// //   console.log(`Server is running on http://${host}:${port}`);
// // });

// const databaseConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "oriya1234",
//   port: 3306,
//   database: "FullStackProject7",
// });

// //GET
// app.get("/api/users", (req, res) => {
//   databaseConnection.query(
//     "SELECT * FROM milk;",
//     function (err, result, fields) {
//       console.log(result);
//       res.send(result);
//     }
//   );
// });

// // app.listen(port, () => {
// //   console.log(`Server running at localhost:3000/`);
// // });
