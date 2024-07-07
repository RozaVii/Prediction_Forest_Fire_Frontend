import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskSolver from './components/TaskSolver';
import MeteorologicalData from './components/MeteorologicalData';
import ComplexIndex from './components/ComplexIndex';
import FireHazardClass from './components/FireHazardClass';
import PrecipitationIndexes from './components/PrecipitationIndexes';
import DatabaseCleanup from './components/DatabaseCleanup';
import Registration from './components/Registration';
import Info from './components/Info';
import CreateMeteoData from './components/CreateMeteoData';
import CreateFHClass from './components/CreateFHClass';
import AddKPPO_1 from './components/AddKPPO_1';
import AddKPPO_2 from './components/AddKPPO_2';
import AddKPPO_3 from './components/AddKPPO_3';
import Forecast from './components/Forecast';
import './styles.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setIsLoggedIn(true);
  };

  const handleRegistration = (userData) => {
    console.log('User registered:', userData);
    setIsLoggedIn(true);
    setCurrentForm('info');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/info" />
              ) : (
                currentForm === 'login' ? (
                  <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
                ) : (
                  <Registration onFormSwitch={toggleForm} onRegistration={handleRegistration} />
                )
              )
            }
          />
          <Route path="/info" element={<Info />} />
          <Route path="/meteorological-data" element={<MeteorologicalData />} />
          <Route path="/fire-hazard-class" element={<FireHazardClass />} />
          <Route path="/complex-index" element={<ComplexIndex />} />
          <Route path="/precipitation-indexes" element={<PrecipitationIndexes />} />
          <Route path="/database-cleanup" element={<DatabaseCleanup />} />
          <Route path="/task-solver" element={<TaskSolver />} />
          <Route path="/create-meteo-data" element={<CreateMeteoData />} />
          <Route path="/create-fh-class" element={<CreateFHClass />} />
          <Route path="/add-kppo-1" element={<AddKPPO_1 />} />
          <Route path="/add-kppo-2" element={<AddKPPO_2 />} />
          <Route path="/add-kppo-3" element={<AddKPPO_3 />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
