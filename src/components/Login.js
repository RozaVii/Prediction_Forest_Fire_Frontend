import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../images/logo-2.png';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {    ///maybe the problem is in the "email" and to used "username'
      setError('Введите логин и пароль');
      return;
    }

    try {
      const response = await axios.post('http://45.12.236.235:20010/login', {
        email,
        password
      });

      if (response.data.success) {
        props.onLogin({ email, password });
        navigate('/info'); // Перенаправление на страницу Info после успешного входа
        console.log('Успешно зашли');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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



//    if (!email || !password) {
//      setError('Введите логин и пароль');
//    } else if (email !== 'admin' || password !== 'password') { // Замените на реальную проверку
//      setError('Неверный логин или пароль');
//    } else {
//      props.onLogin({ email, password });
//      navigate('/info'); // Перенаправление на страницу Info после успешного входа
//    }
//  };
export default Login;
