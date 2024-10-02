import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import "../style.css";
import Swalpop from "../../Sweet";

const AddSingleplace = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    desp: "",
    rate: "",
    stateimage: null,
  });
  const [selectedState, setSelectedState] = useState("");
  const [state, setState] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormdata((prevState) => ({
      ...prevState,
      stateimage: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formdata.name);
    formDataToSubmit.append("desp", formdata.desp);
    formDataToSubmit.append("rate", formdata.rate);
    formDataToSubmit.append("stateimage", formdata.stateimage);
    formDataToSubmit.append("selectedState", selectedState);
    try {
      const response = await axios.post(
        "https://rove-backend.onrender.com/api/singleplace",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message);
      Swalpop("City Added Successfully", "success");
      fetchStates();
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const deletestate = async (stateId) => {
    try {
      const response = await axios.post(
        `https://rove-backend.onrender.com/api/deleteplace/${stateId}`
      );
      console.log(response.data.message);
      fetchStates(); // State deleted successfully
    } catch (error) {
      console.error("Error deleting the state:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get("https://rove-backend.onrender.com/api/allplaces");
      setState(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const allfetchcity = async () => {
    try {
      const response = await axios.get("https://rove-backend.onrender.com/api/allcity");
      setAlldata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };
  const handleChange = (e) => {
    setSelectedState(e.target.value); // Update selected state value
  };

  useEffect(() => {
    fetchStates();
    allfetchcity();
  }, []);
  return (
    <div className="container mt-4">
      <h2>Submit Place Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Place Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="desp" className="form-label">
            Place Description
          </label>
          <textarea
            className="form-control"
            id="desp"
            name="desp"
            value={formdata.desp}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Place Rate
          </label>
          <input
            type="number"
            className="form-control"
            id="rate"
            name="rate"
            value={formdata.rate}
            onChange={handleInputChange}
            required
          />
        </div>
        <label htmlFor="state-select">Choose a City:</label>
        <select id="state-select" value={selectedState} onChange={handleChange}>
          <option value="">--Please choose an option--</option>
          {alldata.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <label htmlFor="stateimage" className="form-label">
            Upload Place Image
          </label>
          <input
            type="file"
            className="form-control"
            id="stateimage"
            name="stateimage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h2>All Place</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.map((data, i) => {
            return (
              <tr>
                <td>{i++}</td>
                <td>
                  <img
                    src={`https://rove-backend.onrender.com/${data.stateimage}`}
                    alt={state.stateimage}
                    className="img-fluid round-circle"
                    style={{ width: "50%", height: "75%" }}
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.desp}</td>
                <td onClick={() => deletestate(data._id)}>
                  <DeleteIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddSingleplace;
