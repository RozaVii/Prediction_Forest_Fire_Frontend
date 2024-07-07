// src/components/CreateFHClass.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './CreateFHClass.css';
import {useAxios} from "./AxiosComponent";

const CreateFHClass = () => {
  const [name, setName] = useState('');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [complexIndicators, setComplexIndicators] = useState([]);
  const [threatLevels, setThreatLevels] = useState([]);
  const [threatLevel, setThreatLevel] = useState('');
  const [complexIndicator, setComplexIndicator] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
    if (!axios) return
    axios.get('/api/v1/fire-weather-indexes/dictionary')
        .then((response) => {
            const indicators = response.data.ffwiList.map(ffwi => {
              const res = {ffwiId: ffwi.id, name: ffwi.name};
              return res;
            });
            setComplexIndicators([...indicators]);
            setThreatLevels([...response.data.fireDangerList])
            setComplexIndicator(indicators[0].ffwiId)
            setThreatLevel(response.data.fireDangerList[0].id)
          })
        .catch((err) => console.log(err));

  }, [axios]);

  const handleCreate = () => {
    if (!name || !lowerBound || !upperBound || !threatLevel || !complexIndicator) {
      setError('Все поля должны быть заполнены');
      return;
    }
    // console.log('CREATED')
    axios.post('/api/v1/fire-weather-indexes', {
      name: name,
      minValue: lowerBound === '∞' ? Number.MAX_VALUE : lowerBound,
      maxValue: upperBound === '∞' ? Number.MAX_VALUE : upperBound,
      fireDangerId: threatLevel,
      ffwiId: complexIndicator
    }, {
      headers: {
        'content-type': 'application/json'
      }
    }).then((resp) => navigate('/fire-hazard-class'))
      .catch((err) => setError(err.message));
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
                    {
                      complexIndicators.map(indicator => (
                          <option key={indicator.ffwiId} value={indicator.ffwiId}>{indicator.name}</option>
                      ))
                    }
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
                    {
                      threatLevels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                      ))
                    }
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
