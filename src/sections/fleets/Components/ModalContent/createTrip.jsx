import React, { useState } from "react";
// import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  customScroll: {
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    maxHeight: '400px', 
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
    },
  }
}));
const CreateTrip = ({ VehicleData }) => {
  const initialDestination = {
    Destination: "",
    DestinationETA: "",
  };

  const initialOrigin = {
    Origin: "",
    OriginETA: "",
  };

  const [destinations, setDestinations] = useState([initialDestination]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const useMe = useStyle();
  const closeAlert = () => {
    setShowAlert(false);
  };

  const addDestination = () => {
    setDestinations([...destinations, initialDestination]);
  };

  const removeDestination = (index) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };

//   const apiUrl ='http://localhost:5050/post/fleet';

  const submitForm = async () => {
    try {
      if (destinations.length > 0) {
        const tripData = {
          VehicleData: VehicleData,
          VehicleNumber: VehicleData.VEHNO,
          VehicleStatus: "EnrouteForPickup",
          Destinations: destinations,
        };

        console.log(tripData);

        // Rest of your code for axios.post goes here

        // const response = await axios.post(apiUrl, handleInputChange);
        // console.log('Response:', response.data);
        
      } else {
        setShowAlert(true);
        setAlertMessage("Please Enter at least one destination");
      }
    } catch (e) {
      setShowAlert(true);
      setAlertMessage("Error! Please Contact the IT Teams");
      console.error(e.message);
    }
  };

  const handleInputChange = (e, field, index) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index][field] = e.target.value;
    setDestinations(updatedDestinations);
  };

  return (
    <div>
      <Box className={useMe.customScroll}>
      <div className="border-2 rounded-lg bg-white p-5 m-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <label className="block ">Origin:</label>
            <input
              type="text"
              placeholder="From"
              className="border border-black p-2 bg-white text-black rounded-md"
              value={destinations[0].Origin} // Use the first destination for Origin
              onChange={(e) => handleInputChange(e, "Origin", 0)} // Use index 0 for Origin
            />
          </div>
          <div>
            <label className="block ">Origin ETA:</label>
            <input
              type="datetime-local"
              placeholder="ETA"
              className="border border-black p-2 bg-white text-black rounded-md"
              value={destinations[0].OriginETA} // Use the first destination for OriginETA
              onChange={(e) => handleInputChange(e, "OriginETA", 0)} // Use index 0 for OriginETA
            />
          </div>
        </div>

        {destinations.map((destination, index) => (
          <div
            key={index}
            className="flex justify-between align-middle "
          >
            <div>
              <label className="block ">Destination:</label>
              <input
                type="text"
                placeholder="To"
                className="border border-black p-2 bg-white text-black rounded-md"
                value={destination.Destination}
                onChange={(e) => handleInputChange(e, "Destination", index)}
              />
            </div>
            <div>
              <label className="block ">Destination ETA:</label>
              <input
                type="datetime-local"
                placeholder="ETA"
                className="border border-black p-2 bg-white text-black ml-2 rounded-md" 
                value={destination.DestinationETA}
                onChange={(e) => handleInputChange(e, "DestinationETA", index)}
              />
            </div>
            {index > 0 && (
              <button
              className="bg-[#2a4e72] p-2 text-white font-bold rounded-lg hover:bg-[#1a2e42] ml-4"
                onClick={() => removeDestination(index)}
              >
                Remove Destination
              </button>
            )}
          </div>
        ))}
        <button
          className="bg-[#2a4e72] p-2 text-white font-bold rounded-lg hover:bg-[#1a2e42]"
          onClick={addDestination}
        >
          Add Destination
        </button>
        <button
          className="bg-[#2a4e72] p-2 text-white font-bold rounded-lg hover:bg-[#1a2e42]"
          onClick={submitForm}
        >
          Create Trip
        </button>
      </div>
      </Box>
    </div>
  );
};

export default CreateTrip;
