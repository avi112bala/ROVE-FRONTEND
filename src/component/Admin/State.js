import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from 'react'

const State = () => {
    const [formdata,setFormdata]=useState({
        statename:"",
        statedesp:"",
        staterate:"",
        stateimage:null
    });
    const [state,setState]=useState([]);
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
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("statename", formdata.statename);
        formDataToSubmit.append("statedesp", formdata.statedesp);
        formDataToSubmit.append("staterate", formdata.staterate);
        formDataToSubmit.append("stateimage", formdata.stateimage);

        try {
            const response = await axios.post(
              "http://localhost:5000/api/states",
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
        
    }

    const deletestate = async (stateId) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/deletestates/${stateId}`
        );
        console.log(response.data.message); 
        fetchStates();// State deleted successfully
      } catch (error) {
        console.error("Error deleting the state:", error);
      }
    };


      const fetchStates = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/states"
          );
          setState(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching states", error);
        }
      };
    useEffect(()=>{
         fetchStates();
    },[])
  return (
    <div className="container mt-4">
      <h2>Submit State Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="statename" className="form-label">
            State Name
          </label>
          <input
            type="text"
            className="form-control"
            id="statename"
            name="statename"
            value={formdata.statename}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="statedesp" className="form-label">
            State Description
          </label>
          <textarea
            className="form-control"
            id="statedesp"
            name="statedesp"
            value={formdata.statedesp}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="staterate" className="form-label">
            State Rate
          </label>
          <input
            type="number"
            className="form-control"
            id="staterate"
            name="staterate"
            value={formdata.staterate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stateimage" className="form-label">
            Upload State Image
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

      <h2>All State</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.map((data,i)=>{
            return (
              <tr>
                <td>{i++}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${data.stateimage}`}
                    alt={state.statename}
                    className="img-fluid round-circle"
                    style={{ width: "5%", height: "5%" }}
                  />
                </td>
                <td>{data.statename}</td>
                <td>{data.statedesp}</td>
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
}

export default State
