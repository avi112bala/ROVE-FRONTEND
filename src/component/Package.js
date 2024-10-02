import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import package1 from "./images/package1.jpg";
import package2 from "./images/package2.jpg";
import package3 from "./images/package3.jpg";
import package4jpg from "./images/package4jpg.jpg";
import package5 from "./images/package5.jpg";
import package6 from "./images/package6.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useNavigate } from "react-router-dom";
import "./Package.css";
import axios from "axios";

export const Package = () => {
  const [state, setState] = useState([]);

  const fetchStates = async () => {
    try {
      const response = await axios.get("https://rove-backend.onrender.com/api/states");
      setState(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };
  useEffect(() => {
    fetchStates();
  }, []);
  const navigate = useNavigate();

  function handlechange(id,name) {
    navigate(`/single-package-page/${id}/${encodeURIComponent(name)}`);
  }
  

  return (
    <>
      <div className="sectionp">
        <div>
          <h1 class="heading">
            <span>P</span>
            <span>A</span>
            <span>C</span>
            <span>K</span>
            <span>A</span>
            <span>G</span>
            <span>E</span>
            <span>S</span>
          </h1>
        </div>

        {/* card */}
        <div className="container text-center">
          <div className="row row-package" style={{ marginBottom: "5rem" }}>
            {state.map((data) => {
              return (
                <>
                  <div className="col">
                    <div
                      className="card"
                      style={{ width: "24rem", height: "33.14rem" }}
                    >
                      <img
                        src={`https://rove-backend.onrender.com/${data.stateimage}`}
                        className="card-img-top"
                        alt="..."
                        style={{ width: "24rem", height: "15rem" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{ width: "100%" }}>
                          <LocationOnIcon style={{ color: "orange" }} />
                          {data.statename}
                        </h5>
                        <p className="card-text">{data.statedesp}</p>
                        <div>
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />
                        </div>

                        <button
                          type="button"
                          class="btn btn-warning"
                          style={{ color: "white", fontWeight: "500 " }}
                          onClick={() => handlechange(data._id, data.statename)}
                        >
                          Explore uttar Pradesh
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
