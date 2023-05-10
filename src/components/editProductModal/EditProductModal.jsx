import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import "./editProductModal.css";
import AdminProductAPI from "../../API/AdminProductAPI";
import { stringify } from "qs";

const EditProductModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [productWithId, setProductWithId] = useState({});
  // const [newHotel, setNewHotel] = useState({});
  useEffect(() => {
    const fetchProductWithID = async () => {
      try {
        setIsLoading(true);
        const response = await AdminProductAPI.getDetail(productId);

        setProductWithId(response.product);
        setIsLoading(false);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchProductWithID();
  }, []);

  const handleChange = (e) => {
    setProductWithId((prevState) => {
      if (e.target.name === "images") {
        return { ...prevState, [e.target.name]: e.target.files };
      }
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (let i = 0; i < productWithId.images.length; i++) {
        // copy each element of the FileList into an array of images instead of directly assign the FileList into an element of the array
        formData.append("images", productWithId.images[i]);
      }
      console.log(formData.getAll("images"));
      formData.append("name", productWithId.name);
      formData.append("category", productWithId.category);
      formData.append("short_desc", productWithId.short_desc);
      formData.append("price", productWithId.price);
      formData.append("long_desc", productWithId.long_desc);
      const response = await AdminProductAPI.putEditDetail(productId, formData);
      console.log(response.result);
      navigate("/product");
    } catch (error) {
      if (error) console.log(error);
    }
  };
  const cancelHandler = () => {
    navigate("/product");
  };
  console.log(productWithId);
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className='shadow rounded-3 p-3 my-3 text-muted'>
        <h3>Do you want to edit product {productWithId.name}?</h3>
        <button
          type='button'
          className='btn btn-warning me-2'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'>
          Edit
        </button>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={cancelHandler}>
          Come back
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Edit product: {productWithId.name}{" "}
                <img
                  className='product-image'
                  src={productWithId.img1}
                  alt=''
                />
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>

            <div className='modal-body'>
              {isLoading ? (
                <Loading />
              ) : (
                <form
                  className='mx-auto shadow rounded-3 p-4'
                  onSubmit={submitHandler}>
                  <div className='row my-2 d-flex flex-row justify-content-center'>
                    <div className='col form-floating my-auto'>
                      <input
                        type='text'
                        className='form-control'
                        value={productWithId.name}
                        name='name'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='name' className='form-label ms-2'>
                        Name
                      </label>
                    </div>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={productWithId.category}
                        name='category'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='category' className='form-label ms-2'>
                        Category
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={productWithId.short_desc}
                        name='short_desc'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='short_desc' className='form-label ms-2'>
                        Short desc
                      </label>
                    </div>
                    <div className='col form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={productWithId.price}
                        name='price'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='price' className='form-label ms-2'>
                        Price
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col form-floating'>
                      <textarea
                        type='text'
                        className='form-control'
                        style={{ height: 120 }}
                        value={productWithId.long_desc}
                        name='long_desc'
                        required
                        onChange={handleChange}
                      />
                      <label htmlFor='long_desc' className='form-label ms-2'>
                        Long desc
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col form-floating'>
                      <input
                        type='file'
                        className='form-control'
                        name='images'
                        id='images'
                        required
                        multiple
                        onChange={handleChange}
                      />
                      <label htmlFor='imgs' className='form-label ms-2'>
                        Images (4 pics)
                      </label>
                    </div>
                    <div className='new-post__preview-image'>
                      {!imagePreview && <p>Please choose an image.</p>}
                      {imagePreview &&
                        imagePreview.map((i) => {
                          return <img src={this.state.imagePreview} alt='' />;
                        })}
                    </div>

                    {/* <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                value={newProduct.img2}
                name='img2'
                required
                onChange={handleChange}
              />
              <label htmlFor='img2' className='form-label ms-2'>
                Images 2
              </label>
            </div> */}
                  </div>

                  <div className=''></div>
                  <button
                    type='submit'
                    className='btn btn-outline-primary mx-auto text-center mt-4'
                    data-bs-dismiss='modal'
                    onClick={submitHandler}>
                    Edit product
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
