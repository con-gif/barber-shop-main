import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const serviceOptions = [
  'Haircuts & styling', 'Nail services', 'Eyebrows & lashes', 'Facials & skincare',
  'Injectables & fillers', 'Makeup', 'Barbering', 'Massage', 'Hair extensions',
  'Hair removal', 'Tattoo & piercing', 'Fitness', 'Other'
];

const InsertBarbershop = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    services: [],
    teamSize: '',
    street: '',
    hasNoAddress: false,
  });
  const [error, setError] = useState('');

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleServiceSelection = (service) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      await axios.post('http://localhost:5000/api/barbershops', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Barbershop inserted successfully');
      // Reset form fields and go to the first step
      setFormData({
        name: '',
        website: '',
        services: [],
        teamSize: '',
        street: '',
        hasNoAddress: false,
      });
      setStep(1);
    } catch (error) {
      console.error('Error inserting barbershop:', error.response.data);
      setError('Failed to insert barbershop. Please try again.');
    }
  };

  // Render steps based on the current step state
  return (
    <div>
      <h2>Insert Barbershop</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {step === 1 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Business name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Website (Optional):
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleNextStep}>Next Step</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <p>What services do you offer?</p>
            {serviceOptions.map((service) => (
              <label key={service}>
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceSelection(service)}
                />
                {service}
              </label>
            ))}
          </div>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="button" onClick={handleNextStep}>Next Step</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            What's your team size?
            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              required
            />
          </label>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="button" onClick={handleNextStep}>Next Step</button>
        </form>
      )}

      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <label>
            Business location:
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required={!formData.hasNoAddress}
              disabled={formData.hasNoAddress}
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="hasNoAddress"
              checked={formData.hasNoAddress}
              onChange={handleChange}
            />
            I don't have a business address
          </label>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="submit">Finish</button>
        </form>
      )}
    </div>
  );
};

export default InsertBarbershop;
