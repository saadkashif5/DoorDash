import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/login", { username, password }, { withCredentials: true });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#cfcac8",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "400px",
    backgroundColor:"#cb642a",
    height:"300px"
  },
  heading: {
    color: "white",
  },
  input: {
    width: "93.5%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    background: "#22201d",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    width: "100%",
    marginTop:"20px"
  },
  error: {
    color: "red",
  },
};

export default Login;
