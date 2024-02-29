import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../Signin.css";
import { useNavigate } from "react-router-dom";

import swal from 'sweetalert'

const Signup = () => {

  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showotp,setShowotp]=useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isSubmit,setIssubmit]=useState(false);
  const[matchcode,setMatchcode]=useState('')
   const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
   const inputRefs = [
     useRef(),
     useRef(),
     useRef(),
     useRef(),
     useRef(),
     useRef(),
   ];




const collectData = async () => {
  console.log(name, email, password);

  try {
      const result = await fetch("http://localhost:5000/send-otp-signup", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
          const responseData = await result.json(); 
        console.log(responseData, "responseData");
        swal("Otp Send Successfully !");
        setShowotp({
          showotp: true,
        });
        setMatchcode(responseData.otp);
        console.log(matchcode);
      
   
    }else{
       const responseData = await result.json(); 
      swal(responseData.message);
    }


  } catch (error) {
    console.log(error);
  }
};

  // const handleinputchange = (Index, value) => {
  //   const inputs = [...otpInputs];
  //   inputs[Index] = value;
  //   setOtpInputs(inputs);
  //   if (Index < inputRefs.length - 1 && value !== "") {
  //     inputRefs[Index + 1].current.focus();
  //   }
  // };

const handleInputChange = (index, value) => {
  const inputs = [...otpInputs];
  inputs[index] = value;
  setOtpInputs(inputs);

  // If the value is emptied and not in the first box, move focus to the previous box
  if (value === "" && index > 0) {
    inputRefs[index - 1].current.focus();
  }

  // If the value is not emptied and not in the last box, move focus to the next box
  if (value !== "" && index < inputRefs.length - 1) {
    inputRefs[index + 1].current.focus();
  }
};



    const verifyOtp = async () => {
      setIssubmit(true)
      const enteredOtp = otpInputs.join("");
      const otpdecode = atob(matchcode);
      //  console.log(otpdecode, "llkllkllk");
      //  console.log(enteredOtp, "otoooooo");
      if (otpdecode === enteredOtp) {
        try {
          const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email ,name}),
          });
          // console.log(response,"success");
          // const data = await response.json();
        // console.log(data, "success");
          if (response.status === 200) {
         
             const data = await response.json();
            // Authentication successful
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.removeItem("otp");
            swal(data.message);
            //  
            navigate("/");
            // setIssubmit(false);
              
          } else {
            // Authentication failed
            swal("Invalid OTP. Please try again.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        swal("Invalid OTP. Please try again.");
      }
    };








  return (
    <>
      {showotp ? (
        <div class="container height-100 d-flex justify-content-center align-items-center">
          <div class="position-relative">
            <div class="card p-2 text-center">
              <h6>
                Please enter the one time password <br /> to verify your account
              </h6>
              <div>
                <span>A code has been sent to your email:</span>
                <strong>{email}</strong>
              </div>
              <div
                id="otp"
                class="inputs d-flex flex-row justify-content-center mt-2"
              >
                {otpInputs.map((value, index) => (
                  <input
                    key={index}
                    className="m-2 text-center form-control rounded"
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    ref={inputRefs[index]}
                  />
                ))}
              </div>
              <div class="mt-4">
                <button
                  class="btn btn-danger px-4 validate"
                  onClick={verifyOtp}
                >
                  {isSubmit===true?"Please Wait" : "Submit"}
                </button>
              </div>
            </div>
            <div class="card-2">
              <div class="content d-flex justify-content-center align-items-center">
                <span>Didn't get the code</span>
                <a href="#" class="text-decoration-none ms-3">
                  Resend(1/3)
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <h1 style={{ marginLeft: "6rem" }}>Signup</h1>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputBox"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input
        className="inputBox"
        type="password"
        placeholder="Enter the password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
          <button onClick={collectData} className="appButton" type="button">
            Sign up
          </button>
        </div>
      )}
    </>
  );
};

export default Signup;
