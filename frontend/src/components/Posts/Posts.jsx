import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Posts.css";
import Pagination from '../Pagination/Pagination';

function Posts({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwt_token');

        const response = await fetch("http://localhost:5001/api/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        const sortedPosts = Array.isArray(data.posts)
          ? data.posts.filter(post => post && post.createdAt)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];

        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao obter posts:", err);
        setError("Erro ao carregar posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtra os posts com base no searchTerm
  const filteredPosts = posts.filter(post => {
    if (!post) return false;
    const term = searchTerm?.toLowerCase() ?? '';
    const title = (post.title || '').toLowerCase();
    const description = (post.description || '').toLowerCase();
    const teacherName = (post.teacherName || '').toLowerCase();
    return title.includes(term) || description.includes(term) || teacherName.includes(term);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-container"> {/* container principal */}
      <div className="posts-grid">
        {currentPosts.length > 0 ? currentPosts.map(post => (
          <div key={post._id} className="post-card">
            <img src={post.image ?? ''} alt={post.title ?? 'Post image'} className="post-image" />
            <div className="post-content">
              <h2 className="post-title">{post.title ?? 'Sem título'}</h2>
              <p className="post-description">{post.description ?? 'Sem descrição'}</p>
              <p className="post-datetime">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}</p>
              <p className="post-teacher">{post.teacherName ?? ''}</p>
              <button
                className="post-button"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                Saiba mais
              </button>
            </div>
          </div>
        )) : <p>Nenhum post encontrado.</p>}
      </div>

      <Pagination
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Posts;
