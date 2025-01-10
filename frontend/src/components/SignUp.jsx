import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    usermail: "",
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
       setErrorMessage(""); // Clear error message on input change
    setSuccessMessage(""); // Clear success message on input change
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", formData, {
        withCredentials: true, // Important for session handling
      });
        setSuccessMessage(response.data.message); // Show success message
        alert("signup successful");
        navigate("/login");
        
    } catch (error) {
      if (error.response) {
        // Error returned by the server
        setErrorMessage(error.response.data.error || "Something went wrong");
      } else {
        // Network or other errors
        setErrorMessage("Unable to connect to the server");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:
            <input
              type="email"
              name="usermail"
              value={formData.usermail}
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
          Signup
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

export default Signup;
