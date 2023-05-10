import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `/orders/histories${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/orders/histories/${id}`;
    return axiosClient.get(url);
  },

  getAll: () => {
    const url = "/orders/histories/all";
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
