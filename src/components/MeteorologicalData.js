// src/components/MeteorologicalData.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './MeteorologicalData.css';
import {useAxios} from "./AxiosComponent";

const MeteorologicalData = () => {
  const [selectedData, setSelectedData] = useState('');
  const [meteoData, setMeteoData] = useState([
    {
      id: 1,
      name: 'Влажность',
      description: 'Влажность воздуха — это мера содержания водяного пара в атмосфере...',
    },
    // Добавить другие данные по мере необходимости
  ]);
  const axios = useAxios('http://localhost:8080');

  useEffect(() => {
    if (!axios) return;

    axios.get('/api/v1/weather-data')
        .then((response) => {
          setMeteoData(response.data)
          })
        .catch((err) => {console.log(err)})
  }, [axios]);

  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedData(e.target.value);
  };

  const handleDelete = () => {
    setMeteoData(meteoData.filter(data => data.name !== selectedData));
    setSelectedData('');
  };

  const handleEdit = () => {
    navigate('/create-meteo-data', { state: { data: meteoData.find(data => data.name === selectedData) } });
  };

  const selectedInfo = meteoData.find(data => data.name === selectedData);

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="meteo-container">
          <div className="meteo-header">
            <h1>Просмотр метеорологических данных</h1>
          </div>
          <div className="meteo-controls">
            <select value={selectedData} onChange={handleSelectChange}>
              <option value="">Выберите данные</option>
              {meteoData.map(data => (
                <option key={data.id} value={data.name}>{data.name}</option>
              ))}
              <option value="add">Добавить</option>
            </select>
            <button onClick={handleDelete} disabled={!selectedData || selectedData === 'add'}>Удалить</button>
          </div>
          {selectedData === 'add' ? (
            navigate('/create-meteo-data')
          ) : (
            selectedInfo && (
              <div className="meteo-info">
                <h2>{selectedInfo.name}</h2>
                <p>{selectedInfo.description}</p>
                <button onClick={handleEdit}>Изменить</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MeteorologicalData;
