import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import InsertBarbershop from './InsertBarbershop';
import AdminBookings from './AdminBookings';
const Adminpanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        <li>
          <Link to="insert-barbershop">Insert Barbershop</Link>
        </li>
        {/* Add more admin functions here */}
        <li>
          <Link to="admin-bookings">Admin Bookings</Link>
        </li>
        <li>
          <Link to="placeholder2">Placeholder Function 2</Link>
        </li>
      </ul>

      {/* Render the appropriate component based on the route */}
      <Routes>
        <Route path="insert-barbershop" element={<InsertBarbershop />} />
        <Route path="admin-bookings" element={<AdminBookings />} />
      </Routes>
    </div>
  );
};

export default Adminpanel;