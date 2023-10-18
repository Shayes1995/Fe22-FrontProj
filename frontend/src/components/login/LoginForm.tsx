import React, { useState } from 'react';
import loginLogo from '../img/imgLogin/login-studystaylogo.png';
import './LoginForm.css';
import { useAuth } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });



  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch('http://localhost:9998/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Token:', data.token);
        setToken(data.token);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="div-main-container-login">

      <div className="login-hero">

      </div>
      <div className='login-container'>
        <div className="login-container-form">
          <div className="header-login-text">
            <h1>Mina Sidor</h1>
            <p>Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö. På Mina Sidor kan du enkelt hantera allt som rör ditt boende, se din köpoäng och uppdatera dina personliga uppgifter. Om du har några funderingar eller behöver assistans, tveka inte att kontakta vår kundservice. Välkommen att utforska alla de funktioner och tjänster som erbjuds för att göra ditt boende ännu bekvämare.</p>
          </div>
          <div className="loginLogo">
            <img src={loginLogo} alt="loginLogo" />
          </div>
          <p>Vänligen fyll i fälten nedan</p>
          <div className="form-parent">
            <form className='form-login' onSubmit={handleSubmit}>
              <div className="login-group">
                <input className='login-input' name="email" type="email" placeholder='E-mail' value={credentials.email} onChange={handleChange} />
              </div>
              <div className="login-group">
                <input className='login-input' name="password" type="password" placeholder='Lösenord' value={credentials.password} onChange={handleChange} />
                <p>Glömt lösenord?</p>
              </div>
              <button className='login-page-btn' type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginForm