import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Link, useNavigate } from "react-router-dom";

const Room = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState("undefined");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/admin/rooms",
          method: "GET",
        });
        setRooms(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchRooms();
  }, []);
  console.log(rooms);

  const editHandler = (e, roomId) => {
    console.log(roomId);
    navigate(`/editRoom/${roomId}`, { state: { roomId: roomId } });
  };

  const deleteHandler = async (e, roomId) => {
    console.log(roomId);
    if (window.confirm("Do you want to delete this room?") === true) {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/deleteRoom/${roomId}`,
          method: "DELETE",
        });
        setRooms(response.data.result);
      } catch (error) {
        if (error) {
          console.log(error.message);
        }
      }
    }
  };
  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between p-3 align-items-center'>
        <h1>Your room list</h1>
        <Link
          className='btn btn-outline-success rounded-5 align-items-center'
          to={"/newRoom"}>
          Add room
        </Link>
      </div>
      <table className='table text-center table-sm align-middle shadow'>
        <thead className='bg-light shadow'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Max people</th>
            <th scope='col'>Price</th>
            <th scope='col'>Room Numbers</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {rooms === "undefined" ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            rooms.map((room) => {
              return (
                <tr key={room._id}>
                  <th scope='row'>{room._id}</th>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.maxPeople}</td>
                  <td>{room.price}</td>
                  <td>
                    {room.roomNumbers.map((rN) => (
                      <span>{rN} </span>
                    ))}
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-warning me-2'
                      onClick={(e) => editHandler(e, room._id)}>
                      Edit
                    </button>
                    <button
                      className='btn btn-outline-danger mt-2'
                      onClick={(e) => deleteHandler(e, room._id)}>
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

export default Room;
