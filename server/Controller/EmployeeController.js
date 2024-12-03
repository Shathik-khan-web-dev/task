const express = require("express");
const router = express.Router();
const EmployeeModel = require("../Model/EmployeeModel");

router.get("/employee", async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne();

    if (!employee) {
      return res.send({
        message: "Test Employee get.",
        data: {
          name: "Test",
          availedSickLeaves: 0,
          availedCasualLeaves: 0,
          availedEarnedLeaves: 0,
          totalLeaves: 25,
          totalAvailedLeaves: 0,
          balance: 25,
        },
      });
    }

    const TOTAL_LEAVES = 25;
    const leaves = employee.leaves || [];

    const availedSickLeaves =
      leaves.filter((leave) => leave.type === "sick").length || 0;
    const availedCasualLeaves =
      leaves.filter((leave) => leave.type === "casual").length || 0;
    const availedEarnedLeaves =
      leaves.filter((leave) => leave.type === "earned").length || 0;

    const totalLeaves = TOTAL_LEAVES;
    const totalAvailedLeaves =
      availedSickLeaves + availedCasualLeaves + availedEarnedLeaves;
    const balance = totalLeaves - totalAvailedLeaves;

    const response = {
      ...employee._doc,
      availedSickLeaves,
      availedCasualLeaves,
      availedEarnedLeaves,
      totalLeaves,
      totalAvailedLeaves,
      balance,
    };

    res.send({
      success: true,
      message: "Employee data fetched successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "An error occurred." });
  }
});

router.post("/employee/apply-leave", async (req, res) => {
  try {
    const { type, startDate, endDate, comments } = req.body;

    if (!type || !startDate || !endDate) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required." });
    }

    if (!["sick", "casual", "earned"].includes(type)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid leave type." });
    }

    let employee = await EmployeeModel.findOne();

    if (!employee) {
      employee = new EmployeeModel({ name: "Test", leaves: [] });
    }

    employee.leaves.push({ type, startDate, endDate, comments });

    await employee.save();

    res.send({ success: true, message: "Leave applied successfully!" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while applying for leave.",
    });
  }
});

module.exports = router;
