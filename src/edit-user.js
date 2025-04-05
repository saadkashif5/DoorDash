import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    type: "user"
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Userid: "+id);
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        if (response.data) {
          setUser({
            name: response.data.name,
            username: response.data.username,
            password: "",
            type: response.data.type
          });
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: user.name,
        username: user.username,
        type: user.type,
      };

      if (user.password.trim() !== "") {
        updatedUser.password = user.password;
      }

      const response = await axios.put(`http://localhost:5000/api/users/${id}`, updatedUser);
      if (response.data.success) {
        alert("User updated successfully!");
        navigate("/users");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/users")} />
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={user.name} 
          onChange={handleChange} 
          required 
          style={styles.input} 
        />
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={user.username} 
          onChange={handleChange} 
          required 
          style={styles.input} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter new password (leave blank to keep current)" 
          value={user.password} 
          onChange={handleChange} 
          style={styles.input} 
        />
        <select name="type" value={user.type} onChange={handleChange} style={styles.input}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.submitButton}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor: "#cfcac8", height: "567px" },
  backIcon: { position: "absolute", top: "20px", left: "20px", cursor: "pointer", fontSize: "24px", color: "#22201d" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  submitButton: { backgroundColor: "#cb642a", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default EditUser;
