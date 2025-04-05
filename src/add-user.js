import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        username,
        password,
        type,
      });

      if (response.data.success) {
        alert("User added successfully!");
        navigate("/users");
      } else {
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/users")} />
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor: "#cfcac8", height: "567px", position: "relative" },
  backIcon: { position: "absolute", top: "20px", left: "20px", cursor: "pointer", fontSize: "24px", color: "#22201d" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  submitButton: { backgroundColor: "#cb642a", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default AddUser;
