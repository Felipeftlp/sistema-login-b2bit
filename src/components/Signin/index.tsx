import React, { useState } from 'react';
import './style.css'
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

export const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault();
    try {
        await auth.authenticate(email, password);        
    
        navigate("/profile");
    } catch (error) {
        setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="@gmail.com" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="****************"
            required 
          />
          <label className="label-error">{error}</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
};
