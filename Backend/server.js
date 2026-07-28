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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});