import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { useLocation, useNavigate } from "react-router-dom";
import UserAPI from '../../API/UserAPI';
import { stringify } from 'qs';


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialLoginData = {
    email: "",
    password: ""
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setLoginData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleReset = (e) => {
    setLoginData(initialLoginData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const query = "?" + stringify(loginData);
      // console.log(query);
      // console.log(loginData);

      const response = await UserAPI.postSignUp(loginData);


      let cookieValue = document.cookie.replace(
        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      console.log("cookieValue", cookieValue);

      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userName', response.fullName);
      localStorage.setItem('userRole', response.role);
      // const userId = localStorage.getItem('userId');
      // console.log(userId);
      //
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      onLogin();
      navigate(state?.path || "/");

    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };

  console.log(loginData);
  return (
    <>
      <Header />
      <div className='container'>
        <div className="d-flex flex-column mt-3 align-items-center justify-content-center">
          {errorMessage ? (<h5 className='shadow rounded-3 p-3 my-3 text-danger w-50'>{errorMessage}</h5>) : ""}
          <div className="card w-25 shadow">
            <div className=" card-body">
              <form method='POST' onSubmit={handleLogin} >
                <h1 className='text-center'>Login</h1>
                <div className="form-floating my-3">
                  <input type="email" className="form-control" value={loginData.email} id="email" placeholder="Enter email" name="email" onChange={handleChange} required />
                  <label htmlFor="email" className="form-label">Email:</label>
                </div>
                <div className=" form-floating mb-3">
                  <input type="password" className="form-control" value={loginData.password} id="password" placeholder="Enter password" name="password" onChange={handleChange} required />
                  <label htmlFor="password" className="form-label">Password:</label>
                </div>
                <div className='mb-3 d-flex justify-content-around'>
                  <button type="btn" className="btn btn-primary">Login</button>
                  <button type="btn" className="btn btn-danger" onClick={handleReset}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div>
    </>
  );
};

export default Login;
