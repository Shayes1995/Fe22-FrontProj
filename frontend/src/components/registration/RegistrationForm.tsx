import React from 'react'
import { Users } from '../../typescriptHelpers/users'
import { useState, useEffect } from 'react'
import studystaylogo from '../img/imgRegister/studystaylogo.png'
import './RegistrationForm.css'

const RegistrationForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [registerData, setRegisterData] = useState<Users>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9998/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('There was an error processing your request.');
    }
  }


  return (
    <div className="div-main-container-register">

      <div className="register-hero">

      </div>
      <div className='register-container'>
        <div className="register-container-form">
          <div className="header-register-text">
            <h1>Mina Sidor</h1>
            <p>Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö. På Mina Sidor kan du enkelt hantera allt som rör ditt boende, se din köpoäng och uppdatera dina personliga uppgifter. Om du har några funderingar eller behöver assistans, tveka inte att kontakta vår kundservice. Välkommen att utforska alla de funktioner och tjänster som erbjuds för att göra ditt boende ännu bekvämare.</p>
          </div>
          <div className="registerLogo">
            <img src={studystaylogo} alt="registerLogo" />
          </div>
          <p>Vänligen fyll i fälten nedan</p>
          <div className="form-parent-register">
            <form onSubmit={handleSubmit} className='form-register' action="">
              <div className="register-group">
                <input className='register-input' name='firstName' type="text" placeholder='Förnamn' value={registerData.firstName} onChange={handleChange} />
                <input className='register-input' name='lastName' type="text" placeholder='Efternamn' value={registerData.lastName} onChange={handleChange} />
                <input className='register-input' name='email' type="email" placeholder='E-mejl' value={registerData.email} onChange={handleChange} />
              </div>
              <div className="register-group">
                <input className='register-input' name='password' type="password" placeholder='Lösenord' value={registerData.password} onChange={handleChange} />
                <input className='register-input' name='repeatPassword' type="password" placeholder='Verifiera lösenord' value={registerData.repeatPassword} onChange={handleChange} />
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="" ></input>
                  <p>Jag godkänner villkoren</p>
                </div>
              </div>
              <button className='register-page-btn'>Register</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegistrationForm




