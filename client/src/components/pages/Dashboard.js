import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Row, Col } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import LeaveForm from "./LeaveForm";
import LeaveChart from "./LeaveChart";

const Dashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const getEmployeeData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/employee`);
      const data = res?.data?.data;

      if (!data) {
        setEmployee(null);
        toast.error("No employee data available.");
      } else {
        setEmployee(data);
        toast.success(res.data.message);

        setChartData({
          labels: ["Sick Leave", "Casual Leave", "Earned Leave"],
          datasets: [
            {
              data: [
                data.availedSickLeaves,
                data.availedCasualLeaves,
                data.availedEarnedLeaves,
              ],
              backgroundColor: ["#4472c4", "#ed7d31", "#a5a5a5"],
              hoverBackgroundColor: ["#4472c4", "#ed7d31", "#a5a5a5"],
            },
          ],
        });
      }
    } catch (err) {
      setEmployee(null);
      toast.error("Failed to fetch employee data.");
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLeaveApplied = () => {
    getEmployeeData();
  };

  return (
    <>
      <Container className="mt-4">
        <h3 className="mb-3">Dashboard:</h3>

        {/* Modal */}
        <div className="d-flex justify-content-end mb-4">
          <Button variant="dark" onClick={handleShow}>
            Apply Leave
          </Button>
        </div>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Apply Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LeaveForm
              closeModal={handleClose}
              onLeaveApplied={handleLeaveApplied}
            />
          </Modal.Body>
        </Modal>

        <Row>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>Employee Name</th>
                <th>Sick Leaves</th>
                <th>Casual Leaves</th>
                <th>Earned Leaves</th>
                <th>Total No. of Leaves</th>
                <th>Total No. of Availed Leaves</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {employee ? (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.availedSickLeaves}</td>
                  <td>{employee.availedCasualLeaves}</td>
                  <td>{employee.availedEarnedLeaves}</td>
                  <td>{employee.totalLeaves}</td>
                  <td>{employee.totalAvailedLeaves}</td>
                  <td>{employee.balance}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No employee data available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>

        <Row className="d-flex justify-content-center align-items-center">
          <Col md={4} className="border border-2 p-3 pb-5">
            {chartData ? (
              <LeaveChart chartData={chartData} />
            ) : (
              <p className="text-center">No chart data available.</p>
            )}
          </Col>
        </Row>
      </Container>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default Dashboard;
