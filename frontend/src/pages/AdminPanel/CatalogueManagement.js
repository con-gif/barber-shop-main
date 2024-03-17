import React from 'react';
import { Link } from 'react-router-dom';

const CatalogueManagement = () => {
  return (
    <div>
      <h2>Catalogue Management</h2>
      <ul>
        <li><Link to="services">Services</Link></li>
        <li><Link to="memberships">Memberships</Link></li>
        {/* Add links for other catalogue items */}
      </ul>
      {/* Setup Routes for each catalogue section */}
    </div>
  );
};

export default CatalogueManagement;
