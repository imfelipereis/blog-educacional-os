import React, { useState, useEffect } from 'react';
import { updatePost } from '../../services/postService';

const ModalEditPost = ({ isOpen, onClose, post, refreshPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setDescription(post.description || '');
      setImage(post.image || '');
      setSubject(post.subject || '');
    }
  }, [post]);

  if (!isOpen) return null;

  const onSave = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        alert('Token não encontrado');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      const updatedPost = {
        title,
        description,
        image,
        subject,
        teacherId: decodedToken.id,
        teacherName: decodedToken.name,
      };

      await updatePost(token, post._id, updatedPost);
      refreshPosts();
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar post:', err);
      alert('Erro ao atualizar o post. Por favor, tente novamente.');
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Editar Post</h2>
        <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
        <textarea style={textareaStyle} value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
        <input style={inputStyle} value={image} onChange={e => setImage(e.target.value)} placeholder="Imagem URL" />
        <input style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Matéria" />
        <div style={buttonContainerStyle}>
          <button onClick={onSave} style={saveButtonStyle}>Salvar</button>
          <button onClick={onClose} style={cancelButtonStyle}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,0.5)',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  zIndex:1000,
  padding: '10px',
};

const modalStyle = {
  backgroundColor:'#fff',
  padding:'20px',
  borderRadius:'8px',
  width: '90%',
  maxWidth: '400px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxSizing: 'border-box',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  // Media query (handled via JS): aumenta maxWidth para 600px em telas >= 768px
  ...(window.innerWidth >= 768 ? { maxWidth: '600px' } : {}),
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box',
  resize: 'vertical',
  minHeight: '80px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const saveButtonStyle = {
  flex: 1,
  padding: '10px 0',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease',
};

const cancelButtonStyle = {
  flex: 1,
  padding: '10px 0',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease',
};

export default ModalEditPost;
