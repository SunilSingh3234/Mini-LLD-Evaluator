const Evaluation = require("../models/Evaluation");

const getEvaluationByAttempt = async (req, res) => {
    try {
        const evaluation = await Evaluation.findOne({
            attempt: req.params.attemptId
        }).populate({
            path: "attempt",
            populate: {
                path: "problem"
            }
        });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found"
            });
        }

        res.status(200).json(evaluation);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch evaluation",
            error: error.message
        });
    }
};

module.exports = {
    getEvaluationByAttempt
};