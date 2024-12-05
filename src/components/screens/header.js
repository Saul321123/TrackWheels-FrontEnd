import React from 'react';
import trackWheels from '../../assets/img/header/trackwheels.png';

function Header({ onLogout }) {
  return (
    <header className="header">
      <div>
        <img src={trackWheels} className="logo-img" alt="Logo" />
      </div>
      <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
    </header>
  );
}

export default Header;







