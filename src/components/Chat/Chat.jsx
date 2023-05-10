import React, { useEffect, useState } from "react";
import UserAPI from "../../API/UserAPI";
import ChatRoomsAPI from "../../API/ChatRoomsAPI";
import "./Chat.css";

import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
// const socket = io("http://localhost:5000");
const socket = io("https://asm3-nodejs-api.onrender.com");

function Chat(props) {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState([]);
  const [load, setLoad] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };

  // Hàm này dùng để tìm ra những user khác với admin
  useEffect(() => {
    const fetchData = async () => {
      const result = await ChatRoomsAPI.getAllRoom();
      setAllRoom(result.rooms);
    };
    fetchData();
  }, []);

  // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
  // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
  // để gọi lại hàm này
  useEffect(() => {
    if (roomId) {
      const fetchData = async () => {
        const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
        setMessage(result.messages || []);
      };
      fetchData();
    }
  }, [roomId]);

  // Đây là hàm lấy dữ liệu từ api dựa vào state load
  // Dùng để load lại tin nhắn khi có socket từ server gửi tới
  useEffect(() => {
    if (load) {
      const fetchData = async () => {
        const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
        setMessage(result.messages || []);
      };
      fetchData();

      setLoad(false);
    }
  }, [load]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = () => {
    if (!roomId) {
      return;
    }

    const data = {
      message: textMessage,
      roomId: roomId,
      is_admin: true,
    };

    const postData = async () => {
      await ChatRoomsAPI.addMessage(data);
    };
    postData();
    setTextMessage("");

    socket.emit("send_message", data);
    setLoad(true);
  };
  const handleRoomChange = (roomId) => {
    setRoomId(roomId);
  };

  return (
    <div className='page-wrapper'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card mt-3 w-100 shadow'>
              <div className='card-header bg-info text-white fw-bold'>
                Message <FontAwesomeIcon icon={faMessage} />{" "}
              </div>
              <div className='row'>
                <div className='col-lg-4 col-xl-3 border-end'>
                  <div className='card-body border-bottom'>
                    <form>
                      <input
                        className='form-control w-100'
                        type='text'
                        placeholder='Search Contact'
                      />
                    </form>
                  </div>
                  <div
                    className='scrollable'
                    style={{ height: "calc(80vh - 111px)" }}>
                    <ul className='p-0 m-0 d-flex flex-row justify-content-center'>
                      <li className=''>
                        {allRoom.length > 0 &&
                          allRoom.map((value) => (
                            <button
                              key={value._id}
                              onClick={() => handleRoomChange(value._id)}
                              className='btn btn-outline-primary d-flex flex-row align-items-center my-2 rounded-pill active_user'
                              title={"Room id: " + value._id}>
                              <div className='user-img'>
                                {" "}
                                <img
                                  src='https://img.icons8.com/color/36/000000/administrator-male.png'
                                  alt='user'
                                  className='img-fluid rounded-circle'
                                  width='40px'
                                />{" "}
                                {/* <span className='profile-status away float-right'></span> */}
                              </div>
                              <div className='w-75'>
                                <span className=''>
                                  {value._id.slice(0, 10)}
                                </span>
                              </div>
                            </button>
                          ))}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-lg-8  col-xl-9'>
                  <div
                    className='chat-box scrollable position-relative fix_scroll'
                    style={{ height: "calc(80vh - 111px)" }}>
                    <ul className='chat-list list-style-none px-3 pt-3'>
                      {message &&
                        message.map((value, index) =>
                          value.is_admin ? (
                            <li
                              className='chat-item text-end odd list-style-none mt-3'
                              key={index}>
                              <div className='chat-content d-inline-block pl-3 bg-info'>
                                <div className='box msg p-2 d-inline-block mb-1 '>
                                  You : {value.content}
                                </div>
                                <br />
                              </div>
                            </li>
                          ) : (
                            <li
                              className='chat-item text-start list-style-none mt-3'
                              key={index}>
                              <div className='chat-img d-inline-block'>
                                <img
                                  src='https://img.icons8.com/color/36/000000/administrator-male.png'
                                  alt='user'
                                  className='rounded-circle'
                                  width='45'
                                />
                              </div>
                              <div className='chat-content d-inline-block pl-3'>
                                {/* <h6 className='font-weight-medium'></h6> */}
                                <div className='msg p-2 d-inline-block mb-1 bg-light'>
                                  Client
                                  <strong> {value.userId.fullName}</strong>:
                                  {value.content}
                                </div>
                              </div>
                              <div className='chat-time d-block font-10 mt-1 mr-0 mb-3'></div>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className='card-body border-top'>
                    <div className='row'>
                      <div className='col-9'>
                        <div className='input-field mt-0 mb-0'>
                          <input
                            id='textarea1'
                            placeholder='Type and enter'
                            className='form-control border-0'
                            type='text'
                            onChange={onChangeText}
                            value={textMessage}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handlerSend();
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className='col-3'>
                        <button
                          type='btn'
                          className='btn btn-info rounded-5 text-white fw-bold float-right'
                          onClick={handlerSend}>
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
