// EcommerceCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EcommerceProps {
  ecommerce: {
    id: string; // Certifique-se de que o ID do e-commerce está incluído
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
    profileImage: string;
  };
}

const EcommerceCard: React.FC<EcommerceProps> = ({ ecommerce }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/perfil/${ecommerce.id}`);
  };

  return (
    <div className="card">
      <img src={ecommerce.profileImage} alt={`${ecommerce.ecommerce_name} logo`} className="profile-image" />
      <h2>{ecommerce.ecommerce_name}</h2>
      <p><strong>Category:</strong> {ecommerce.category}</p>
      <p><strong>Website:</strong> <a href={ecommerce.website} target="_blank" rel="noopener noreferrer">{ecommerce.website}</a></p>
      <p><strong>Province:</strong> {ecommerce.provinceSelect}</p>
      <p><strong>City:</strong> {ecommerce.citySelect}</p>
      <p><strong>Phone:</strong> {ecommerce.phone}</p>
      <p><strong>Email:</strong> {ecommerce.contact_email}</p>
      <p><strong>Legal Representative:</strong> {ecommerce.legal_representative}</p>
      <p><strong>Foundation Date:</strong> {ecommerce.foundation_date}</p>
      <p className={ecommerce.status ? '' : 'suspensa-text'}>{ecommerce.status ? 'Active' : 'Suspended'}</p>
      <button className="button" onClick={handleViewProfile}>View Profile</button>
    </div>
  );
};

export default EcommerceCard;
