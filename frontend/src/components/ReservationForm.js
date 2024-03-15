import React from 'react';

const ReservationForm = () => {
  return (
    <div>
      <h2>Make a Reservation</h2>
      <form>
        <label>
          Barbershop:
          <select>
            <option value="">Select a barbershop</option>
            {/* Add options dynamically */}
          </select>
        </label>
        <label>
          Date:
          <input type="date" />
        </label>
        <label>
          Time:
          <input type="time" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReservationForm;