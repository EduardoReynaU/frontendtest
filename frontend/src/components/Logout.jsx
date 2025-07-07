import Cookies from 'js-cookie';
import React from 'react';
const Logout = () => {
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
