export const isLoggedIn = () => !!localStorage.getItem('token');
export const logout = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
