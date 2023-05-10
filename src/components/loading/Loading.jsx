import React from "react";

const Loading = () => {
  return (
    <div className='d-flex mt-5 align-items-center justify-content-center'>
      <strong>Loading...</strong>
      <div
        className='spinner-grow bg-danger'
        role='status'
        aria-hidden='true'></div>
      <div
        className='spinner-grow bg-warning'
        role='status'
        aria-hidden='true'></div>
      <div
        className='spinner-grow bg-primary'
        role='status'
        aria-hidden='true'></div>
    </div>
  );
};

export default Loading;
