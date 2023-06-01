import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Signup from './components/Signup';
import Home from './components/home';
import TodoUpdate from './components/TodoUpdate';
import { AuthProvider } from './components/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/update" element={<TodoUpdate />} />
        <Route path="/signup" element={<Signup />} /> {/* Add the signup route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
