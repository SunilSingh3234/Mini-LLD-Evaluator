const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        requirements: {
            type: [String],
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy"
        }
    },
    {
        timestamps: true
    }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;