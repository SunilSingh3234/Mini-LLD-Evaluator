const express = require("express");

const {
    createAttempt,
    getAttemptById,
    submitAttempt,
    getAttempts
} = require("../controllers/attemptController");

const router = express.Router();

router.post("/", createAttempt);

router.get("/:id", getAttemptById);

router.post("/:id/submit", submitAttempt);
router.get("/", getAttempts);

module.exports = router;