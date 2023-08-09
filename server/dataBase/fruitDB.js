const databaseConnection = require("../DBconnection");

function getFruits(callback) {
  databaseConnection.query(
    "SELECT * FROM fruit;",
    function (err, result, fields) {
      if (err) {
        console.error("Error:", err);
        callback(err, null); // Call the callback with an error as the first argument
      } else {
        console.log("res:");
        console.log(result);
        callback(null, result); // Call the callback with the query result as the second argument
      }
    }
  );
}

function updateFruit(callback, id, body) {
  console.log(body);
  const { name, price, category, quantity, image_url } = body;

  let sql = `UPDATE fruit SET`;
  const values = [];

  if (name !== undefined) {
    sql += ` name = ?,`;
    values.push(name);
  }

  if (price !== undefined) {
    sql += ` price = ?,`;
    values.push(price);
  }

  if (category !== undefined) {
    sql += ` category = ?,`;
    values.push(category);
  }

  if (quantity !== undefined) {
    sql += ` quantity = ?,`;
    values.push(quantity);
  }
  if (image_url !== undefined) {
    sql += ` image_url = ?,`;
    values.push(image_url);
  }

  // Remove the trailing comma from the SQL statement
  sql = sql.slice(0, -1);

  sql += ` WHERE id = ?`;
  values.push(id);

  console.log(sql);

  databaseConnection.query(sql, values, (error, results, fields) => {
    if (error) throw error;

    // Fetch the updated Fruit from the database
    const selectSql = `SELECT * FROM fruit WHERE id = ?`;
    databaseConnection.query(selectSql, [id], (selectError, selectResults) => {
      if (selectError) throw selectError;
      else {
        console.log("res:");
        console.log(selectResults[0]);
        callback(null, selectResults[0]); // Call the callback with the query result as the second argument
      }
    });
  });
}

function deleteFruit(callback, id) {
  const selectSql = `SELECT * FROM fruit WHERE id = ?`;
  databaseConnection.query(selectSql, [id], (selectError, selectResults) => {
    if (selectError) throw selectError;
    else {
      console.log("res:");
      console.log(selectResults[0]);
      callback(null, selectResults[0]); // Call the callback with the query result as the second argument
    }
  });
  let sql = "DELETE FROM fruit WHERE id = ?";
  databaseConnection.query(sql, [id], function (err, result, fields) {});
}

function addFruit(callback, body) {
  console.log(body);
  const { name, price, category, quantity, image_url } = body;

  const sql =
    "INSERT INTO fruit (name, price, category, quantity, image_url) VALUES (?, ?, ?, ?, ?)";
  databaseConnection.query(
    sql,
    [name, price, category, quantity, image_url],
    function (err, result) {
      if (err) throw err;
      const selectSql = `SELECT * FROM fruit WHERE id = ?`;
      databaseConnection.query(
        selectSql,
        [result.insertId],
        (selectError, selectResults) => {
          if (selectError) throw selectError;
          else {
            console.log("res:");
            console.log(selectResults[0]);
            callback(null, selectResults[0]); // Call the callback with the query result as the second argument
          }
        }
      );
    }
  );
}

module.exports = { getFruits, updateFruit, deleteFruit, addFruit };
