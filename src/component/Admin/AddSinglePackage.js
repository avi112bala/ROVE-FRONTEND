import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";

const AddSinglePackage = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    desp: "",
    rate: "",
    image: null,
  });
    const [selectedState, setSelectedState] = useState("");
  const [state, setState] = useState([]);
  const [alldata,setAlldata]=useState([]);
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
      image: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formdata.name);
    formDataToSubmit.append("desp", formdata.desp);
    formDataToSubmit.append("rate", formdata.rate);
    formDataToSubmit.append("image", formdata.image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/singlecity",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.message); // Handle success
      fetchStates();
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const deletestate = async (stateId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/deletestates/${stateId}`
      );
      console.log(response.data.message);
      fetchStates(); // State deleted successfully
    } catch (error) {
      console.error("Error deleting the state:", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allcity");
      setState(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

   const allfetchStates = async () => {
     try {
       const response = await axios.get("http://localhost:5000/api/states");
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
    allfetchStates();
  }, []);
  return (
    <div className="container mt-4">
      <h2>Submit State Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            State Name
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
            State Description
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
            State Rate
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
        <label htmlFor="state-select">Choose a state:</label>
        <select id="state-select" value={selectedState} onChange={handleChange}>
          <option value="">--Please choose an option--</option>
          {alldata.map((state) => (
            <option key={state._id} value={state._id}>
              {state.statename}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload State Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h2>All State</h2>
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
                    src={`http://localhost:5000/${data.image}`}
                    alt={state.statename}
                    className="img-fluid round-circle"
                    style={{ width: "5%", height: "5%" }}
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

export default AddSinglePackage;
