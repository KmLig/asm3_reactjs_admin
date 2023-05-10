import React, { useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const initialUser = {
    email: "",
    password: "",
    userName: "",
    fullName: "",
    phoneNumber: 0,
    isAdmin: true,
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleReset = (e) => {
    setUser(initialUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:5000/api/auth/signup",
        data: user,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };
  console.log(user);

  return (
    <>
      <Header />
      <div className='d-flex flex-column mt-3 align-items-center justify-content-center'>
        {errorMessage ? (
          <h5 className='shadow rounded-3 p-3 my-3 text-danger w-50'>
            {errorMessage}
          </h5>
        ) : (
          ""
        )}
        <div className='card w-25'>
          <div className=' card-body'>
            <form method='POST' onSubmit={handleSubmit}>
              <h1 className='text-center'>Register</h1>
              <p className='text-medium-emphasis text-center'>
                Create your account
              </p>
              <div className='form-floating my-3'>
                <input
                  type='email'
                  className='form-control'
                  value={user.email}
                  id='email'
                  placeholder='Enter email'
                  name='email'
                  onChange={handleChange}
                />
                <label htmlFor='email' className='form-label'>
                  Email:
                </label>
              </div>
              <div className='form-floating my-3'>
                <input
                  type='password'
                  className='form-control'
                  value={user.password}
                  id='password'
                  placeholder='Enter password'
                  name='password'
                  onChange={handleChange}
                />
                <label htmlFor='password' className='form-label'>
                  Password:
                </label>
              </div>
              <div className='form-floating my-3'>
                <input
                  type='text'
                  className='form-control'
                  id='userName'
                  placeholder='Enter your name'
                  name='userName'
                  onChange={handleChange}
                />
                <label htmlFor='userName' className='form-label'>
                  Your name:
                </label>
              </div>
              <div className='form-floating my-3'>
                <input
                  type='text'
                  className='form-control'
                  id='fullName'
                  placeholder='Enter your full name'
                  name='fullName'
                  onChange={handleChange}
                />
                <label htmlFor='fullName' className='form-label'>
                  Full name:
                </label>
              </div>
              <div className='form-floating my-3'>
                <input
                  type='tel'
                  className='form-control'
                  id='phoneNumber'
                  placeholder='Enter your phone number'
                  name='phoneNumber'
                  onChange={handleChange}
                />
                <label htmlFor='phoneNumber' className='form-label'>
                  Phone numbers:
                </label>
              </div>
              <div className='mb-3 d-flex justify-content-around'>
                <button type='submit' className='btn btn-primary'>
                  Register
                </button>
                <button
                  type='btn'
                  className='btn btn-danger'
                  onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
