import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faHotel,
  faHouse,
  faMoneyBill1,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");
  const userData = { user: "6421b5e32b5f79d439b38cb9", password: "dfdgfgfh" };
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/hotels`,
          method: "GET",
        });
        console.log(response.data);
        setHotels(response.data.hotels);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/rooms`,
          method: "GET",
        });
        console.log(response.data);
        setRooms(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/users`,
          method: "GET",
        });
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
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
  return (
    <>
      <div className='d-flex flex-wrap flex-row justify-content-around'>
        <Link className='link' to={"/hotel"}>
          <div className='card my-4 shadow '>
            <div className='card-header bg-danger text-white'>
              <h5 className='card-title'>Hotel</h5>
            </div>
            <div className='card-body'>
              <FontAwesomeIcon icon={faHotel} />
              <p className='card-text'>Total hotels: {hotels.length}</p>
            </div>
          </div>
        </Link>
        <Link className='link' to={"/room"}>
          <div className='card my-4 shadow'>
            <div className='card-header bg-warning text-white'>
              <h5 className='card-title'>Room</h5>
            </div>
            <div className='card-body'>
              <FontAwesomeIcon icon={faHouse} />
              <p className='card-text'>Total rooms: {rooms.length}</p>
            </div>
          </div>
        </Link>
        <Link className='link' to={"/user"}>
          <div className='card my-4 shadow '>
            <div className='card-header bg-secondary text-white'>
              <h5 className='card-title'>User</h5>
            </div>
            <div className='card-body'>
              <FontAwesomeIcon icon={faUserCircle} />
              <p className='card-text'>Number of users: {users.length}</p>
            </div>
          </div>
        </Link>
        <Link className='link' to={"/transaction"}>
          <div className='card my-4 shadow'>
            <div className='card-header bg-success text-white'>
              <h5 className='card-title'>Transaction</h5>
            </div>
            <div className='card-body'>
              <FontAwesomeIcon icon={faMoneyBill1} />
              <p className='card-text'>
                Total transactions: {transactions.length}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
