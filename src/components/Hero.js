import React from "react";
import "../styles/Hero.css"; // Import CSS for styling

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Delicious Food, Delivered Fast!</h1>
        <p>Order your favorite meals from top restaurants near you.</p>
        <button className="hero-btn">Order Now</button>
      </div>
    </section>
  );
};

export default Hero;
