// EcommerceCard.tsx
import React from 'react';

interface EcommerceProps {
  ecommerce: {
    ecommerce_name: string;
    category: string;
    website: string;
    provinceSelect: string;
    citySelect: string;
    phone: string;
    contact_email: string;
    legal_representative: string;
    foundation_date: string;
    status: boolean;
  };
}

const EcommerceCard: React.FC<EcommerceProps> = ({ ecommerce }) => {
  return (
    <div className="card">
      <h2>{ecommerce.ecommerce_name}</h2>
      <p><strong>Category:</strong> {ecommerce.category}</p>
      <p><strong>Province:</strong> {ecommerce.provinceSelect}</p>
      <p><strong>City:</strong> {ecommerce.citySelect}</p>
      <button className="button">View Profile</button>
    </div>
  );
};

export default EcommerceCard;
