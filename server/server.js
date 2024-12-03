const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT;

const mongoose = require("./Config/db");
const router = require("./Controller/EmployeeController");

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on the port : ${PORT}`);
});
