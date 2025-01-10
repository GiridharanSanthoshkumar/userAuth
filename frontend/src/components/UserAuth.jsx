import React from "react";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Authentication Module</h1>
      <div style={styles.buttonContainer}>
        <span style={styles.text}>
          New user?{" "}
          <button
            style={styles.signupButton}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </span>
        <span style={styles.text}>
          Existing user?{" "}
          <button
            style={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
  },
  signupButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loginButton: {
    padding: "10px 20px",
    backgroundColor: "#28A745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserAuth;
