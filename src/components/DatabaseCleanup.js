  // src/components/DatabaseCleanup.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DatabaseCleanup.css';
import {useAxios} from "./AxiosComponent";

const DatabaseCleanup = ({ userRole }) => {
  const [message, setMessage] = useState('');
  const axios = useAxios('http://localhost:8080');

  const handleCleanup = () => {
    axios.post('/api/v1/app-endpoints')
        .then(_ => setMessage('База данных успешно очищена.'))
        .catch((err) => console.log(err))
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
            <button onClick={handleCleanup}>
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

