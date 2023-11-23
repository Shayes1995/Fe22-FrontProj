import React from 'react'
import { Users } from '../../typescriptHelpers/users'
import { useState, useEffect } from 'react'
import studystaylogo from '../img/imgRegister/studystaylogo.png'
import './RegistrationForm.css'
import { useNavigate, NavLink } from 'react-router-dom'
import LoadSpinner from '../loader/LoadSpinner'

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false)
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    isCheckboxClicked: ''
  })

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const [registerData, setRegisterData] = useState<Users>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxClicked(e.target.checked);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noNumberRegex = /^[a-zA-Z]+$/;

    const newErrors = {
      firstName: !firstName ? 'Vänligen fyll i ditt förnamn' :
        firstName.length < 2 ? 'Förnamnet måste vara minst 2 tecken' :
          !noNumberRegex.test(firstName) ? 'Förnamnet får inte innehålla siffror' : '',
      lastName: !lastName ? 'Vänligen fyll i ditt efternamn' :
        lastName.length < 3 ? 'Efternamnet måste vara minst 2 tecken' :
          !noNumberRegex.test(lastName) ? 'Efternamnet får inte innehålla siffror' : '',
      email: !email ? 'Vänligen fyll i din email' :
        !email.includes('@') ? 'Vänligen fyll i en giltig email' : '',
      password: !password ? 'Vänligen fyll i ett lösenord' :
        password.length < 6 ? 'Lösenordet måste vara minst 6 tecken' : '',
      repeatPassword: !repeatPassword ? 'Vänligen fyll i ditt lösenord igen' :
        repeatPassword !== password ? 'Lösenorden matchar inte' : '',
      isCheckboxClicked: !isCheckboxClicked ? 'Du måste godkänna villkoren' : ''
    }
    setErrors(newErrors);

    if (newErrors.firstName && newErrors.lastName && newErrors.email && newErrors.password && newErrors.repeatPassword && newErrors.isCheckboxClicked) {
      console.log('form is not valid')
      return;
    } else {
      console.log('form is valid')
    }


    try {
      const response = await fetch('http://localhost:9998/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) {
        console.log(response)
        throw new Error(`Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log('User created:', userData);
      navigate('/login')

    } catch (error) {
      console.error('Error during fetch:', error);

    }
  }

  if (isLoading) {
    return <LoadSpinner />
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
                    <input className='checkbox-register' type="checkbox" name="" id="" onChange={handleCheckboxChange} ></input>
                    <p>Jag godkänner villkoren</p>
                  </div>
                </div>
              </div>
              <button className='register-page-btn'>Registrera</button>
              {errors.firstName && <p className="error-message">*{errors.firstName}*</p>}
              {errors.lastName && <p className="error-message">*{errors.lastName}*</p>}
              {errors.email && <p className="error-message">*{errors.email}*</p>}
              {errors.password && <p className="error-message">*{errors.password}*</p>}
              {errors.repeatPassword && <p className="error-message">*{errors.repeatPassword}*</p>}
              {errors.isCheckboxClicked && <p className="error-message">*{errors.isCheckboxClicked}*</p>}
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




