// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../images/logo-2.png';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1>Prediction Forest Fire</h1>
      </div>
      <div className="header-right">
        <span>Роль: Администратор</span>
      </div>
    </div>
  );
};

export default Header;



