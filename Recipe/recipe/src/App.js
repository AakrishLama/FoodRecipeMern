import React from 'react';  // Add this line
import './App.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./screens/Home.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Food from './screens/Food.js';
import Signup from './screens/Signup.js';
import Login from './screens/Login.js';
import { FoodProvider } from './screens/FoodContext.js';

function App() {
    return (
        <FoodProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/createFood" element={<Food />} />
                        <Route exact path="/Signup" element={<Signup />} />
                        <Route exact path="/Login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </FoodProvider>
    );
}

export default App;
