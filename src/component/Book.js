import React, { useState } from 'react'
import swal from "sweetalert";
import "./Book.css"
import { useNavigate } from 'react-router-dom';



const Book = () => {


const[country,setCountry]=useState('');
const[checkin,setCheckin]=useState([]);
const[checkout,setCheckout]=useState([]);
const[noofroom,setNoofroom]=useState([]);
const[noofadult,setNoofadult]=useState([]);
const[noofchildren,setNoofchildren]=useState([]);
const[email,setEmail]=useState([]);
const[phone,setPhone]=useState([]);
const navigate=useNavigate();






const handlechange=async()=>{
try {
  const result = await fetch("http://localhost:5000/book", {
    method: "POSt",
    body: JSON.stringify({
      country,
      checkin,
      checkout,
      noofroom,
      email,
      phone,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (result.status === 200) {
    // Authentication successful
    swal({
      title: "Welcome",
      text: "You Have Successfully Booked you Package",
      icon: "success",
      button: "ok",
    });
    navigate("/");
  } else {
    // Authentication failed
    alert("Invalid email or password. Please try again.");
  }
} catch (error) {
  console.log(error);
}

  }
  return (
    <>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <div className="form-header">
                  <h1>Make your reservation</h1>
                </div>
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Country, ZIP, city..."
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                    />
                    <span className="form-label">Destination</span>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="date"
                          required
                          onChange={(e) => setCheckin(e.target.value)}
                          value={checkin}
                        />
                        <span className="form-label">Check In</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="date"
                          required
                          onChange={(e) => setCheckout(e.target.value)}
                          value={checkout}
                        />
                        <span className="form-label">Check out</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setNoofroom(e.target.value)}
                          value={noofroom}
                        >
                          <option value selected hidden>
                            no of rooms
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                        <span className="select-arrow" />
                        <span className="form-label">Rooms</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setNoofadult(e.target.value)}
                          value={noofadult}
                        >
                          <option value selected hidden>
                            no of adults
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                        <span className="select-arrow" />
                        <span className="form-label">Adults</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          onChange={(e) => setNoofchildren(e.target.value)}
                          value={noofchildren}
                        >
                          <option value selected hidden>
                            no of children
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          
                        </select>
                        <span className="select-arrow" />
                        <span className="form-label">Children</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Enter your Email"
                          onChange={(e)=>setEmail(e.target.value)}
                          value={email}
                        />
                        <span className="form-label">Email</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="Enter you Phone"
                          onChange={(e)=>setPhone(e.target.value)}
                          value={phone}
                        />
                        <span className="form-label">Phone</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn">
                    <button className="submit-btn" onClick={handlechange}>
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book
