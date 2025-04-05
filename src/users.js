import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200 && response.data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      } else {
        throw new Error(response.data.message || "Deletion failed");
      }
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/home")} />

      <h2>Manage Users</h2>
      <button style={styles.addButton} onClick={() => navigate("/add-user")}>
        + Add User
      </button>

      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.type}</td>
                <td style={styles.actions}>
                  <FaEdit
                    style={styles.icon}
                    onClick={() => navigate(`/edit-user/${user._id}`)}
                  />
                  <FaTrash
                    style={styles.iconDelete}
                    onClick={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor: "#cfcac8", position: "relative" },
  backIcon: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#22201d",
  },
  addButton: {
    backgroundColor: "#cb642a",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ebeae9",
    borderRadius: "15px",
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "2px solid black",
  },
  td: {
    padding: "10px",
    border: "1px solid black",
  },
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  icon: {
    cursor: "pointer",
    color: "#007bff",
    fontSize: "20px",
  },
  iconDelete: {
    cursor: "pointer",
    color: "#ff4d4d",
    fontSize: "20px",
  },
  rowEven: {
    backgroundColor: "white",
  },
  rowOdd: {
    backgroundColor: "lightGray",
  },
};

export default Users;
