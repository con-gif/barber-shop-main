import React, { useEffect } from 'react'; // Correctly import useEffect from react
import { useDispatch } from 'react-redux'; // Ensure useDispatch is imported from react-redux
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BarberShopList from './components/BarberShopList';
import ReservationForm from './components/ReservationForm';
import Login from './components/Login';
import Registration from './components/Registration';
import BarbershopDetails from './components/BarbershopDetails';
import Adminpanel from './components/AdminPanel/Adminpanel';
import ProfessionalSelection from './components/ProfessionalSelection';
import TimeSelection from './components/TimeSelection';
import Logout from './components/LogOut';
import Profile from './components/Profile';
import { login } from './features/auth/authslice';
import './App.css';

// The app component is the main component of the app. It contains all the routes and the logo

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