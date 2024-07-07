// src/components/ComplexIndex.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './ComplexIndex.css';
import {ComplexIndexModel} from "../model/ComplexIndexModel";
import {useAxios} from "./AxiosComponent";

const ComplexIndex = () => {
  const [selectedIndex, setSelectedIndex] = useState('');
  const [models, setModels] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formula, setFormula] = useState('');
  const [meteoData, setMeteoData] = useState([]);
  const [thresholdData, setThresholdData] = useState([]);
  const navigate = useNavigate();
  const PATH = '/api/v1/fire-forecast-indexes'

  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
    if (!axios) return;
    axios.get(PATH)
        .then((resp) => {
          const complexIndexModels = resp.data.map(value => ComplexIndexModel.fromResponse(value))
          const indexes = complexIndexModels.map((model) => model.toMainIndex())
          setIndexes(indexes);
          setModels(complexIndexModels)
          console.log(resp.data)
        })
        .catch((err) => console.log(err));
  }, [axios]);

  const handleSelectChange = (e) => {
    const complexId = e.target.value
    const model = models.find((model) => model.id === complexId)
    const params = model.getParamsToView()
    const thresholdData = model.getPrecipitationRecordsToView()
    const classes = model.fwis.split(',')
    setFormula(model.formula)
    setMeteoData(params)
    setThresholdData(thresholdData)
    setClasses(classes)
    setSelectedIndex(e.target.value);
  };

  const handleDelete = () => {
    // Здесь должен быть код для удаления выбранного показателя из базы данных
    setSelectedIndex('');
  };

  const handleAdd = () => {
    navigate('/add-kppo-1');
  };

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="complex-index-container">
          <h1>Просмотр комплексного показателя пожарной опасности</h1>
          <div className="controls">
            <label>
              Комплексный показатель:
              <select value={selectedIndex} onChange={handleSelectChange}>
                <option value="">Выберите показатель</option>
                {indexes.map(index => (
                  <option key={index.id} value={index.id}>{index.name}</option>
                ))}
              </select>
            </label>
            <button onClick={handleDelete} disabled={!selectedIndex}>Удалить</button>
            <button onClick={handleAdd}>Добавить</button>
          </div>
          {selectedIndex && (
            <div className="index-details">
              <p><strong>Классы опасности:</strong> {classes.join(', ')}</p>
              <p><strong>Формула:</strong> {formula}</p>
              <div className="tables">
                <div className="table-container">
                  <h2>Метеоданные</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Метеоданные</th>
                        <th>Параметры</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meteoData.length > 0 ? meteoData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.name}</td>
                          <td>{data.parameter}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="2">No content in table</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="table-container">
                  <h2>Порог сброса</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Диапазон горимости</th>
                        <th>Количество осадков</th>
                      </tr>
                    </thead>
                    <tbody>
                      {thresholdData.length > 0 ? thresholdData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.range}</td>
                          <td>{data.precipitation}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="2">No content in table</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplexIndex;
