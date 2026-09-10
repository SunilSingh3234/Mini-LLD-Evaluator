const express = require("express");

const {
    getEvaluationByAttempt
} = require("../controllers/evaluationController");

const router = express.Router();

router.get(
    "/attempt/:attemptId",
    getEvaluationByAttempt
);

module.exports = router;