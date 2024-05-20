import React, { useEffect, useState } from 'react';
import './style.css';
import { getUserLocalStorage } from '../../context/AuthProvider/util';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect (() => {
    const user = getUserLocalStorage();
    const access_token = user.token;

    auth.getProfile(access_token)
    .then((resp) => {
      setData(resp)
    })
    .catch()
  }, [])

  function handleLogout () {
    auth.logout();

    navigate("/");
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="profile-card">
        <label className="profile-picture-text">Profile Picture</label>
        <img src={data.avatar} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <label>Your <b>Name</b></label>
          <input type="text" value={data.name} readOnly />
          <label>Your <b>E-mail</b></label>
          <input type="email" value={data.email} readOnly />
          <label></label>
        </div>
      </div>
    </div>
  );
};
