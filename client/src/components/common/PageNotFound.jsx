import React from 'react';

const PageNotFound = (props) => {
  return <div className='container my-5'>
      <h1 style={{color: 'red'}} >{props.message}</h1>
  </div>;
};

export default PageNotFound;
