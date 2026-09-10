const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Problem = require("./models/problem");


dotenv.config();

const seedProblems = async () => {
    try {
        await connectDB();

        await Problem.deleteMany();

        await Problem.create({
            title: "Design a Parking Lot",
            description:
                "Design an object-oriented parking lot system that can park and remove vehicles while supporting different vehicle types.",

            requirements: [
                "Park a vehicle",
                "Remove a vehicle",
                "Find available parking spots",
                "Support different vehicle types",
                "Keep responsibilities clearly separated"
            ],

            difficulty: "Easy"
        });

        console.log("Problems seeded successfully");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedProblems();