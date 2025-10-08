import React from "react";

const css = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.modal-content p {
  font-size: 1rem;
  color: #333;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn-cancel {
  background-color: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background-color: #b3b3b3;
}

.btn-delete {
  background-color: #27ae60;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #219150;
}
`;

// Adiciona o CSS no documento
if (!document.getElementById("modal-delete-post-css")) {
  const style = document.createElement("style");
  style.id = "modal-delete-post-css";
  style.innerHTML = css;
  document.head.appendChild(style);
}

const ModalDeletePost = ({ isOpen, onClose, post, handleDeletePost }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Excluir Post</h2>
        <p>Tem certeza que deseja excluir o post "{post.title}"?</p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-delete" onClick={() => handleDeletePost(post._id)}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePost;
