import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Forecast.css';

const Forecast = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSaveReport = () => {
    const reportText = state.messages.map(dto => {
      return `${dto.step} ${dto.message}`
    }).join('\n')

    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forecast_${new Date()}.txt`;
    link.click();
  };
  console.log(state)
  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="forecast-container">
          <h1>Отчет по прогнозу</h1>
          <div>
            {
              state.messages.map(dto => (
                  <div>{dto.step} {dto.message}</div>
              ))
            }
          </div>
          <div className="forecast-buttons">
            <button onClick={() => navigate('/task-solver')}>Вернуться назад</button>
            <button onClick={handleSaveReport}>Сохранить отчет</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
