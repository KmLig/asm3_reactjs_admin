import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AddProduct from "../addProduct/AddProduct";
import Home from "../home/Home";
import EditProductModal from "../editProductModal/EditProductModal";
import Product from "../product/Product";
import User from "../user/User";
import Chat from "../Chat/Chat";
import History from "../history/History";

const Content = ({ isAuth }) => {
  const RequireAuth = ({ children }) => {
    const location = useLocation();
    return isAuth ? (
      children
    ) : (
      <Navigate to='/login' replace state={{ path: location.pathname }} />
    );
  };
  return (
    <div>
      <Routes>
        <Route
          path='/home'
          name='Home'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path='/user'
          name='User'
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route
          path='/product'
          name='Product'
          element={
            <RequireAuth>
              <Product />
            </RequireAuth>
          }
        />
        <Route
          path='/editProduct/:productId'
          name='Edit Product'
          element={
            <RequireAuth>
              <EditProductModal />
            </RequireAuth>
          }
        />
        <Route
          path='/chat'
          name='Chat'
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />

        <Route
          path='/newProduct'
          name='Add Product'
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />

        <Route
          path='/history'
          name='History'
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route path='/' element={<Navigate to='/home' replace />} />
      </Routes>
    </div>
  );
};

export default Content;
