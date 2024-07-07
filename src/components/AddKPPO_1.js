// src/components/AddKPPO_1.js
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {FFWIContext} from "./FFWIProvider";
import './AddKPPO_1.css';
import {useAxios} from "./AxiosComponent";

const AddKPPO_1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [weatherParams, setWeatherParams] = useState([]);
  const [availableParams, setAvailableParams] = useState([]);
  const location = useLocation();
  const { state } = location;
  const [selectedParams, setSelectedParams] = useState([]);
  const [error, setError] = useState('');
  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
    if (!axios) return
    console.log(state)

    axios.get('/api/v1/weather-data')
        .then((response) => {
          var weatherParams = response.data.map(param => {
            var result = {id: param.id, name: param.name}
            return result
          })
          setWeatherParams(weatherParams)
          if (state && state.name) {
            setName(state.name)
          }
          if (state && state.selectedParams) {
            setSelectedParams(state.selectedParams)
            const paramIds = state.selectedParams.map(param => param.id)
            weatherParams = weatherParams.filter(param => !paramIds.includes(param.id))
          }
          console.log(weatherParams)
          setAvailableParams(weatherParams)

        })
  }, [axios])

  const handleAddParam = () => {
    const selectedOption = document.querySelector('#availableParams option:checked');
    if (selectedOption) {
      const weatherParam = weatherParams.find(param => param.id === selectedOption.value)
      setSelectedParams([...selectedParams, weatherParam]);
      setAvailableParams(availableParams.filter(param => param.id !== weatherParam.id));
    }
  };

  const handleRemoveParam = () => {
    const selectedOption = document.querySelector('#selectedParams option:checked');
    if (selectedOption) {
      const weatherParam = weatherParams.find(param => param.id === selectedOption.value)
      setAvailableParams([...availableParams, weatherParam]);
      setSelectedParams(selectedParams.filter(param => param.id !== weatherParam.id));
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
                  <option key={param.id} value={param.id}>{param.name}</option>
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
                  <option key={param.id} value={param.id}>{param.name}</option>
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
