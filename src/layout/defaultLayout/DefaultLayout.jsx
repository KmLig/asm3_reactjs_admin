import React from "react";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/Footer";
import "./defaulLayout.css";

const DefaultLayout = ({ isAuth, onLogout }) => {
  return (
    <div>
      <Header onLogout={onLogout} />
      <SideBar onLogout={onLogout} />
      <div className='wrapper border-start border-info'>
        <div className='body '>
          <Content isAuth={isAuth} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
