import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";

const LeaveForm = ({ closeModal, onLeaveApplied }) => {
  const [form, setForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    comments: "",
  });
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.comments.trim() === "") {
      toast.error("Comments are required.");
      return;
    }

    axios
      .post(`${BACKEND_URL}/api/employee/apply-leave`, form)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          toast.success(res.data.message);
        }, 2000);
        onLeaveApplied();
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
        <Form.Group className="mb-4" controlId="formLeaveType">
          <Form.Label>Leave Type</Form.Label>
          <Form.Select
            name="type"
            onChange={handleChange}
            required
            style={{ padding: "10px" }}>
            <option value="">Select Leave Type</option>
            <option value="sick">Sick</option>
            <option value="casual">Casual</option>
            <option value="earned">Earned</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                onChange={handleChange}
                required
                style={{ padding: "10px" }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                onChange={handleChange}
                required
                style={{ padding: "10px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="formComments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            name="comments"
            rows={3}
            placeholder="Enter any comments (optional)"
            onChange={handleChange}
            style={{ padding: "10px" }}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="px-5"
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              fontSize: "16px",
            }}>
            Submit
          </Button>
        </div>
      </Form>
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

export default LeaveForm;
