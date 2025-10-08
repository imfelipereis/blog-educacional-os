// Arquivo: src/services/postService.js
const API_URL = "http://localhost:5001/api/admin/posts";

export const getPosts = async (token) => {
  const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Erro ao obter posts: ${res.status} ${res.statusText}`);
  return res.json();
};

export const createPost = async (token, postData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error(`Erro ao criar post: ${res.status} ${res.statusText}`);
  return res.json();
};

export const updatePost = async (token, postId, postData) => {
  const res = await fetch(`${API_URL}/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar post: ${res.status} ${res.statusText}`);
  return res.json();
};

export const deletePost = async (token, postId) => {
  const res = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Erro ao deletar post: ${res.status} ${res.statusText}`);
  return res.json();
};

// Export default atribuído a uma variável para evitar warnings do ESLint
const postService = { getPosts, createPost, updatePost, deletePost };
export default postService;