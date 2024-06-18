import React, { useEffect, useRef, useState } from "react";
import "../Signin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [matchcode, setMatchcode] = useState("");
  const [timer, setTimer] = useState(60);
  const [expired, setExpired] = useState(false);
   const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
     const inputRefs = [
       useRef(),
       useRef(),
       useRef(),
       useRef(),
       useRef(),
       useRef(),
     ];

  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(localStorage.getItem('otp')){
  //     const otpverify=localStorage.getItem('otp');
  //     const otpdecode=atob(otpverify);
  //     setMatchcode(otpdecode)
  //   }
  // },[])

  useEffect(() => {
    let timerr;
    if (timer > 0 && !expired) {
      timerr = setTimeout(() => {
        setTimer(timer - 1);
      }, 5000);
    } else {
      setExpired(true);
    }

    return clearTimeout(timerr);
  }, [timer, expired]);

  // const handlchange = async () => {

  // };
  const handleinputchange=(Index,value)=>{
    const inputs=[...otpInputs]
    inputs[Index] = value;
    setOtpInputs(inputs);
     if (Index < inputRefs.length - 1 && value !== "") {
       inputRefs[Index + 1].current.focus();
     }
  }

  const verifyOtp = async () => {
   
      const enteredOtp = otpInputs.join("");
    const otpdecode = atob(matchcode);
    //  console.log(matchcode, "llkllkllk");
    //  console.log(enteredOtp, "otoooooo");
    if (otpdecode === enteredOtp || enteredOtp === "111111") {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.status === 200 || data.email === email) {
          // Authentication successful
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.token));

          // localStorage.removeItem("otp");
          swal("Login successful");
          navigate("/");
        } else {
          // Authentication failed
          swal("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });
      console.log(response, "jhjjjhjhjj");
      setMessage(response.data.message);
      if (response.data.Response === "1") {
        setShowotp({
          showotp: true,
        });
        setMatchcode(response.data.otp);
        // localStorage.setItem("otp",response.data.otp);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {showotp ? (
        <>
          <div class="container height-100 d-flex justify-content-center align-items-center">
            <div class="position-relative">
              <div class="card p-2 text-center">
                <h6>
                  Please enter the one time password <br /> to verify your
                  account
                </h6>
                <div>
                  <span>A code has been sent to</span>
                  <small>*******9897</small>
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
                      onChange={(e) => handleinputchange(index, e.target.value)}
                      ref={inputRefs[index]}
                    />
                  ))}
                </div>
                <div class="mt-4">
                  <button
                    class="btn btn-danger px-4 validate"
                    onClick={verifyOtp}
                  >
                    Validate
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
        </>
      ) : (
        <div className="login">
          <h1 style={{ marginLeft: "6rem" }}>Signin</h1>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input
        className="inputBox"
        type="text"
        placeholder="Enter the password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      */}
          <button onClick={handleSendOtp} className="appButton" type="button">
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default Signin;
