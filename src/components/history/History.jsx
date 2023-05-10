import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import HistoryAPI from "../../API/HistoryAPI";

const History = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await HistoryAPI.getAll();
        setHistory(response.histories);
      } catch (error) {
        if (error) {
          setErrorMessage(error.response.statusText);
        }
      }
    };
    fetchHistory();
  }, []);
  console.log(history);
  return (
    <div>
      <div className='container'>
        <div className='p-3 '>
          <h1 className='text-start'>History</h1>
        </div>
        <br />
        {errorMessage && (
          <div className='my-3'>
            <span className='p-2 border border-danger text-bg-danger fw-bold'>
              {errorMessage}
            </span>
          </div>
        )}
        <div className='table text-center shadow'>
          <table className='table table-striped table-bordered no-wrap'>
            <thead className='bg-light'>
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {!history ? (
                <tr>
                  <td colSpan={8}>
                    <Loading />
                  </td>
                </tr>
              ) : (
                history.map((value) => (
                  <tr key={value._id}>
                    <td>{value.userId}</td>
                    <td>{value.fullName}</td>
                    <td>{value.phone}</td>
                    <td>{value.address}</td>
                    <td>{value.total}</td>
                    <td>
                      {value.delivery ? "Đã Vận Chuyển" : "Chưa Vận Chuyển"}
                    </td>
                    <td>
                      {value.status ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
                    </td>
                    <td>
                      <button className='btn btn-success'>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
