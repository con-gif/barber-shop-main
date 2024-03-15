// src/pages/BarbershopDetails.js

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBarbershop, setSelectedServices } from '../features/barbershop/barbershopSlice';
import { fetchBarbershopDetails } from '../api/barbershopApi';

const BarbershopDetails = () => {
  const { id } = useParams();
  const { selectedBarbershop, selectedServices } = useSelector((state) => state.barbershop);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getBarbershopDetails = async () => {
      try {
        const barbershopDetails = await fetchBarbershopDetails(id);
        dispatch(setSelectedBarbershop(barbershopDetails));
      } catch (error) {
        console.error('Error fetching barbershop details:', error);
      }
    };

    getBarbershopDetails();
  }, [dispatch, id]);

  const handleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      dispatch(setSelectedServices(selectedServices.filter((s) => s !== service)));
    } else {
      dispatch(setSelectedServices([...selectedServices, service]));
    }
  };

  const handleContinue = () => {
    navigate(`/barbershops/${id}/professionals`, { state: { selectedServices } });
  };

  if (!selectedBarbershop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{selectedBarbershop.name}</h2>
      {/* Display other barbershop details */}
      <h3>Services</h3>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedServices.includes('Hair')}
              onChange={() => handleServiceSelection('Hair')}
            />
            Hair
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedServices.includes('Beard')}
              onChange={() => handleServiceSelection('Beard')}
            />
            Beard
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={selectedServices.includes('Barberboba')}
              onChange={() => handleServiceSelection('Barberboba')}
            />
            Barberboba
          </label>
        </li>
      </ul>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default BarbershopDetails;