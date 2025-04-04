import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">DoorDash</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        {/* <button className="btn me-2"> */}
                        <Link className="btn-link" to="/login">Log in</Link>
                        {/* </button> */}
                        
                        <button className="btn">
                            <Link to="/signup">Sign up</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar