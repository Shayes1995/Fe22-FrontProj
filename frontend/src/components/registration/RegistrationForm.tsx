import React from 'react'
import { Users } from '../../typescriptHelpers/users'
import { useState } from 'react'
import studystaylogo from '../img/imgRegister/studystaylogo.png'
import './RegistrationForm.css'
import { useNavigate, NavLink } from 'react-router-dom'

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
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

      const userData = await response.json();
      console.log('User created:', userData);
      navigate('/login')

    } catch (error) {
      console.error('Error during fetch:', error);

    }
  }


  return (
    <div className="div-main-container-register">

      <div className="register-hero">

      </div>
      <div className='register-container'>
        <div className="register-container-form">
          <div className="header-register-text">
            <h1>Gå med i vår bostadskö</h1>
            <p>Välkommen till StudyStays bostadskö för lediga studentbostäder. Vår kö är kostnadsfri och du kan ställa dig i kön när du har fyllt 16 år och söka en bostad när du fyllt 18 år. Allt behöver göra är att registrera dig nedan.</p>
          </div>
          <div className="registerLogo">
            <img src={studystaylogo} alt="registerLogo" />
          </div>
          <div className="form-parent-register">
            <div className="for-register-p-tag">
              <p className='register-p-tag'>Registrera dig kostnadsfritt</p>

            </div>
            <form onSubmit={handleSubmit} className='form-register' action="">
              <div className="register-input-container">

                <div className="register-group">
                  <input className='register-input' name='firstName' type="text" placeholder='Förnamn' value={registerData.firstName} onChange={handleChange} />
                  <input className='register-input' name='lastName' type="text" placeholder='Efternamn' value={registerData.lastName} onChange={handleChange} />
                  <input className='register-input' name='email' type="email" placeholder='E-mejl' value={registerData.email} onChange={handleChange} />
                </div>


                <div className="register-group-second">
                  <input className='register-input' name='password' type="password" placeholder='Lösenord' value={registerData.password} onChange={handleChange} />
                  <input className='register-input' name='repeatPassword' type="password" placeholder='Verifiera lösenord' value={registerData.repeatPassword} onChange={handleChange} />
                  <div className="checkbox-group">
                    <input className='checkbox-register' type="checkbox" name="" id="" ></input>
                    <p>Jag godkänner villkoren</p>
                  </div>
                </div>
              </div>
              <button className='register-page-btn'>Register</button>
              <div className="wrapper-extras-login">
                <p className='p-tag-to-register'>Har du redan ett konto?</p>
                <p><NavLink to='/registration' className='to-register-tag-p'>Klicka här</NavLink> för att logga in</p>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegistrationForm




