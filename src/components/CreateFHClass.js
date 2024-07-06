// src/components/CreateFHClass.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './CreateFHClass.css';

const CreateFHClass = () => {
  const [name, setName] = useState('');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [threatLevel, setThreatLevel] = useState('');
  const [complexIndicator, setComplexIndicator] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name || !lowerBound || !upperBound || !threatLevel || !complexIndicator) {
      setError('Все поля должны быть заполнены');
      return;
    }

    // Добавьте ваш код для сохранения данных в базу
    // ...

    navigate('/fire-hazard-class');
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="create-fhc-container">
          <h1 className="create-fhc-title">Добавление класса пожарной опасности</h1>
          <div className="create-fhc-controls">
            <select value="add" disabled>
              <option value="add">Добавить новый класс</option>
            </select>
            <button onClick={handleCreate}>Создать</button>
          </div>
          <input
            type="text"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <table className="fhc-table">
            <thead>
              <tr>
                <th>Комплексный показатель пожарной опасности</th>
                <th>КППО {name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Комплексный показатель</td>
                <td>
                  <select
                    value={complexIndicator}
                    onChange={(e) => setComplexIndicator(e.target.value)}
                  >
                    <option value="">Выберите показатель</option>
                    {/* Добавьте необходимые варианты */}
                    <option value="Показатель 1">Показатель 1</option>
                    <option value="Показатель 2">Показатель 2</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Нижняя граница</td>
                <td>
                  <input
                    type="text"
                    placeholder="Введите значение"
                    value={lowerBound}
                    onChange={(e) => setLowerBound(e.target.value)}
                  />
                  <button onClick={() => setLowerBound('∞')}>∞</button>
                </td>
              </tr>
              <tr>
                <td>Верхняя граница</td>
                <td>
                  <input
                    type="text"
                    placeholder="Введите значение"
                    value={upperBound}
                    onChange={(e) => setUpperBound(e.target.value)}
                  />
                  <button onClick={() => setUpperBound('∞')}>∞</button>
                </td>
              </tr>
              <tr>
                <td>Уровень пожарной угрозы</td>
                <td>
                  <select
                    value={threatLevel}
                    onChange={(e) => setThreatLevel(e.target.value)}
                  >
                    <option value="">Выберите уровень</option>
                    <option value="Отсутствует">Отсутствует</option>
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Критический">Критический</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateFHClass;
