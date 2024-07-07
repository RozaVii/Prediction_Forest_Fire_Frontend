import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './TaskSolver.css';

import {useAxios} from "./AxiosComponent";
import login from "./Login";

const TaskSolver = () => {
  const [complexIndex, setComplexIndex] = useState('');
  const [previousIndex, setPreviousIndex] = useState('');
  const [date, setDate] = useState('');
  const [meteoData, setMeteoData] = useState([]);
  const [parameters, setParameters] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [complexIndexes, setComplexIndexes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [messages, setMessages] = useState([]);

  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
      if (!axios) return;

      axios.get('/api/v1/app-endpoints/forecast')
          .then((resp) => {
            setComplexIndexes([...resp.data])
            const test = resp.data.find(index => index.ffwiName === 'По всем параметрам')
            console.log(resp.data)
            setComplexIndex({...test})
            setPreviousIndex(test.previousComplexIndicator)
            setDate(test.previousComplexDate)
            setMeteoData(test.weatherDataParams.map(param => {
              const test = {...param, data: ''}

              console.log(test)
              return test
            }))
          })
          .catch((err) => console.log(err));
  }, [axios]);

  const handleInputChange = (event, field) => {
    console.log(parameters)
    setParameters({
      ...parameters,
      [field.weatherDataId]: event.target.value
    });
  };

  const handleAutoFill = () => {
    // Логика автоматического сбора метеоданных
    alert('Автоматический сбор метеоданных');
  };

  const handleForecast = () => {
    console.log(complexIndex)
    console.log(previousIndex)
    console.log(date)
    console.log(meteoData.length === 0)
    // if (!complexIndex || !previousIndex || !date || meteoData.length === 0) {
    //   setError('Необходимо заполнить все поля для построения прогноза');
    //   return;
    // }

    // console.log(parameters['01b4a98b-255f-4777-b765-a7d093a1b1d5'])

    axios.post('api/v1/app-endpoints/forecast', {
      ffwiId: complexIndex.ffwiId,
      previousComplexIndicator: previousIndex,
      weatherDataParams: meteoData.map(data => {
        const value = parameters[data.weatherDataId]

        return {weatherDataId: data.weatherDataId, value: value}
      })
    }).then((resp) => {
      console.log(resp)
      setMessages(resp.data)
      setIsFinished(true)
    })
        .catch((error) => console.log(error))

    // Логика определения уровня угрозы и перехода на Forecast.js
    // ;
  };

  if (isFinished) {
    navigate('/forecast', { state: { messages } })
  }

  const onTableChange = (e) => {
    const newComplexIndex = complexIndexes.find(index => index.ffwiId === e.target.value)
    setComplexIndex({...newComplexIndex});
    setPreviousIndex(newComplexIndex.previousComplexIndicator)
    setDate(newComplexIndex.previousComplexDate)
    console.log(newComplexIndex.previousComplexDate)
    setMeteoData(newComplexIndex.weatherDataParams)
  }

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="task-solver-container">
          <div className="task-solver-header">
            <label>КППО</label>
            <select value={complexIndex} onChange={onTableChange}>
              <option value={complexIndex.ffwiId}>{complexIndex.ffwiName}</option>
              {
                complexIndexes
                    .filter((index) => index.ffwiId !== complexIndex.ffwiId)
                    .map((complexIndex) => (
                    <option key={complexIndex.ffwiId} value={complexIndex.ffwiId}>{complexIndex.ffwiName}</option>
                ))
              }
            </select>
          </div>
          <div className="task-solver-subheader">
            <label>Предыдущий КП</label>
            <input
              type="text"
              value={previousIndex}
              onChange={(e) => setPreviousIndex(e.target.value)}
              placeholder="Введите предыдущий КП"
            />
            <label>Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <table className="task-solver-table">
            <thead>
              <tr>
                <th>Метеоданные</th>
                <th>Параметры</th>
              </tr>
            </thead>
            <tbody>
              {meteoData.map((data, index) => (
                <tr key={index}>
                  <td>{data.weatherName}</td>
                  <td>
                    <input
                      type="text"
                      key={data.weatherDataId}
                      value={parameters[data.weatherDataId] || ''}
                      onChange={(e) => handleInputChange(e, data)}
                      placeholder={`Введите значение`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="task-solver-buttons">
            <button onClick={handleAutoFill}>Автоматический сбор метеоданных</button>
            <button onClick={handleForecast}>Определить уровень угрозы</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSolver;
