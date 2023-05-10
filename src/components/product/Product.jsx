import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import "./product.css";
import AdminProductAPI from "../../API/AdminProductAPI";

const Product = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(false);
  // const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AdminProductAPI.getAPI();
        console.log(response);
        setProducts(response.products);
      } catch (error) {
        if (error) {
          setErrorMessage(error.response.statusText);
        }
      }
    };
    fetchProduct();
    setLoadProducts(false);
  }, [loadProducts]);

  const editHandler = (e, productId) => {
    console.log(productId);
    navigate(`/editProduct/${productId}`, { state: { productId: productId } });
  };

  const deleteHandler = async (e, productId) => {
    console.log(productId);
    if (window.confirm("Do you want to delete this product?") === true) {
      try {
        const response = await AdminProductAPI.deleteProduct(productId);
        if (response.result) {
          setLoadProducts(true);
        }
      } catch (error) {
        if (error) {
          console.log(error.message);
        }
      }
    }
  };
  console.log(products);
  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between p-3 align-items-center'>
        <h1>Your product list</h1>
        <Link
          className='btn btn-outline-success align-items-center rounded-5'
          to={"/newProduct"}>
          Add new product
        </Link>
      </div>
      {errorMessage && (
        <div className='my-3'>
          <span className='p-2 border border-danger text-bg-danger fw-bold'>
            {errorMessage}
          </span>
        </div>
      )}
      <table className='table text-center table-sm align-middle shadow'>
        <thead className='bg-light shadow'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Image</th>
            <th scope='col'>Category</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <th scope='row'>{product._id}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    {" "}
                    <img
                      className='product-image'
                      src={
                        product.img1.includes("https://")
                          ? product.img1
                          : "http://localhost:5000/" + product.img1
                      }
                      alt=''
                    />{" "}
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-warning me-2'
                      onClick={(e) => editHandler(e, product._id)}>
                      Edit
                    </button>
                    <button
                      className='btn btn-outline-danger'
                      onClick={(e) => deleteHandler(e, product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
