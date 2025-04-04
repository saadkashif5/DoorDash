import './App.css';
import Home from './screens/Home'; 
import Login from './screens/Login';
import Signup from './screens/Signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
