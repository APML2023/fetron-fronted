
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CreateTrip from "./ModalContent/createTrip";
import Box from '@mui/material/Box';


const FleetUpdate = ({ Data1 ,Close }) => {

//   const [FleetData , setFleetData] =useState([]);
//   const [Loading , setLoading] = useState(false);
// // const VehicalNo = Data1[].VEHNO
// const FetchData = async ()=>{

//   try {
//     const response = await axios.get("http://localhost:5050/y/vehicle/erpvehicles");
//     if (response.data.result.length > 0) {
//       setFleetData(response.data.result[0]);
//       setLoading(false);
//     }
//   } catch (error) {
//     setLoading(true);
//   }
// }
// useEffect(()=>{
// FetchData();
// },[])
  
  return (
    <>
      <div>
        <Box className="flex justify-between pl-3 pr-3 sticky top-0 border-b-2 border-b-[#00000069]">
          <Box className="h-14 flex items-center font-bold ">
          {/* {Data1.map((item, index) => (
            <>{item.VEHNO}</>
          ))} */}
          {Data1[0].data.VEHNO} 
            <Box className="p-1 text-white rounded-3xl w-12 text-base flex items-center justify-center bg-green-600 border-black ">
              GPS 
            </Box>
          </Box>
          <Box className="flex items-center">
            <button onClick={Close} >
              <AiOutlineClose size={25} />
            </button>
          </Box>
        </Box>
        <Box className="w-full h-96 overflow-hidden rounded-lg relative ">
          <Box className=" absolute z-20 w-full ">
           
            
          </Box>
          {/* <Box className="absolute z-10 w-full h-full">
            <Map />
          </Box> */}
        </Box>
        <Box className="flex overflow-hidden z-[1]">
          <Box className="w-1/2 h-[50vh]  ">

            {/* ---------------------------------- Create Trip ----------------------------- */}
            <Box className="h-fit z-0 ">
          
             HEllo
            </Box>
          </Box> 
          {/* <CreateTrip/> */}
          <Box className="w-1/2  h-[50vh] flex flex-col gap-24">
           Hii
          </Box>
        </Box>
      </div>
    </>
  );
};

export default FleetUpdate;
