import React from 'react';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem',
  boxSizing: 'border-box',
};

const modalStyle = {
  background: '#fff',
  padding: '2.5rem 2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxSizing: 'border-box',
};

const closeButtonStyle = {
  marginTop: '1.5rem',
  padding: '0.75rem 1.5rem',
  background: '#28a745',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  color: '#fff',
  transition: 'background-color 0.3s ease',
  alignSelf: 'flex-start',
};

function ModalViewPost({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginTop: 0 }}>{post.title}</h2>
        <p><strong>Descrição:</strong> {post.description}</p>
        <p><strong>Matéria:</strong> {post.subject}</p>
        <p><strong>Professor:</strong> {post.teacherName}</p>
        <p><strong>Data de criação:</strong> {new Date(post.createdAt).toLocaleString()}</p>
        {post.image && (
          <div style={{ marginTop: '1.5rem' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        )}
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalViewPost;
