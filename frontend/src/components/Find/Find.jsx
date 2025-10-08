import React, { useState, useEffect } from "react";
import "./Find.css";

const Find = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="search">
      <div className="container">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="searchInput" className="sr-only">
            Pesquisar
          </label>
          <img src="/search.svg" alt="Ícone de busca" className="search-icon" />
          <input
            type="text"
            id="searchInput"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </div>
    </section>
  );
};

export default Find;
