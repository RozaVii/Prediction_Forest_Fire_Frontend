// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../images/logo-2.png';
import {jwtDecode} from "jwt-decode";

const Header = () => {

    const roleMap = {
        "ADMINISTRATOR": "Администратор",
        "SPECIALIST": "Специалист"
    }

    const getUser = () => {
        const accessToken = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(accessToken);

        return {username: decodedToken.sub, role: roleMap[decodedToken.role]}
    }

    const user = getUser()
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1>Prediction Forest Fire</h1>
      </div>
      <div className="header-right">
        <span>{user.username + " : " + user.role}</span>
      </div>
    </div>
  );
};

export default Header;



