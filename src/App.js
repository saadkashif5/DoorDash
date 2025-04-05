import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Restaurants from './restaurants';
import AddRestaurant from './add-restaurant';
import EditRestaurant from './edit-restaurant';
import Users from './users';
import AddUser from './add-user';
import EditUser from './edit-user';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />}/>
          <Route path="/add-restaurant" element={<AddRestaurant />}/>
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/add-user" element={<AddUser />}/>
          <Route path="/edit-user/:id" element={<EditUser />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

