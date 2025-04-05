import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants");
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
  
    try {
      console.log("Deleting restaurant ID:", id);
      
      const response = await axios.delete(
        `http://localhost:5000/api/restaurants/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.data.success) {
        setRestaurants(prev => prev.filter(r => r._id !== id));
        alert("Restaurant deleted successfully!");
      } else {
        throw new Error(response.data.message || "Deletion failed");
      }
    } catch (error) {
      console.error("Delete failed:", {
        error: error.response?.data || error.message
      });
      alert(error.response?.data?.message || "Failed to Delete.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/home")} />

      <h2>Manage Restaurants</h2>
      <button style={styles.addButton} onClick={() => navigate("/add-restaurant")}>+ Add Restaurant</button>

      <div style={styles.list}>
        {restaurants.length === 0 ? (
          <p>No restaurants added yet.</p>
        ) : (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} style={styles.card}>
              <h3 onClick={() => navigate(`/restaurant/${restaurant._id}`)} style={styles.namee}>{restaurant.name}</h3>
              <p style={styles.name_}><strong>Location:</strong> {restaurant.location}</p>
              <p style={styles.name_}><strong>Manager:</strong> {restaurant.manager}</p>
              <div style={styles.actions}>
                <FaEdit style={styles.icon} onClick={() => navigate(`/edit-restaurant/${restaurant._id}`)} />
                <FaTrash style={styles.iconDelete} onClick={() => handleDelete(restaurant._id)} />
              </div>
            </div>
          ))
        )}
      </div>
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
  list: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" },
  card: {
    backgroundColor: "#cb642a",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "250px",
    textAlign: "left",
    transition: "0.3s",
    position: "relative",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  icon: {
    cursor: "pointer",
    color: "#22201d",
    fontSize: "20px",
  },
  iconDelete: {
    cursor: "pointer",
    color: "#22201d",
    fontSize: "20px",
  },
  namee:{
    color:"white",
    fontSize:"25px",
    textAlign:"center"
  },
  name_:{
    color:"white"
  }
};

export default Restaurants;
