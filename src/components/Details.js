import React from "react";
import "../styles/Details.css"; // Import CSS file

function Details(){
  return (
    <div className="details-container">
      <div className="detail-card">
        <h2>15+</h2>
        <p>Restaurants Registered</p>
      </div>
      <div className="detail-card">
        <h2>150+</h2>
        <p>Orders Completed</p>
      </div>
    </div>
  );
};

export default Details;
