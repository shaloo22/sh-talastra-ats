const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    "confirmed",
    "no answering",
    "not interested anymore",
    "reschedule interview",
    "cancel"
  ]);
});

module.exports = router;
