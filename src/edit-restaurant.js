import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    restaurantId: "",
    name: "",
    location: "",
    manager: "",
    menu: [{ item: "", price: "" }],
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log("Edit id:"+id);
        const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        if (response.data) {
          setRestaurant(response.data);
          console.log("response:"+response.data);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...restaurant.menu];
    updatedMenu[index][field] = value;
    setRestaurant({ ...restaurant, menu: updatedMenu });
  };

  const addMenuItem = () => {
    setRestaurant({ ...restaurant, menu: [...restaurant.menu, { item: "", price: "" }] });
  };

  const removeMenuItem = (index) => {
    const updatedMenu = restaurant.menu.filter((_, i) => i !== index);
    setRestaurant({ ...restaurant, menu: updatedMenu });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/restaurants/${id}`, restaurant);

      if (response.data.success) {
        alert("Restaurant updated successfully!");
        navigate("/restaurants");
      } else {
        alert("Failed to update restaurant.");
      }
    } catch (error) {
      console.error("Error updating restaurant", error);
    }
  };

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/restaurants")} />
      <h2>Edit Restaurant</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="restaurantId" value={restaurant.restaurantId} disabled style={styles.input} />
        <input type="text" name="name" value={restaurant.name} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" value={restaurant.location} onChange={handleChange} required style={styles.input} />
        <input type="text" name="manager" value={restaurant.manager} onChange={handleChange} required style={styles.input} />

        <h3>Menu</h3>
        {restaurant.menu.map((menuItem, index) => (
          <div key={index} style={styles.menuItem}>
            <input type="text" placeholder="Item Name" value={menuItem.item} onChange={(e) => handleMenuChange(index, "item", e.target.value)} required style={styles.input} />
            <input type="number" placeholder="Price" value={menuItem.price} onChange={(e) => handleMenuChange(index, "price", e.target.value)} required style={styles.input} />
            <button type="button" onClick={() => removeMenuItem(index)} style={styles.removeButton}>X</button>
          </div>
        ))}
        <button type="button" onClick={addMenuItem} style={styles.addButton}>+ Add Menu Item</button>
        <button type="submit" style={styles.submitButton}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor:"#cfcac8" },
  backIcon: { position: "absolute", top: "20px", left: "20px", cursor: "pointer", fontSize: "24px", color: "#22201d" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  menuItem: { display: "flex", gap: "10px", alignItems: "center" },
  addButton: { backgroundColor: "#28a745", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
  removeButton: { backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },
  submitButton: { backgroundColor: "#cb642a", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default EditRestaurant;
