import React from "react"
import "../styles/Login.css";
import { Link } from 'react-router-dom';

function Signup() {

    return(
        <div className="login-container">
            <div className="login-box">
    
                <div className="login-image">
                    <img src={require("../assets/order.png")} alt="Food" style={{ width: "300px", height: "300px" }} />
                </div>

                <div className="login-form">
                <h2>Sign Up</h2>
                <form>
                    <div className="form-group">
                        {/* <label>Name</label> */}
                        <input type="text" placeholder="Enter your full name" required />
                    </div>
                    <div className="form-group">
                        {/* <label>Email</label> */}
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        {/* <label>Password</label> */}
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                    <div className="form-group">
                        {/* <label>Re-enter Password</label> */}
                        <input type="password" placeholder="Re-enter Password" required />
                    </div>
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Signup