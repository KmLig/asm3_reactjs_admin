import React, { useEffect, useState } from "react";
import HistoryAPI from "../../API/HistoryAPI";
import { Link } from "react-router-dom";
import NavBar from "../navbar/Navbar";

function Home(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await HistoryAPI.getAll();
        setHistory(response.histories);
        console.log(response.histories);
      } catch (error) {
        if (error) {
          setErrorMessage(error.response.statusText);
        }
      }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='container'>
        <h4 className=''>History</h4>
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
              {history.length > 0 &&
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
