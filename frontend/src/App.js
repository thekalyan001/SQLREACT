import './App.css';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 30,
    dob: '1992-01-01',
    contact: 'john@example.com',
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/update-profile" element={<EditProfile user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
