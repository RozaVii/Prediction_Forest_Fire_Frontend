// src/components/PrecipitationIndexes.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './PrecipitationIndexes.css';

const PrecipitationIndexes = () => {
  const [data, setData] = useState([
    { min: '0.0', max: '1.0E7', reset: '3', index: 'КППО Нестерова' },
    // Добавьть дополнительные данные, если необходимо
  ]);

  const [newRow, setNewRow] = useState({ min: '', max: '', reset: '', index: '' });
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleInputChange = (e, key) => {
    setNewRow({ ...newRow, [key]: e.target.value });
  };

  const handleAddRow = () => {
    if (!newRow.min || !newRow.max || !newRow.reset || !newRow.index) {
      setError('Все поля должны быть заполнены');
      return;
    }

    setData([...data, newRow]);
    setNewRow({ min: '', max: '', reset: '', index: '' });
    setError('');
  };

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const displayedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="info-container">
      <Header />
      <div className="info-content">
        <Sidebar />
        <div className="precipitation-container">
          <h1 className="precipitation-title">Осадки</h1>
          <table className="precipitation-table">
            <thead>
              <tr>
                <th>Мин. значение</th>
                <th>Макс. значение</th>
                <th>Значение сброса</th>
                <th>КППО</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.min}</td>
                  <td>{row.max}</td>
                  <td>{row.reset}</td>
                  <td>{row.index}</td>
                  <td>
                    <button onClick={() => handleDeleteRow(index + (currentPage - 1) * rowsPerPage)}>-</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    value={newRow.min}
                    onChange={(e) => handleInputChange(e, 'min')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newRow.max}
                    onChange={(e) => handleInputChange(e, 'max')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newRow.reset}
                    onChange={(e) => handleInputChange(e, 'reset')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newRow.index}
                    onChange={(e) => handleInputChange(e, 'index')}
                  />
                </td>
                <td>
                  <button onClick={handleAddRow}>+</button>
                </td>
              </tr>
            </tbody>
          </table>
          {error && <p className="error">{error}</p>}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <span>Страница {currentPage}</span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage * rowsPerPage >= data.length}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrecipitationIndexes;
