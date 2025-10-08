import React from 'react';
import './Pagination.css'; // opcional

function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Anterior
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Próximo
      </button>
    </div>
  );
}

export default Pagination;