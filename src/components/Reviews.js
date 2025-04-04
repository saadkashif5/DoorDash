import React from "react";
import "../styles/Reviews.css"; // Import CSS

const reviews = [
  { name: "John Doe", review: "Amazing food and fast delivery!", rating: 5 },
  { name: "Sarah Smith", review: "Great service and tasty meals!", rating: 4 },
  { name: "Michael Brown", review: "Highly recommend this app!", rating: 5 }
];

function Reviews(){
  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      <div className="reviews-list">
        {reviews.map((rev, index) => (
          <div key={index} className="review-card">
            <h3>{rev.name}</h3>
            <p>"{rev.review}"</p>
            <div className="stars">
              {"⭐".repeat(rev.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
