import React, { useState } from 'react'
import axios from 'axios';


const Otpverification = () => {
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');

    const handleSendOtp=async ()=>{
        try{
            const response = await axios.post("http://localhost:5000/send-otp",{email});
            setMessage(response.data.message);
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div>
      <h1>Email OTP verification</h1>
      <div>
        <label>Email: </label>
        <input  type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
    </div>
  )
}

export default Otpverification
