import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/admin-login", {
        username,
        password,
      });
      setResponseMessage(response.data);
      setShowError(false);
      onLoginSuccess();
      setLoading(false);
    } catch (error) {
      setResponseMessage("Invalid credentials");
      setShowError(true);
      setLoading(false);
    }
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1 className="text-center mb-4">Admin Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label className="fw-bold">Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label className="fw-bold">Password :</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Row className="d-flex justify-content-center mt-3">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Col>
        </Row>
      </Form>
      {responseMessage && (
        <Alert variant={showError ? "danger" : "success"} className="mt-3">
          {responseMessage}
        </Alert>
      )}
    </Container>
  );
};


const DataView = ({ data, handleCloseData }) => {
  return (
    <Container
      className="mt-5 p-4"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <Row className="mt-4">
        {data.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {item.email}
                </Card.Text>
                <Card.Text>
                  <strong>Date of Birth:</strong> {item.DOB}
                </Card.Text>
                <Card.Text>
                  <strong>Phone:</strong> {item.phone}
                </Card.Text>
                <Card.Text>
                  <strong>Gender:</strong> {item.gender}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="d-flex justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="danger" onClick={handleCloseData}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};


const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/submit-form", {
        name,
        email,
        DOB,
        phone,
        gender,
      });
      setResponseMessage(response.data);
      setShowError(false);
    } catch (error) {
      setResponseMessage("Error submitting data");
      setShowError(true);
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDOB("");
    setGender("");
    setResponseMessage("");
    setShowError(false);
  };

  const handleGetData = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setLoginMessage("Successfully Logged In");
    setShowLogin(false);
  };

  const handleCloseData = () => {
    setShowData(false);
    setIsAuthenticated(false);
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-data");
      setData(response.data);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
      <Container
        className="mt-5 p-4"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h1 className="text-center mb-4">Form Submission</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label className="fw-bold">Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label className="fw-bold">Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Date of Birth :</Form.Label>
            <Form.Control
              type="date"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Phone Number :</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="^\+?\d{0,13}"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Gender :</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>

          <Row className="d-flex justify-content-center mt-3">
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="secondary" type="button" onClick={handleClear}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>

        {responseMessage && (
          <Alert variant={showError ? "danger" : "success"} className="mt-3">
            {responseMessage}
          </Alert>
        )}

        <Row className="mt-5">
          <Col className="d-flex justify-content-center">
            <Button variant="dark" onClick={handleGetData}>
              Get Data
            </Button>
          </Col>
        </Row>
        
        {showLogin && <LoginForm onLoginSuccess={handleLoginSuccess} />}

        {isAuthenticated && (
          <>
            <Alert variant="success" className="mt-3">
              {loginMessage}
            </Alert>
            <Row className="d-flex justify-content-center mt-3">
              <Col xs="auto">
                <Button variant="success" onClick={handleFetchData}>
                  Load Data
                </Button>
              </Col>
            </Row>
          </>
        )}

        {/* Displaying Data */}
        {showData && data.length > 0 && <DataView data={data} handleCloseData={handleCloseData} />}
      </Container>
    </div>
  );
};
export default App;
