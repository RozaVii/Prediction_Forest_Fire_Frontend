// src/components/AddKPPO_2.js
import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
// import './AddKPPO_2.css';
import {useAxios} from "./AxiosComponent";

const AddKPPO_2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [formula, setFormula] = useState('');
  const [error, setError] = useState('');
  const [variables, setVariables] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
    if (state && state.formula) {
      setFormula(state.formula)
    }
  }, []);

  const handleNext = () => {
    if (formula.trim() === '') {
      setError('Поле обязательно к заполнению');
      return;
    }
    axios.post('/api/v1/app-endpoint/check-formula', {
      formula: formula
    }, {
      headers: {
        contentType: 'application/json',
      }
    }).then((resp) => {
      setVariables(variables => [...variables, ...resp.data]);
      setIsFinished(true)
    })
      .catch((err) => console.log(err))

  };

  if (isFinished) {
    navigate('/add-kppo-3', {state: {...state, formula, variables}})
  }

  const handleBack = () => {
    navigate('/add-kppo-1', { state });
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="add-kppo-container">
          <h1>2. Введите формулу</h1>
          <textarea
            placeholder="Формула"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="formula-input"
          />
          {error && <p className="error">{error}</p>}
          <div className="formula-rules">
            <h2>Правила объявления формулы:</h2>
            <ul>
              <li>1. Формула должна быть корректной и соответствовать правилам математики.</li>
              <li>2. Используйте только допустимые переменные и операторы.</li>
              <li>3. Формула должна быть понятной и логичной.</li>
            </ul>
          </div>
          <div className="footer-buttons">
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleNext}>Далее</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKPPO_2;
