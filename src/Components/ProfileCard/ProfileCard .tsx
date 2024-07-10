import React from 'react';

interface ProfileCardProps {
  profile: {
    name: string;
    job: string;
    imageUrl: string;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    hearts: string;
    messages: string;
    shares: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="profile-card">
      <div className="image">
        <img src={profile.imageUrl} alt="Profile Image" className="profile-img" />
      </div>

      <div className="text-data">
        <span className="name">{profile.name}</span>
        <span className="job">{profile.job}</span>
      </div>

      <div className="media-buttons">
        {profile.facebookUrl && (
          <a href={profile.facebookUrl} style={{ background: '#4267b2' }} className="link">
            <i className='bx bxl-facebook'></i>
          </a>
        )}
        {profile.twitterUrl && (
          <a href={profile.twitterUrl} style={{ background: '#1da1f2' }} className="link">
            <i className='bx bxl-twitter'></i>
          </a>
        )}
        {profile.instagramUrl && (
          <a href={profile.instagramUrl} style={{ background: '#e1306c' }} className="link">
            <i className='bx bxl-instagram'></i>
          </a>
        )}
        {profile.youtubeUrl && (
          <a href={profile.youtubeUrl} style={{ background: '#ff0000' }} className="link">
            <i className='bx bxl-youtube'></i>
          </a>
        )}
      </div>

      <div className="buttons">
        <button className="button">Subscribe</button>
        <button className="button">Message</button>
      </div>

      <div className="analytics">
        <div className="data">
          <i className='bx bx-heart'></i>
          <span className="number">{profile.hearts}</span>
        </div>
        <div className="data">
          <i className='bx bx-message-rounded'></i>
          <span className="number">{profile.messages}</span>
        </div>
        <div className="data">
          <i className='bx bx-share'></i>
          <span className="number">{profile.shares}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
