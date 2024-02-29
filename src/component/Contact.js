import React, { useState } from 'react'
import '../index.css'

const Contact = () => {

  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[Msg,setMsg]=useState('');

    const handlechange=async(e)=>{
    e.preventDefault();
    // console.log(name,email,Msg)
   const data={name,email,Msg};

   const response = await fetch("http://localhost:5000/send-email", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   });
  //  const body =await response.text();
  //  console.log(body)
    alert("Thanks! we will contact you shortly")
  }
  return (
    <>
      {/* Title */}

      <div
        className="section"
        style={{ display: "block", justifyContent: "center" }}
      >
        <h1 className="heading">
          <span>C</span>
          <span>O</span>
          <span>N</span>
          <span>T</span>
          <span>A</span>
          <span>C</span>
          <span>T</span>
          <span className="space"></span>
          <span>U</span>
          <span>S</span>
          <span className="space"></span>
        </h1>
       

        <div className="register">
          <form onSubmit={handlechange} className='send-email'>
            <input
              className="inputBox"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              className="inputBox"
              placeholder="Enter Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <textarea
              type="text"
              rows={5}
              placeholder="Type Your Message Here"
              className="inputBox"
              onChange={(e) => setMsg(e.target.value)}
              value={Msg}
            />
            <button onClick={handlechange} className="appButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact