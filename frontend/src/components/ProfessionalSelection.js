import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ProfessionalSelection = () => {
  const { id } = useParams();
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/barbershops/${id}/professionals`);
        setProfessionals(response.data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, [id]);

  const handleProfessionalSelection = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    navigate(`/barbershops/${id}/time`, {
      state: { selectedServices, selectedProfessional },
    });
  };

  return (
    <div>
      <h2>Select a Professional</h2>
      <ul>
        {professionals.map((professional, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                checked={selectedProfessional === professional}
                onChange={() => handleProfessionalSelection(professional)}
              />
              {professional}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleContinue} disabled={!selectedProfessional}>
        Continue
      </button>
    </div>
  );
};

export default ProfessionalSelection;