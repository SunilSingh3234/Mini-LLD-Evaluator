const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
    {
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        submission: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Started",
                "Submitted",
                "Evaluating",
                "Completed",
                "Failed"
            ],
            default: "Started"
        }
    },
    {
        timestamps: true
    }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

module.exports = Attempt;