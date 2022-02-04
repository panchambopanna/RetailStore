import React from 'react';
import agent from '../../api/axios';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const About = () => {

  
  return (
    <div className='container'>
      <ToastContainer position='bottom-right' theme='dark' autoClose={2000} type='error' hideProgressBar />
      <h1>Error testing page</h1>
    <div className=' container' style={{ margin: '3rem auto', width: "50%" }}>

      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => {agent.testErrors.get400Err().catch(e=>console.log(e))}} />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">Test Bad Request: 400</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => {agent.testErrors.get401Err().catch(e=>console.log(e))}} />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">Test Authorisation: 401</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => {agent.testErrors.get404Err().catch(e=>console.log(e))}} />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">Test Not found: 404</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => {agent.testErrors.get500Err().catch(e=>console.log(e))}} />
        <label className="btn btn-outline-primary" htmlFor="btnradio4">Test Server error: 500</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={() => {agent.testErrors.getValidationErr().catch(e=>console.log(e))}} />
        <label className="btn btn-outline-primary" htmlFor="btnradio5">Test Validation Error</label>
      </div>

    </div>
    </div>
  )
};

export default About;
