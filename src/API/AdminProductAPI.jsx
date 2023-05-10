import axiosClient from "./axiosClient";

const AdminProductAPI = {
  getAPI: () => {
    const url = "/admins/products";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/admins/products/${id}`;
    return axiosClient.get(url);
  },

  addNewProduct: (body) => {
    const url = `/admins/add-product`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "undefined", //need to override content-type when using formData instead of multipart/form-data
      },
    });
  },
  putEditDetail: (id, body) => {
    const url = `/admins/edit-product/${id}/`;
    return axiosClient.put(url, body, {
      headers: {
        "Content-Type": "undefined",
      },
    });
  },
  deleteProduct: (productId) => {
    const url = `admins/delete-product/${productId}`;
    return axiosClient.delete(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
};

export default AdminProductAPI;
