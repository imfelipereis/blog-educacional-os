import React, { useEffect, useState } from "react";

// Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// CSS da página
import "./PaginaAvisos.css";

const PaginaAvisos = () => {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    // Busca os avisos do backend
    fetch("http://localhost:5000/api/avisos")
      .then((res) => res.json())
      .then((data) => setAvisos(data.avisos || []))
      .catch((err) => console.error("Erro ao carregar avisos:", err));
  }, []);

  return (
    <div>
      <Header />
      <main className="container-pagina-avisos">
        <h1>Avisos</h1>
        {avisos.length === 0 ? (
          <p>Nenhum aviso disponível.</p>
        ) : (
          <ul>
            {avisos.map((aviso) => (
              <li key={aviso.id}>
                <h3>{aviso.title}</h3>
                <p>{aviso.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaginaAvisos;