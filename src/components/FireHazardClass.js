// src/components/FireHazardClass.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './FireHazardClass.css';

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
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDelete = () => {
    setClasses(classes.filter(cls => cls.name !== selectedClass));
    setSelectedClass('');
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
