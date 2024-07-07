import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Forecast.css';

const Forecast = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    complexIndex,
    previousIndex,
    date,
    parameters
  } = state || {};

  // Пример данных для отчета
  const reportData = {
    date: date,
    temperature: parameters['Температура'] || '',
    dewPoint: parameters['Температура точки росы'] || '',
    dailyPrecipitation: parameters['Суточные осадки'] || '',
    formula: '($T_d - $T_0) * $T_d',
    formulaValue: 54,
    precipitationCoefficient: 0,
    currentKP: 554,
    classes: [
      { name: 'I(H)', range: [0, 300] },
      { name: 'V(H)', range: [10001, Infinity] },
      { name: 'III(H)', range: [1001, 4000] },
      { name: 'IV(H)', range: [4001, 10000] },
      { name: 'II(H)', range: [301, 1000] }
    ],
    threatLevel: 'Малая'
  };

  const getClassEvaluation = () => {
    return reportData.classes.map((cls, index) => {
      if (reportData.currentKP >= cls.range[0] && reportData.currentKP <= cls.range[1]) {
        return (
          <div key={index}>Класс {cls.name} подходит т.к. значение КП {reportData.currentKP} находится в границах класса [{cls.range[0]}, {cls.range[1]}]</div>
        );
      } else {
        return (
          <div key={index}>Класс {cls.name} не подходит т.к. значение КП {reportData.currentKP} не находится в границах класса [{cls.range[0]}, {cls.range[1]}]</div>
        );
      }
    });
  };

  const handleSaveReport = () => {
    const reportText = `
      1. Дата построения отчета: ${reportData.date}
      2. Температура воздуха: ${reportData.temperature}
      3. Температура точки росы: ${reportData.dewPoint}
      4. Суточные осадки: ${reportData.dailyPrecipitation}
      5. Формула вычисления: ${reportData.formula}
      6. Значение по формуле: ${reportData.formulaValue}
      7. Коэффициент осадков = ${reportData.precipitationCoefficient} т.к. дневные осадки ${reportData.dailyPrecipitation} меньше максимальных осадков 3
      8. Текущий КП: ${reportData.currentKP}
      ${getClassEvaluation().map(cls => cls.props.children).join('\n')}
      14. Текущий уровень угрозы: ${reportData.threatLevel}
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `forecast_${reportData.date}.txt`;
    link.click();
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="forecast-container">
          <h1>Отчет по прогнозу</h1>
          <div>
            <div>1. Дата построения отчета: {reportData.date}</div>
            <div>2. Температура воздуха: {reportData.temperature}</div>
            <div>3. Температура точки росы: {reportData.dewPoint}</div>
            <div>4. Суточные осадки: {reportData.dailyPrecipitation}</div>
            <div>5. Формула вычисления: {reportData.formula}</div>
            <div>6. Значение по формуле: {reportData.formulaValue}</div>
            <div>7. Коэффициент осадков = {reportData.precipitationCoefficient} т.к. дневные осадки {reportData.dailyPrecipitation} меньше максимальных осадков 3</div>
            <div>8. Текущий КП: {reportData.currentKP}</div>
            {getClassEvaluation()}
            <div>14. Текущий уровень угрозы: {reportData.threatLevel}</div>
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
