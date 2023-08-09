const express = require("express");
const router = express.Router();
const fruitDB = require("../dataBase/fruitDB");

router.get("/", (req, res) => {
  fruitDB.getFruits(function (err, result) {
    if (err) {
      // Handle the error here
      console.error("Error:", err);
    } else {
      // Use the result here if needed (e.g., send it in the response)
      console.log("Query result:", result);
      res.send(result);
    }
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body);
  fruitDB.updateFruit(
    function (err, result) {
      if (err) {
        // Handle the error here
        console.error("Error:", err);
      } else {
        // Use the result here if needed (e.g., send it in the response)
        console.log("Query result:", result);
        res.send(result);
      }
    },
    id,
    req.body
  );
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fruitDB.deleteFruit(function (err, result) {
    if (err) {
      // Handle the error here
      console.error("Error:", err);
    } else {
      // Use the result here if needed (e.g., send it in the response)
      console.log("Query result:", result);
      res.send(result);
    }
  }, id);
});

router.post("/", (req, res) => {
  fruitDB.addFruit(function (err, result) {
    if (err) {
      // Handle the error here
      console.error("Error:", err);
    } else {
      // Use the result here if needed (e.g., send it in the response)
      console.log("Query result:", result);
      res.send(result);
    }
  }, req.body);
});

module.exports = router;
