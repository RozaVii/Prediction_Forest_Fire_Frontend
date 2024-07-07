// src/components/DatabaseCleanup.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DatabaseCleanup.css';

const DatabaseCleanup = ({ userRole }) => {
  const [message, setMessage] = useState('');

  const handleCleanup = () => {
    if (userRole !== 'admin') {
      setMessage('У вас недостаточно прав для выполнения этой операции.');
      return;
    }

    // Здесь должен быть код для очистки базы данных
    setMessage('База данных успешно очищена.');
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="cleanup-container">
          <div className="cleanup-box">
            <h1>Вы уверены что хотите очистить базу?</h1>
            <p>При очистке базы произойдет полное удаление всех данных без возможности восстановления</p>
            <button onClick={handleCleanup} disabled={userRole !== 'admin'}>
              Удалить базу
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseCleanup;

