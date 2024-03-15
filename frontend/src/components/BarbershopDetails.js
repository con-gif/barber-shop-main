import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BarbershopDetails = () => {
  const { id } = useParams();
  const [barbershop, setBarbershop] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarbershopDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/barbershops/${id}`);
        setBarbershop(response.data);
      } catch (error) {
        console.error('Error fetching barbershop details:', error);
      }
    };

    fetchBarbershopDetails();
  }, [id]);

  const handleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleContinue = () => {
    navigate(`/barbershops/${id}/professionals`, { state: { selectedServices } });
  };

  if (!barbershop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{barbershop.name}</h2>
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