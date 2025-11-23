const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    "1 round technical",
    "2 round technical",
    "HR-discussion",
    "technical assessment test",
    "Final round",
    "offer",
    "onhold",
    "offer-rejected",
    "offer-accepted",
    "cv-shared with client",
    "resume selected",
    "shortlisted",
    "duplicate"
  ]);
});

module.exports = router;
