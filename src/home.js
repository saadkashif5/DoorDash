import React from "react";
import { useNavigate } from "react-router-dom";
import restaurantsImg from "./images/rest.jpeg";
import usersImg from "./images/users.jpeg";
import ordersImg from "./images/order.png";
import { FaArrowLeft } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const options = [
    { name: "Manage Restaurants", image: restaurantsImg, route: "/restaurants" },
    { name: "Manage Users", image: usersImg, route: "/users" },
    { name: "Manage Orders", image: ordersImg, route: "/orders" }
  ];

  return (
    <div style={styles.container}>
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate("/")} />
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.grid}>
        {options.map((option, index) => (
          <div key={index} style={styles.card} onClick={() => navigate(option.route)}>
            <img src={option.image} alt={option.name} style={styles.image} />
            <h3 style={styles.text}>{option.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#cfcac8",
    color: "#fff",
  },
  backIcon: { 
   position: "absolute",
   top: "20px", left: "20px", 
   cursor: "pointer", 
   fontSize: "24px", 
   color: "#22201d" 
  },
  heading: {
    fontSize: "40px",
    marginBottom: "100px",
    color:"#22201d"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "200px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    backgroundColor:"#cb642a"
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  image: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  text: {
    color: "white",
  },
};

export default Home;
