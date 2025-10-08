import React, { useState, useEffect } from 'react';
import ModalCreatePost from '../../components/AdminModals/ModalCreatePost';
import ModalViewPost from '../../components/AdminModals/ModalViewPost';
import ModalEditPost from '../../components/AdminModals/ModalEditPost';
import ModalDeletePost from '../../components/AdminModals/ModalDeletePost';
import { getPosts, createPost, deletePost } from '../../services/postService';

import Header from "../../components/Header/HeaderAdmin";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const data = await getPosts(token);
      setPosts(data);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      alert('Erro ao carregar posts');
    }
  };

  const handleCreatePost = async (newPost) => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) { alert('Token não encontrado'); return; }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      const postWithTeacher = {
        ...newPost,
        teacherId: decodedToken.id,
        teacherName: decodedToken.name,
      };

      const created = await createPost(token, postWithTeacher);
      setPosts([...posts, created]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Erro ao criar post:', err);
      alert('Erro ao criar post. Por favor, tente novamente.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!postId) {
      alert('ID do post não encontrado. Por favor, tente novamente.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) { alert('Token não encontrado'); return; }

      await deletePost(token, postId);
      setPosts(posts.filter(post => post._id !== postId));
      setIsDeleteOpen(false);
      setSelectedPost(null);
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      alert('Erro ao excluir o post. Por favor, tente novamente.');
    }
  };

  const openViewModal = (post) => {
    if (!post) return;
    setSelectedPost(post);
    setIsViewOpen(true);
  };

  const openEditModal = (post) => {
    if (!post) return;
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const openDeleteModal = (post) => {
    if (!post || !post._id) {
      alert('Post inválido. Não é possível excluir.');
      return;
    }
    setSelectedPost(post);
    setIsDeleteOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="container admin-dashboard">
        <h1>Painel Administrativo</h1>
        <button className="btn-create" onClick={() => setIsCreateOpen(true)}>Criar Post</button>

        <ModalCreatePost 
          isOpen={isCreateOpen} 
          onClose={() => setIsCreateOpen(false)} 
          handleCreatePost={handleCreatePost} 
        />

        <ModalViewPost 
          isOpen={isViewOpen} 
          onClose={() => setIsViewOpen(false)} 
          post={selectedPost} 
        />

        <ModalEditPost 
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          post={selectedPost} 
          refreshPosts={fetchPosts}
        />

        <ModalDeletePost 
          isOpen={isDeleteOpen} 
          onClose={() => setIsDeleteOpen(false)} 
          post={selectedPost} 
          handleDeletePost={() => handleDeletePost(selectedPost?._id)} 
        />

        <div className="posts-table-container">
          {posts.length === 0 ? (
            <p>Nenhum post encontrado</p>
          ) : (
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Matéria</th>
                  <th>Professor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td className="description">{post.description}</td>
                    <td><i>{post.subject}</i></td>
                    <td>{post.teacherName}</td>
                    <td>
                      <div className="post-actions">
                        <button className="btn-view" onClick={() => openViewModal(post)}>Visualizar</button>
                        <button className="btn-edit" onClick={() => openEditModal(post)}>Editar</button>
                        <button className="btn-delete" onClick={() => openDeleteModal(post)}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
