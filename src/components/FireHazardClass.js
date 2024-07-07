// src/components/FireHazardClass.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './FireHazardClass.css';
import {useAxios} from "./AxiosComponent";

const FireHazardClass = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Нестерова I(H)',
      lowerBound: '0.0',
      upperBound: '300.0',
      threatLevel: 'Отсутствует',
    },
    // Добавить другие классы
  ]);
  const axios = useAxios('http://localhost:8080');

  const convertDto = (dto) => {
    const result = {
      id: dto['id'],
      name: dto['name'],
      lowerBound: Number(dto['minValue']) >= Number("9999999999.99") ? "∞" : dto['minValue'],
      upperBound: dto['maxValue'] >= Number("9999999999.99") ? "∞" : dto['maxValue'],
      threatLevel: dto['fireDangerName'],
    }

    return result
  }

  useEffect(() => {
    if (!axios) return;

    axios.get('/api/v1/fire-weather-indexes')
        .then((response) => {
          const convertResult = response.data.map(dto => convertDto(dto))
          setClasses(convertResult)
        })
        .catch((err) => {console.log(err)})
  }, [axios])
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDelete = () => {
    const selectedClassInfo = classes.find(cls => cls.name === selectedClass);
    console.log(selectedClassInfo)
    axios.delete(`/api/v1/fire-weather-indexes/${selectedClassInfo.id}`)
        .then((resp) => {
          console.log('Успешное удаление')
          setClasses(classes.filter(cls => cls.id !== selectedClassInfo.id))
        })
        .catch((err) => {console.log(err)})
  };

  const selectedClassInfo = classes.find(cls => cls.name === selectedClass);

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="fhc-container">
          <h1 className="fhc-title">Просмотр пожарной опасности</h1>
          <div className="fhc-controls">
            <select value={selectedClass} onChange={handleSelectChange}>
              <option value="">Выберите класс</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
              <option value="add">Добавить</option>
            </select>
            <button onClick={handleDelete} disabled={!selectedClass || selectedClass === 'add'}>Удалить</button>
          </div>
          {selectedClass === 'add' ? (
            navigate('/create-fh-class')
          ) : (
            selectedClassInfo && (
              <table className="fhc-table">
                <thead>
                  <tr>
                    <th>Комплексный показатель пожарной опасности</th>
                    <th>КППО {selectedClassInfo.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Нижняя граница</td>
                    <td>{selectedClassInfo.lowerBound}</td>
                  </tr>
                  <tr>
                    <td>Верхняя граница</td>
                    <td>{selectedClassInfo.upperBound}</td>
                  </tr>
                  <tr>
                    <td>Уровень пожарной угрозы</td>
                    <td>{selectedClassInfo.threatLevel}</td>
                  </tr>
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FireHazardClass;
