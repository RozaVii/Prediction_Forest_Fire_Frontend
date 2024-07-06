import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../images/logo-2.png';
import axios from 'axios'


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleSubmit = (e) => {
      e.preventDefault();
        axios.get('http://45.12.236.235:20010/api/v1/weather-data', {
          headers: {
            "Authorizaton": "Basic dGN2ZXRrb3Yuc286MTIzMzIx"
          }
        }).then((resp) => console.log(resp))
          .catch((err) => console.log(err))





//      fetch('http://45.12.236.235:20010/login', {
//         method: 'POST',
//         body: new URLSearchParams({
//           'username' : 'tcvetkov.so',
//           'password' : '123321'
//         }),
//         headers: {
//            'Content-type': 'application/x-www-form-urlencoded',
//         },
//      })
//         .then(console.log('Успешно зашли'))
//         .catch((err) => {
//            console.log(err.message);
//         });
   };




//    if (!email || !password) {
//      setError('Введите логин и пароль');
//    } else if (email !== 'admin' || password !== 'password') { // Замените на реальную проверку
//      setError('Неверный логин или пароль');
//    } else {
//      props.onLogin({ email, password });
//      navigate('/info'); // Перенаправление на страницу Info после успешного входа
//    }
//  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Prediction Forest Fire</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Вход</h2>
        <button type="button" className="register-link" onClick={() => props.onFormSwitch('register')}>
          Вы ещё не зарегистрированы?
        </button>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="email@domain.com / login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Вход</button>
        <div className="terms">
          Нажав вход, вы соглашаетесь с нашими <a href="#">Условиями <br /> предоставления услуг</a> и <a href="#">Политикой конфиденциальности</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
