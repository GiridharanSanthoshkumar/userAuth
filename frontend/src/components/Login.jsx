import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
  });
    const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); // Clear error message on input change
    setSuccessMessage(""); // Clear success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData, {
        withCredentials: true, // Important for session handling
      });
        setSuccessMessage(response.data.message || "Logged in successfully");
        navigate("/profile");
    } catch (error) {
      if (error.response) {
        // Error returned by the server
        setErrorMessage(error.response.data.error || "Invalid email or password");
      } else {
        // Network or other errors
        setErrorMessage("Unable to connect to the server");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:
            <input
              type="email"
              name="useremail"
              value={formData.useremail}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Login
        </button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </div>
  );
};

export default Login;
