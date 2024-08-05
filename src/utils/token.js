// utils/token.js

import jwtDecode from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }

  return null;
};
