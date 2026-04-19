process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors({
    origin:"*"
}));
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Todo Backend is Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});