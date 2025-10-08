import React, { useState, useEffect } from 'react';

const ModalCreatePost = ({ isOpen, onClose, handleCreatePost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setImage('');
      setSubject('');
    }
  }, [isOpen]);

  const onSave = async () => {
    await handleCreatePost({ title, description, image, subject });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Criar Novo Post</h2>
        <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
        <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
        <input style={inputStyle} value={image} onChange={e => setImage(e.target.value)} placeholder="Imagem URL" />
        <input style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Matéria" />
        <div style={buttonContainerStyle}>
          <button style={saveButtonStyle} onClick={onSave}>Salvar</button>
          <button style={cancelButtonStyle} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = { 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0, 
  backgroundColor: 'rgba(0,0,0,0.5)', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  zIndex: 1000,
  padding: '10px',
};

const modalStyle = { 
  backgroundColor: '#fff', 
  padding: '25px 20px', 
  borderRadius: '12px', 
  width: '100%', 
  maxWidth: '450px', 
  maxHeight: '90vh', 
  overflowY: 'auto', 
  boxSizing: 'border-box',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  margin: '0 0 20px 0',
  fontSize: '1.8rem',
  fontWeight: '600',
  color: '#222',
  textAlign: 'center',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1.5px solid #ccc',
  fontSize: '1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '10px',
  flexWrap: 'wrap',
};

const saveButtonStyle = {
  flex: '1 1 120px',
  padding: '12px 0',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const cancelButtonStyle = {
  flex: '1 1 120px',
  padding: '12px 0',
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default ModalCreatePost;
