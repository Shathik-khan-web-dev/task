const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["sick", "casual", "earned"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    default: "",
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Test",
  },
  leaves: [leaveSchema],
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
