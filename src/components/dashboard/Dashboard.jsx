import axios from "axios";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import NavBar from "../navbar/Navbar";

const Dashboard = () => {
  let countNum = 1;
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/transactions`,
          method: "GET",
        });
        console.log(response.data);
        setTransactions(response.data.transactions);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchTransaction();
  }, []);
  console.log(transactions);
  return (
    <div>
      <NavBar />
      <div className='container'>
        <h1>Dashboard: Lastest transactions</h1>
        <table className='table text-center shadow'>
          <thead className='bg-light'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Hotel</th>
              <th scope='col'>Room</th>
              <th scope='col'>Date</th>
              <th scope='col'>Price</th>
              <th scope='col'>Payment method</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <th scope='row'>{countNum++}</th>
                    <td>{transaction.hotel.name}</td>
                    <td>
                      {transaction.room.map((r) => (
                        <span key={r}>{r} </span>
                      ))}
                    </td>
                    <td>
                      {format(new Date(transaction.dateStart), "dd/MM/yyyy") +
                        " - " +
                        format(new Date(transaction.dateEnd), "dd/MM/yyyy")}
                    </td>
                    <td>{transaction.price}</td>
                    <td>{transaction.payment}</td>
                    <td>
                      <span
                        className={
                          transaction.status !== "Booked"
                            ? "text-success"
                            : "text-danger"
                        }>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
