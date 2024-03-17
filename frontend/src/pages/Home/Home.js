import React, { useState } from 'react';
import '../../styles/Home.css';

const Home = () => {
  const [location, setLocation] = useState('');

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          // You might want to convert coords into a human-readable address
        },
        () => {
          alert('Location access denied.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="home-container">
      <h1>Book local beauty and wellness services</h1>
      <div className="search-card"> {/* This was previously search-section */}
      <input type="text" className="form-control" placeholder="Any treatment or venue" />
        <button className="btn btn-primary animated-button" onClick={handleLocation}>Current location</button>
        <input type="date" className="form-control" />
        <input type="time" className="form-control" />
        <button className="btn btn-primary">Search</button>
      </div>
      <div className="booking-stats animate__animated animate__fadeInUp">
        <p>331,772 appointments booked today</p>
      </div>
    </div>
  );
};

export default Home;
