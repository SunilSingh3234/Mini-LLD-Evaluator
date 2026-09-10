const Problem = require("../models/problem");


// Get all problems
const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });

        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch problems",
            error: error.message
        });
    }
};

// Get one problem
const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch problem",
            error: error.message
        });
    }
};

module.exports = {
    getProblems,
    getProblemById
};