const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
// allows express to parse json
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api", todoRoute);

// connecting to the mongoDB
mongoose.connect(process.env.MONGO_INFO).then(() => {
  console.log("Connected to  Mongodb");
});

const PORT = process.env.PORT || 5000;

// listening on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
