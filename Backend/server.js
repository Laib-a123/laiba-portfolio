const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

require("./db/db");

app.use(cors());
app.use(express.json());

const contactRoutes = require("./routes/contactRoutes.js");

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    const db = require("./db/db");

    db.query("SELECT 1 AS db_test", (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database connection failed",
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "Portfolio backend is running",
            database: "Connected successfully"
        });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});