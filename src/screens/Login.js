import React from "react"
import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {

    return(
        <div className="login-container">
            <div className="login-box">
                {/* Left Side - Image */}
                <div className="login-image">
                <img src={require("../assets/rider.png")} alt="Food" style={{ width: "400px", height: "400px" }}/>
                </div>

                {/* Right Side - Form */}
                <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                    {/* <label>Email</label> */}
                    <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                    {/* <label>Password</label> */}
                    <input type="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login