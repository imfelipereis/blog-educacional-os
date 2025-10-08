import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from "../../components/Header/Header";

import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await fetch(`http://localhost:5001/api/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });

        if (!response.ok) throw new Error('Erro ao obter post.');

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Carregando post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="post-detail-wrapper">
      <Header />
      <div className="post-detail-container">
        {post.image && (
          <div className="post-detail-image-container">
            <img className="post-detail-image" src={post.image} alt={post.title} />
          </div>
        )}

        <div className="post-detail-content">
          <h1 className="post-detail-title">{post.title ?? 'Sem título'}</h1>

          <div className="post-detail-meta">
            <span className="post-date">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}</span>
            <span className="teacher-name">{post.teacherName ?? 'Professor desconhecido'}</span>
            {post.subject && <span className="post-subject">{post.subject}</span>}
          </div>

          <div className="post-detail-description">
            <p>{post.description ?? 'Sem descrição'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;