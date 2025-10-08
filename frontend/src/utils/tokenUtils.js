export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    return null;
  }
};
