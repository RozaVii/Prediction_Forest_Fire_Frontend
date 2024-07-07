// src/components/AddKPPO_1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './AddKPPO_1.css';

const AddKPPO_1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [availableParams, setAvailableParams] = useState([
    'Температура воздуха', 'Температура точки росы', 'Суточные осадки'
  ]);
  const [selectedParams, setSelectedParams] = useState([]);
  const [error, setError] = useState('');

  const handleAddParam = () => {
    const selectedOption = document.querySelector('#availableParams option:checked');
    if (selectedOption) {
      setSelectedParams([...selectedParams, selectedOption.value]);
      setAvailableParams(availableParams.filter(param => param !== selectedOption.value));
    }
  };

  const handleRemoveParam = () => {
    const selectedOption = document.querySelector('#selectedParams option:checked');
    if (selectedOption) {
      setAvailableParams([...availableParams, selectedOption.value]);
      setSelectedParams(selectedParams.filter(param => param !== selectedOption.value));
    }
  };

  const handleNext = () => {
    if (name.trim() === '' || selectedParams.length === 0) {
      setError('Все поля должны быть заполнены');
      return;
    }
    navigate('/add-kppo-2', { state: { name, selectedParams } });
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="add-kppo-container">
          <h1>1. Введите название и выберите метеоданные</h1>
          <input
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
          {error && <p className="error">{error}</p>}
          <div className="tables-container">
            <div className="table">
              <select id="availableParams" multiple size="5">
                {availableParams.map(param => (
                  <option key={param} value={param}>{param}</option>
                ))}
              </select>
            </div>
            <div className="buttons">
              <button onClick={handleAddParam}>Добавить</button>
              <button onClick={handleRemoveParam}>Удалить</button>
            </div>
            <div className="table">
              <select id="selectedParams" multiple size="5">
                {selectedParams.map(param => (
                  <option key={param} value={param}>{param}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="footer-buttons">
            <button onClick={() => navigate('/complex-index')}>К просмотру КППО</button>
            <button onClick={handleNext}>Далее</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKPPO_1;
