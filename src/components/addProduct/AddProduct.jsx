import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import AdminProductAPI from "../../API/AdminProductAPI";
import { generateBase64FromImage } from "../../util/image";

const AddProduct = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [imagePreview, setImagePreview] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  const handleChange = (e) => {
    setNewProduct((prevState) => {
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

      for (let i = 0; i < newProduct.images.length; i++) {
        // copy each element of the FileList into an array of images instead of directly assign the FileList into an element of the array
        formData.append("images", newProduct.images[i]);
      }
      console.log(formData.getAll("images"));
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("short_desc", newProduct.short_desc);
      formData.append("price", newProduct.price);
      formData.append("long_desc", newProduct.long_desc);

      const response = await AdminProductAPI.addNewProduct(formData);
      console.log(response);
      if (response) {
        navigate("/product");
      }
    } catch (error) {
      if (error) console.log(error);
    }
  };

  console.log(newProduct);

  return (
    <div className='container'>
      <h3 className='shadow rounded-3 p-3 my-3 text-success'>
        Add new product
      </h3>
      {role !== "admin" ? (
        <span className='p-2 border border-danger text-bg-danger fw-bold'>
          Not authorised, just admins have the authorization to add new products
        </span>
      ) : (
        <form
          className='mx-auto shadow rounded-3 p-4'
          encType='multipart/form-data'
          onSubmit={submitHandler}>
          <div className='row my-2 d-flex flex-row justify-content-center'>
            <div className='col form-floating my-auto'>
              <input
                type='text'
                className='form-control'
                value={newProduct.name}
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
                value={newProduct.category}
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
                value={newProduct.short_desc}
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
                value={newProduct.price}
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
                value={newProduct.long_desc}
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
          {/* <div className='row my-2'>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                value={newProduct.img3}
                name='img3'
                required
                onChange={handleChange}
              />
              <label htmlFor='img3' className='form-label ms-2'>
                Images 3
              </label>
            </div>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                value={newProduct.img4}
                name='img4'
                required
                onChange={handleChange}
              />
              <label htmlFor='img4' className='form-label ms-2'>
                Images 4
              </label>
            </div>
          </div> */}

          <div className=''></div>
          <button
            type='submit'
            className='btn btn-outline-primary mx-auto text-center mt-4'
            onClick={submitHandler}>
            Add product
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
