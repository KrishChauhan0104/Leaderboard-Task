const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));