import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePackagepage = () => {
    const {id}=useParams();
const [singledata,setSingledata]=useState([])
     const fetchStates = async () => {
       try {
         const response = await axios.get(`http://localhost:5000/api/states/${id}`);
         setSingledata(response.data);
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching states", error);
       }
     };
     useEffect(()=>{
        fetchStates();
     },[])
  return (
    <>
      {/* Title  */}

      <h1 class="heading">
        <span>W</span>
        <span>E</span>
        <span>L</span>
        <span>C</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
        <span class="space"></span>
        <span>T</span>
        <span>O</span>
        <span class="space"></span>
      </h1>
      <h2 class="heading">
        <span>U</span>
        <span>T</span>
        <span>T</span>
        <span>A</span>
        <span>R</span>
        <span class="space"></span>
        <span>P</span>
        <span>R</span>
        <span>A</span>
        <span>D</span>
        <span>E</span>
        <span>S</span>
        <span>H</span>
      </h2>

      {/* Title  */}
      <div className="container text-center">
        <div className="row row-package">
          <div className="col">
            <div
              className="card mb-3"
              style={{ width: "24rem", height: "25rem" }}
            >
              {/* <img
                src={up1}
                className="card-img-top"
                alt="..."
                style={{ width: "24rem", height: "15rem" }}
              /> */}
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "3rem" }}>
                  Agra
                </h5>

                <Link to={"/Agra"}>
                  <button
                    type="button"
                    class="btn btn-warning"
                    style={{ color: "white", fontWeight: "500 " }}
                    // onClick={handlechange1}
                  >
                    Explore Agra
                  </button>
                </Link>
              </div>
            </div>
          </div>

         
        </div>
      </div>

      <div className="container text-center mt-3 mb-3">
        <button
          type="button"
          class="btn btn-danger "
          style={{ color: "white", fontWeight: "500 ", marginBottom: "3rem" }}
        //   onClick={handlechange}
        >
          Back To Packages
        </button>
      </div>
    </>
  );
}

export default SinglePackagepage
