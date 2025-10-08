import React, { useEffect, useState } from "react";

// Importar components
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Find from "../components/Find/Find";
import Posts from "../components/Posts/Posts";
import Footer from "../components/Footer/Footer";

import "../pages/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Buscar dados do backend
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error("Erro ao carregar posts:", err));
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <div className="container">
        <Find />
        {/* Passar posts para o componente Posts */}
        <Posts posts={posts} />
      </div>
      < Footer />
    </div>
  );
};

export default Home;
