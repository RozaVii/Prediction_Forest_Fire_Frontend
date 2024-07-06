// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/meteorological-data" activeClassName="active-link">Метеоданные</NavLink>
          </li>
          <li>
            <NavLink to="/fire-hazard-class" activeClassName="active-link">Класс пожарной опасности</NavLink>
          </li>
          <li>
            <NavLink to="/complex-index" activeClassName="active-link">Комплексные показатели</NavLink>
          </li>
          <li>
            <NavLink to="/precipitation-indexes" activeClassName="active-link">Осадки с индексами</NavLink>
          </li>
        </ul>
        <div class="settings">
            <h3>Настройки</h3>
                <ul>
                  <li>
                    <NavLink to="/database-cleanup" activeClassName="active-link">Очистить базу</NavLink>
                  </li>
                  <li>
                    <NavLink to="/task-solver" activeClassName="active-link">Решатель задач</NavLink>
                  </li>
                  <li>
                    <NavLink to="/database-check" activeClassName="active-link">Проверить на полноту</NavLink>
                  </li>
                </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

