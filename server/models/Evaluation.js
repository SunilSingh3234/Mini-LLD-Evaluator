const mongoose = require("mongoose");

const evaluationResultSchema = new mongoose.Schema(
    {
        criterion: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },

        maxScore: {
            type: Number,
            default: 10
        },

        evidence: {
            type: String,
            required: true
        },

        concern: {
            type: String,
            default: ""
        },

        suggestion: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const evaluationSchema = new mongoose.Schema(
    {
        attempt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attempt",
            required: true
        },

        totalScore: {
            type: Number,
            required: true
        },

        maxScore: {
            type: Number,
            required: true
        },

        results: {
            type: [evaluationResultSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;