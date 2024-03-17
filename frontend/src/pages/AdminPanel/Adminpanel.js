import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import InsertBarbershop from './InsertBarbershop';
import AdminBookings from './AdminBookings';
import TeamManagement from './TeamManagement'; // Assume this is your new component
import CatalogueManagement from './CatalogueManagement'; // Assume this is your new component for catalogue management

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        <li><Link to="insert-barbershop">Insert Barbershop</Link></li>
        <li><Link to="admin-bookings">Admin Bookings</Link></li>
        <li><Link to="team-management">Team Management</Link></li>
        <li><Link to="catalogue-management">Catalogue Management</Link></li>
      </ul>

      <Routes>
        <Route path="insert-barbershop" element={<InsertBarbershop />} />
        <Route path="admin-bookings" element={<AdminBookings />} />
        <Route path="team-management" element={<TeamManagement />} />
        <Route path="catalogue-management" element={<CatalogueManagement />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
