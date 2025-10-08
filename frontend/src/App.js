import React from "react";
import './App.css';

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PaginaAvisos from "./pages/PaginaAvisos/PaginaAvisos.jsx";
import Login from "./pages/Login/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import PostDetail from './pages/Post/PostDetail.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/avisos" element={<PaginaAvisos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default App;