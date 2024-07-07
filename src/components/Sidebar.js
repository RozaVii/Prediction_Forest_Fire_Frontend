import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/meteorological-data" className={({ isActive }) => isActive ? "active-link" : ""}>Метеоданные</NavLink>
          </li>
          <li>
            <NavLink to="/fire-hazard-class" className={({ isActive }) => isActive ? "active-link" : ""}>Класс пожарной опасности</NavLink>
          </li>
          <li>
            <NavLink to="/complex-index" className={({ isActive }) => isActive ? "active-link" : ""}>Комплексные показатели</NavLink>
          </li>
          <li>
            <NavLink to="/precipitation-indexes" className={({ isActive }) => isActive ? "active-link" : ""}>Осадки с индексами</NavLink>
          </li>
        </ul>
        <div className="settings">
          <h3>Настройки</h3>
          <ul>
            <li>
              <NavLink to="/database-cleanup" className={({ isActive }) => isActive ? "active-link" : ""}>Очистить базу</NavLink>
            </li>
            <li>
              <NavLink to="/task-solver" className={({ isActive }) => isActive ? "active-link" : ""}>Решатель задач</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;


