import { useState, useEffect } from 'react';
import loginLogo from '../img/imgLogin/login-studystaylogo.png';
import './LoginForm.css';
import { useAuth } from '../../context/ContextProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import LoaderSpinner from '../loader/LoadSpinner';

const LoginForm = () => {
  const navigate = useNavigate();
  const { token, setToken, setUserInfo } = useAuth(); // Get setUser from context
  const [isLoading, setIsLoading] = useState(true)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

  const [errors, setErrors] = useState({
    emailUser: '',
    passwordUser: ''
  })



  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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


    const newErrors = {
      emailUser: '',
      passwordUser: ''
    };

    // Validate email
    if (!credentials.email) {
      newErrors.emailUser = "Vänligen fyll i din email";
    }

    // Validate password
    if (!credentials.password) {
      newErrors.passwordUser = "Vänligen fyll i ditt lösenord";
    }

    // Update the errors state with newErrors
    setErrors(newErrors);


    if (errors.emailUser || errors.passwordUser) {

      return;
    }
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
        console.log(data)
        setToken(data.token);

        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          id: data.id,
          createdDate: data.createdDate,
        };
        setUserInfo(userData);
        console.log('User Data to be stored:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        const newErrors = {
          emailUser: !emailUser ? "Vänligen fyll i din email" : "",
          passwordUser: !passwordUser ? "Vänligen fyll i ditt lösenord" : ""
        };
        setErrors(newErrors);


        const errorMessage = error.toString();
        if (errorMessage.includes('User not found')) {
          setEmailError('Användaren finns inte');
        } else if (errorMessage.includes('Wrong password')) {
          setPasswordError('Felaktigt lösenord');
        }
      });

  }
  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="div-main-container-login">

      <div className="login-hero">

      </div>
      <div className='login-container'>
        <div className="login-container-form">
          <div className="header-login-text-login">
            <h1>Mina Sidor</h1>
            <div className="p-container-login">
              <p className='header-login-p'>Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö.</p>
            </div>
          </div>
          <div className="loginLogo">
            <img src={loginLogo} alt="loginLogo" />
          </div>
          <p className='login-text-please'>Vänligen fyll i fälten nedan</p>
          <div className="form-parent">
            <form className='form-login' onSubmit={handleSubmit}>
              <div className="wrapper-for-login-group">
                <div className="login-group">
                  <input className='login-input margin-input-login' name="email" type="email" placeholder='E-mail' value={credentials.email} onChange={handleChange} />
                </div>
                <div className="login-group">

                  <input className='login-input' name="password" type="password" placeholder='Lösenord' value={credentials.password} onChange={handleChange} />
                  <p>Glömt lösenord?</p>
                </div>
              </div>
              <div className="wrapper-extras-login">
                {errors.emailUser && <p className="error-message">{errors.emailUser}</p>}
                {errors.passwordUser && <p className="error-message">{errors.passwordUser}</p>}
                {emailError && <p className="error-message">*{emailError}*</p>}
                {passwordError && <p className="error-message">*{passwordError}*</p>}
                <button className='login-page-btn' type="submit">Login</button>
                <p className='p-tag-to-register'>Vill du registrera ett konto?</p>
                <p><NavLink to='/registration' className='to-register-tag-p'>Klicka här</NavLink> för att registrera dig</p>

              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginForm