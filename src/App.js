// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, createContext, useState } from 'react';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Page404 from './pages/page404/Page404';
import Page500 from './pages/page500/Page500';
import Loading from './components/loading/Loading.jsx';
import DefaultLayout from './layout/defaultLayout/DefaultLayout';


const AuthContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
  };

  const logoutHandler = () => {
    setIsAuth(false);
  };
  console.log(isAuth);
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login onLogin={loginHandler} />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={
              <AuthContext.Provider value={isAuth}>
                <DefaultLayout onLogout={logoutHandler} isAuth={isAuth} />
              </AuthContext.Provider>}
            />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div >
  );
}

export default App;
