const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const problemRoutes = require("./routes/problemRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Mini LLD Evaluator API is running"
    });
});

app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/evaluations", evaluationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});