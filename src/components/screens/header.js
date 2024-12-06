import React from 'react';
import trackWheels from '../../assets/img/header/trackwheels.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      // Llama al backend para invalidar el token (opcional)
      await fetch('http://44.207.165.192:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Corregido aquí
        },
      });

      // Elimina el token y redirige al login
      localStorage.removeItem('userToken');
      console.log('Sesión cerrada.');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <header className="header">
      <div>
        <img src={trackWheels} className="logo-img" alt="Logo" />
      </div>
      <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
    </header>
  );
};

export default Header;







