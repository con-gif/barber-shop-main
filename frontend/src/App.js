import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import BarberShopList from './pages/BarberShopList';
import ReservationForm from './components/ReservationForm';
import Login from './pages/Login/Login';
import Registration from './pages/Registration';
import BarbershopDetails from './pages/BarbershopDetails';
import Adminpanel from './pages/AdminPanel/Adminpanel';
import ProfessionalSelection from './components/ProfessionalSelection';
import TimeSelection from './components/TimeSelection';
import Logout from './components/LogOut';
import Profile from './pages/Profile';
import { login } from './features/auth/authslice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStatus = parseInt(localStorage.getItem('userStatus')) || 0;
    if (token) {
      dispatch(login({ token, userStatus }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barbershops" element={<BarberShopList />} />
          <Route path="/barbershops/:id" element={<BarbershopDetails />} />
          <Route path="/barbershops/:id/professionals" element={<ProfessionalSelection />} />
          <Route path="/barbershops/:id/time" element={<TimeSelection />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/admin/*" element={<Adminpanel />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;