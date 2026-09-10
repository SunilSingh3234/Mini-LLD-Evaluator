const Attempt = require("../models/attempt");
const Problem = require("../models/problem");
const Evaluation = require("../models/Evaluation");
const {evaluate
} = require("../services/evaluatorService");

// Start a new attempt
// Start a new attempt
const createAttempt = async (req, res) => {
    try {
        const { problemId } = req.body;

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const attempt = await Attempt.create({
            problem: problemId
        });

        res.status(201).json({
            message: "Attempt created successfully",
            attempt
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create attempt",
            error: error.message
        });
    }
};

const getAttempts = async (req, res) => {
    try {
        const attempts = await Attempt
            .find()
            .populate("problem")
            .sort({ createdAt: -1 });

        res.status(200).json(attempts);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch attempts",
            error: error.message
        });
    }
};

// Get one attempt
const getAttemptById = async (req, res) => {
    try {
        const attempt = await Attempt.findById(req.params.id)
            .populate("problem");

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found"
            });
        }

        res.status(200).json(attempt);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch attempt",
            error: error.message
        });
    }
};

// Submit an attempt
const submitAttempt = async (req, res) => {
    try {
        const { submission } = req.body;

        const attempt = await Attempt.findById(req.params.id);

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found"
            });
        }

        if (!submission || submission.trim() === "") {
            return res.status(400).json({
                message: "Submission cannot be empty"
            });
        }

        // Save submission
        attempt.submission = submission;
        attempt.status = "Evaluating";

        await attempt.save();

        // Evaluate submission
        const evaluationResult = await evaluate(submission);

        // Store evaluation separately
        const evaluation = await Evaluation.create({
            attempt: attempt._id,
            totalScore: evaluationResult.totalScore,
            maxScore: evaluationResult.maxScore,
            results: evaluationResult.results
        });

        // Evaluation completed
        attempt.status = "Completed";

        await attempt.save();

        res.status(200).json({
            message: "Submission evaluated successfully",

            evaluation
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to evaluate submission",
            error: error.message
        });
    }
};

module.exports = {
    createAttempt,
    getAttemptById,
    submitAttempt,
    getAttempts
};