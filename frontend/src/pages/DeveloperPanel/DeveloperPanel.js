// src/pages/DeveloperPanel/DeveloperPanel.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import DeveloperUsers from './DeveloperUsers';
import DeveloperAdmins from './DeveloperAdmins';
import DeveloperBarbershops from './DeveloperBarbershops';
import '../../styles/DeveloperPanel.css';

const DeveloperPanel = () => {
  return (
    <div className="developer-panel">
      <div className="side-ribbon">
        <ul>
          <li>
            <Link to="/developer-panel/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/developer-panel/admins">Manage Admins</Link>
          </li>
          <li>
            <Link to="/developer-panel/barbershops">Manage Barbershops</Link>
          </li>
          {/* Add more developer functions here */}
          <li>
            <Link to="/developer-panel/placeholder1">Placeholder Function 1</Link>
          </li>
          <li>
            <Link to="/developer-panel/placeholder2">Placeholder Function 2</Link>
          </li>
        </ul>
      </div>
      <div className="content-area">
        <Routes>
          <Route path="/users" element={<DeveloperUsers />} />
          <Route path="/admins" element={<DeveloperAdmins />} />
          <Route path="/barbershops" element={<DeveloperBarbershops />} />
          {/* Add more routes for other developer functions */}
        </Routes>
      </div>
    </div>
  );
};

export default DeveloperPanel;