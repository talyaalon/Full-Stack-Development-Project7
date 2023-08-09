const express = require("express");
const router = express.Router();
const frozenDB = require("../dataBase/frozenDB");

router.get("/", (req, res) => {
  frozenDB.getFrozens(function (err, result) {
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
  frozenDB.updateFrozen(
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
  frozenDB.deleteFrozen(function (err, result) {
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
  frozenDB.addFrozen(function (err, result) {
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
