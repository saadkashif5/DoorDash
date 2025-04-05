import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const AddRestaurant = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [menu, setMenu] = useState([{ item: "", price: "" }]);
  const navigate = useNavigate();

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...menu];
    updatedMenu[index][field] = value;
    setMenu(updatedMenu);
  };

  const addMenuItem = () => {
    setMenu([...menu, { item: "", price: "" }]);
  };

  const removeMenuItem = (index) => {
    const updatedMenu = menu.filter((_, i) => i !== index);
    setMenu(updatedMenu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/restaurants", {
        restaurantId,
        name,
        location,
        manager,
        menu,
      });

      if (response.data.success) {
        alert("Restaurant added successfully!");
        navigate("/restaurants");
      } else {
        alert("Failed to add restaurant.");
      }
    } catch (error) {
      console.error("Error adding restaurant", error);
    }
  };

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/restaurants")} />
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Restaurant ID" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Restaurant Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Manager" value={manager} onChange={(e) => setManager(e.target.value)} required style={styles.input} />

        <h3>Menu</h3>
        {menu.map((menuItem, index) => (
          <div key={index} style={styles.menuItem}>
            <input type="text" placeholder="Item Name" value={menuItem.item} onChange={(e) => handleMenuChange(index, "item", e.target.value)} required style={styles.input} />
            <input type="number" placeholder="Price" value={menuItem.price} onChange={(e) => handleMenuChange(index, "price", e.target.value)} required style={styles.input} />
            <button type="button" onClick={() => removeMenuItem(index)} style={styles.removeButton}>X</button>
          </div>
        ))}
        <button type="button" onClick={addMenuItem} style={styles.addButton}>+ Add Menu Item</button>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor:"#cfcac8",height:"567px" },
  backIcon: { position: "absolute", top: "20px", left: "20px", cursor: "pointer", fontSize: "24px", color: "#22201d" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  menuItem: { display: "flex", gap: "10px", alignItems: "center" },
  addButton: { backgroundColor: "#28a745", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
  removeButton: { backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },
  submitButton: { backgroundColor: "#cb642a", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default AddRestaurant;
