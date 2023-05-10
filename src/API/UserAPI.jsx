import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/admins/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/admins/users/${id}`;
    return axiosClient.get(url);
  },

  // use the same auth end point for all users
  postSignUp: (body) => {
    const url = `/users/signin`;
    return axiosClient.post(url, body);
  },
};

export default UserAPI;
