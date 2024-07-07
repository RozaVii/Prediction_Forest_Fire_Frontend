import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import logo from '../images/logo-2.png';
import {useAxios} from "./AxiosComponent";

const Registration = (props) => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [twoPassword, setTwoPassword] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const axios = useAxios('http://localhost:8080')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !login || !password || !twoPassword || !registrationCode) {
      setError('Все поля должны быть заполнены');
    } else if (login === 'null') { // Замените на реальную проверку
      setError('Логин указан неверно');
    } else if (registrationCode === 'null') { // Замените на реальную проверку
      setError('Код от организации указан неверно');
    } else if (password !== twoPassword) { // Замените на реальную проверку
      setError('Пароли не совпадают');
    } else {
        axios.post('http://localhost:8080/api/v1/users/registration', {
          login: login,
          email: email,
          password: password,
          registrationCode: registrationCode
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((resp) => {
            console.log(resp)
            navigate('/info')
          })
          .catch((err) => setError(err.response.data['message']))
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <img src={logo} alt="Logo" className="register-logo" />
        <h1 className="register-title">Prediction Forest Fire</h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-heading">Регистрация</h2>
        <button type="button" className="authoriz-link" onClick={() => props.onFormSwitch('login')}>
          Вы уже зарегистрированы?
        </button>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="please repeat the password"
          value={twoPassword}
          onChange={(e) => setTwoPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter the code from your organization"
          value={registrationCode}
          onChange={(e) => setRegistrationCode(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
        <div className="terms">
          Нажав зарегистрироваться, вы соглашаетесь с нашими <a href="#">Условиями <br /> предоставления услуг</a> и <a href="#">Политикой конфиденциальности</a>
        </div>
      </form>
    </div>
  );
};

export default Registration;
