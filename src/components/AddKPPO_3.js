// src/components/AddKPPO_3.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './AddKPPO_3.css';

import {useAxios} from "./AxiosComponent";

const AddKPPO_3 = () => {
  const UNSELECT_PARAM_TOKEN = '-'

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { name, selectedMeteoData = [], formula = '' } = state || {};
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState('');
  const [availableParams, setAvailableParams] = useState([]);
  const [usedParams, setUsedParams] = useState([]);
  const axios = useAxios('http://localhost:8080');

  console.log(state)

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
    axios.post('api/v1/fire-forecast-indexes', {
          name: state.name,
          formula: state.formula,
          weatherDataParams: usedParams.map(param => {
            const id = param.weatherId
            const paramName = param.paramName
            const weatherName = state.selectedParams.find(selected => selected.id === id).name

            return {weatherDataId: id, weatherName: weatherName, formulaParameter: paramName}
          })
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((resp) => {
      navigate('/complex-index', { state: { name, selectedMeteoData, formula, parameters } })
    })
        .catch((err) => setError(err))
  };

  const handleBack = () => {
    navigate('/add-kppo-2', { state });
  };

  const handleUsedParam = (e) => {
    const parts = e.target.value.split(':')
    const id = parts[0]
    const paramName = parts[1]
    if (paramName === UNSELECT_PARAM_TOKEN) {
      setUsedParams(usedParams.filter(param => param.weatherId !== id))
    } else {
      setUsedParams([...usedParams, {weatherId: id, paramName: paramName}])
    }
  }

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
              {state.selectedParams.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>
                    <select style={{width: '50%'}} onChange={handleUsedParam}>
                      <option>{UNSELECT_PARAM_TOKEN}</option>
                      {
                        state.variables
                            .filter(variable => {
                              var usedParam = usedParams.find(param => param.paramName === variable)
                              return !usedParam || usedParam.weatherId === data.id
                            })
                            .map(variable => (
                                <option value={`${data.id}:${variable}`}>{variable}</option>
                            ))
                      }
                    </select>
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
