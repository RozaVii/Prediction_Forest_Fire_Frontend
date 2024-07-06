/// src/components/CreateMeteoData.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './CreateMeteoData.css';

const CreateMeteoData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.data) {
      const { name, type, description } = location.state.data;
      setName(name);
      setType(type);
      setDescription(description);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !description) {
      setError('Все поля должны быть заполнены');
      return;
    }

    // Здесь добавить код для добавления данных в базу

    navigate('/meteorological-data');
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="create-meteo-container">
          <h1 className="create-meteo-title">Добавление метеорологических данных</h1>
          <form onSubmit={handleSubmit} className="create-meteo-form">
            <div className="form-control">
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">Выберите данные</option>
                <option value="add">Добавить</option>
                {/* Здесь можно добавить другие опции по мере необходимости */}
              </select>
              <button type="submit">Создать</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              placeholder="Введите название"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Введите тип данных"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <textarea
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeteoData;
