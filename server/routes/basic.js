const express = require("express");
const router = express.Router();
const basicDB = require("../dataBase/basicDB");

router.get("/", (req, res) => {
  basicDB.getBasics(function (err, result) {
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
  basicDB.updateBasic(
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
  basicDB.deleteBasic(function (err, result) {
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
  basicDB.addBasic(function (err, result) {
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
