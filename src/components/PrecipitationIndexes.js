// src/components/PrecipitationIndexes.js
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './PrecipitationIndexes.css';
import {useAxios} from "./AxiosComponent";

const PrecipitationIndexes = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({ min: '', max: '', reset: '', index: '' , id: ''});
  const [selectedFFWI, setSelectedFFWI] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ffwiIdList, setffwiIdList] = useState([
    {
      id: null,
      name: 'Нет никаких КППО'
    }
  ]);
  const rowsPerPage = 10;
  const axios = useAxios('http://localhost:8080');

  const mapToModel = (dto) => {
    const result = {
      id: dto.id,
      min: Number(dto.minValue) >= Number("9999999999.99") ? "∞" : dto['minValue'],
      max: Number(dto.maxValue) >= Number("9999999999.99") ? "∞" : dto['maxValue'],
      reset: dto.value,
      index: dto.ffwiName
    }
    return result
  }

  useEffect(() => {
      if (!axios) return;
      axios.get('/api/v1/precipitation-records')
          .then((response) => {
            const datas = response.data.map(dto => mapToModel(dto))
            setData(datas)
          })
          .catch((err) => console.log(err))
      axios.get('/api/v1/fire-forecast-indexes')
          .then((resp) => {
            var converted = resp.data.map(value => {
              var obj = {id: value.id, name: value.name}

              return obj
            });
            setffwiIdList(converted)
          })
          .catch((err) => console.log(err))

  }, [axios]);

  const handleInputChange = (e, key) => {
    console.log(e.target.value);
    setNewRow({ ...newRow, [key]: e.target.value });
  };

  const handleAddRow = () => {
    if (!newRow.min || !newRow.max || !newRow.reset || !selectedFFWI) {
      setError('Все поля должны быть заполнены');
      return;
    }
    axios.post('/api/v1/precipitation-records', {
      minValue: newRow.min,
      maxValue: newRow.max,
      value: newRow.reset,
      ffwi_id: selectedFFWI
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => {
      const ffwiName = ffwiIdList.find(ffwi => ffwi.id === resp.data.ffwId).name
      const row = {min: resp.data.minValue, max: resp.data.maxValue, reset: resp.data.value, index: ffwiName};
      setData([...data, row])
      setNewRow({ min: '', max: '', reset: '', index: '' });
      setError('')
    })
        .catch((err) => console.log(err))
  };

  const handleDeleteRow = (index) => {
    const removable = data.find((_, i) => i === index)
    console.log('removable', removable)
    axios.delete('/api/v1/precipitation-records/' + removable.id)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
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

  const handleSelectChange = (e) => {
    console.log(e.target.value)
    setSelectedFFWI(e.target.value)
  }

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
                  <select value={selectedFFWI} style={{width: '100%'}} onChange={handleSelectChange}>
                    {ffwiIdList.length === 0 &&
                        <option key={null} value="">Не было создано ни одного КППО</option>
                    }
                    {ffwiIdList.length !== 0 &&
                      ffwiIdList.map(ffwi => (
                          <option key={ffwi.id} value={ffwi.id}>{ffwi.name}</option>
                      ))
                    }
                  </select>
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
