import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './TaskSolver.css';

const TaskSolver = () => {
  const [complexIndex, setComplexIndex] = useState('');
  const [previousIndex, setPreviousIndex] = useState('');
  const [date, setDate] = useState('');
  const [meteoData, setMeteoData] = useState([]);
  const [parameters, setParameters] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (complexIndex) {
    setMeteoData(["Температура", "Влажность"]);
    }
  }, [complexIndex]);

  const handleInputChange = (event, field) => {
    setParameters({
      ...parameters,
      [field]: event.target.value
    });
  };

  const handleAutoFill = () => {
    // Логика автоматического сбора метеоданных
    alert('Автоматический сбор метеоданных');
  };

  const handleForecast = () => {
    if (!complexIndex || !previousIndex || !date || meteoData.length === 0) {
      setError('Необходимо заполнить все поля для построения прогноза');
      return;
    }

    const allFieldsFilled = meteoData.every(data => parameters[data]);

    if (!allFieldsFilled) {
      setError('Необходимо заполнить все поля для построения прогноза');
      return;
    }

    // Логика определения уровня угрозы и перехода на Forecast.js
    navigate('/forecast', { state: { complexIndex, previousIndex, date, parameters } });
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="task-solver-container">
          <div className="task-solver-header">
            <label>КППО</label>
            <select value={complexIndex} onChange={(e) => setComplexIndex(e.target.value)}>
              <option value="">Выберите КППО</option>
              <option value="КППО Нестерова">КППО Нестерова</option>
              {/* Другие опции */}
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
                  <td>{data}</td>
                  <td>
                    <input
                      type="text"
                      value={parameters[data] || ''}
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
