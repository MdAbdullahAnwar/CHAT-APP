const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running on PORT ${PORT}`.yellow.bold));
