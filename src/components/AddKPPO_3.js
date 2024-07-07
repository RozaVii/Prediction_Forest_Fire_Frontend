// src/components/AddKPPO_3.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './AddKPPO_3.css';

const AddKPPO_3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { name, selectedMeteoData = [], formula = '' } = state || {};
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedMeteoData.length) {
      setParameters(new Array(selectedMeteoData.length).fill(''));
    }
  }, [selectedMeteoData]);

  const handleChange = (index, value) => {
    const newParameters = [...parameters];
    newParameters[index] = value;
    setParameters(newParameters);
  };

  const handleFinish = () => {
    if (parameters.some(param => param.trim() === '')) {
      setError('Необходимо связать все параметры');
      return;
    }
    // Save data to the database here

    // Navigate to the ComplexIndex component
    navigate('/complex-index', { state: { name, selectedMeteoData, formula, parameters } });
  };

  const handleBack = () => {
    navigate('/add-kppo-2', { state });
  };

  if (!formula) {
    return <div>Ошибка: Недостаточно данных для отображения. Вернитесь и заполните все поля.</div>;
  }

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="add-kppo-container">
          <h1>3. Свяжите параметры с метеоданными</h1>
          <div className="formula-display">
            <span>Формула: </span>
            <span>{formula}</span>
          </div>
          {error && <p className="error">{error}</p>}
          <table className="parameters-table">
            <thead>
              <tr>
                <th>Метеоданные</th>
                <th>Параметры</th>
              </tr>
            </thead>
            <tbody>
              {selectedMeteoData.map((data, index) => (
                <tr key={index}>
                  <td>{data}</td>
                  <td>
                    <input
                      type="text"
                      value={parameters[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="parameter-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer-buttons">
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleFinish}>Завершить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKPPO_3;
