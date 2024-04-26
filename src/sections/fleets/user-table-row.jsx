import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import axios from "axios";
import CreateFleetModal from './components/createFleet';
import EnroutePickupFleetModal from './components/enroutePickup';
import Pickup from "./components/pickup"
import AtPickupFleetModal from './components/Atpickup';
import InTransit from './components/inTransit';
import UnloadingVehicle from './components/unloading';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  vehicleType,
  vehicleNumber,
  company,
  role,
  vehicleData,
  isVerified,
  status,
  handleClick,
  fetchAgain,
  setFetchAgain
}) {
  const [mopen, setMOpen] = useState(false);
  const [m2open, setM2Open] = useState(false);
  const [m3open, setM3Open] = useState(false);
  const [m4open, setM4Open] = useState(false);
  const [m5open, setM5Open] = useState(false);
  const [m6open, setM6Open] = useState(false);
  const [m7open, setM7Open] = useState(false);

  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [vehicalStatus, setVehicalStatus] = useState();
  const [numStatus, setVNumStatus] = useState();
  const [vd, setvd] = useState();

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns])

  // console.log(vehicleData);

  const vehicle_status = [
    "available",
    "",
    "enroute-for-pickup",
    "at-pickup",
    "intransit",
    "unloading",
    "completed"
  ]

  useEffect(() => {
    // console.log(status);
    if (!status) {
      setVehicalStatus("available");
    }
    else {
      if (status == 1 || status == 2) {
        setVehicalStatus(vehicle_status[2]);
      }
      else {
        setVehicalStatus(vehicle_status[status]);
      }

    }
    setVNumStatus(status);
  }, [status])

  // MH14KA3798


  useEffect(() => {
    // console.log(vd);
    // if (vd && vd._id) {
    if (vd && vd._id) {
      // status = vd.current_status;
      setVNumStatus(Number(vd.current_status));
      vehicleData = { ...vd };
      // setFetchAgain(true);
      // console.log(Number(vd.current_status));
      // console.log(vd);
    }
    // }
  }, [vd])

  // useEffect(() => {
  //   console.log(m4open);
  // }, [m4open])
  // console.log(numStatus);

  return (
    <>
      {!numStatus ?
        <>
          <TableRow
            tabIndex={-1}
            role="checkbox"
            selected={selected}
            className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={(e) => {
              setMOpen((mopen) => !mopen);
            }}
          >
            <TableCell component="th" scope="row" padding="0.4">
              <Stack direction="column" alignItems="start" spacing={0.5}>
                <p className="text-sm">{vehicleType}</p>
                <Typography variant="subtitle2" noWrap>
                  {vehicleNumber}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>{vehicleData?.current_location ? vehicleData?.current_location?.location : ""}</TableCell>
            <TableCell>{vehicleData?.current_fleet[0]?.origin?.place_name ?
              vehicleData?.current_fleet[0]?.origin?.place_name : ""
            }</TableCell>

            <TableCell>{vehicleData?.current_fleet[0]?.destination?.place_name ?
              vehicleData?.current_fleet[0]?.destination?.place_name : ""
            }</TableCell>

            <TableCell>
              <Label color={(numStatus === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
            </TableCell>
          </TableRow>
          {/* <EnroutePickupFleetModal vehicleData={vd}
            vehicleNumber={vehicleNumber} status={1} mopen={m2open}
            setMOpen={setM2Open}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          /> */}
          <CreateFleetModal vehicleType={vehicleType}
            vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
            setMOpen={setMOpen}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            vd={vd}
            setvd={setvd}
            setM2Open={setM2Open}
            vehicleData={vehicleData}
          />
        </> : <></>
      }
      {
        numStatus == 1 || numStatus == 2 ?
          <>
            <TableRow
              tabIndex={-1}
              role="checkbox"
              selected={selected}
              className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={(e) => {
                setM2Open((m2open) => !m2open);
              }}
            >
              <TableCell component="th" scope="row" padding="0.4">
                <Stack direction="column" alignItems="start" spacing={0.5}>
                  <p className="text-sm">{vehicleType}</p>
                  <Typography variant="subtitle2" noWrap>
                    {vehicleNumber}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{vehicleData?.current_location ? vehicleData?.current_location?.location : ""}</TableCell>

              <TableCell>{vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.origin.place_name : ""}</TableCell>
              <TableCell>{vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.destination.place_name : ""}</TableCell>

              <TableCell>
                <Label color={(status === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
              </TableCell>
            </TableRow>

            <EnroutePickupFleetModal vehicleData={vd ? vd : vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={m2open}
              setMOpen={setM2Open}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              setM2open={setM3Open}
              vd={vd}
              setvd={setvd}
            />
          </> : <></>
      }
      {
        numStatus == 3 ?
          <>
            <TableRow
              tabIndex={-1}
              role="checkbox"
              selected={selected}
              className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={(e) => {
                setM3Open(true);
              }}
            >
              <TableCell component="th" scope="row" padding="0.4">
                <Stack direction="column" alignItems="start" spacing={0.5}>
                  <p className="text-sm">{vehicleType}</p>
                  <Typography variant="subtitle2" noWrap>
                    {vehicleNumber}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{vehicleData?.current_location ? vehicleData?.current_location?.location : ""}</TableCell>

              <TableCell>{vehicleData?.current_fleet[0]?.origin?.place_name ?
                vehicleData?.current_fleet[0]?.origin?.place_name : ""
              }</TableCell>
              <TableCell>{vehicleData?.current_fleet[0]?.destination?.place_name ?
                vehicleData?.current_fleet[0]?.destination?.place_name : ""
              }</TableCell>

              <TableCell>
                <Label color={(status === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
              </TableCell>
            </TableRow>
            <AtPickupFleetModal vehicleType={vehicleType} vehicleData={vd ? vd : vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={m3open}
              setMOpen={setM3Open}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              setvd={setvd}
              setM2open={setM4Open}
            />
          </> : <></>
      }
      {
        numStatus == 4 ?
          <>
            <TableRow
              tabIndex={-1}
              role="checkbox"
              selected={selected}
              className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={(e) => {
                setM4Open(true);
              }}
            >
              <TableCell component="th" scope="row" padding="0.4">
                <Stack direction="column" alignItems="start" spacing={0.5}>
                  <p className="text-sm">{vehicleType}</p>
                  <Typography variant="subtitle2" noWrap>
                    {vehicleNumber}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{vehicleData?.current_location ? vehicleData?.current_location?.location : ""}</TableCell>

              <TableCell>{vehicleData?.current_fleet[0]?.origin?.place_name ?
                vehicleData?.current_fleet[0]?.origin?.place_name : ""
              }</TableCell>
              <TableCell>{vehicleData?.current_fleet[0]?.destination?.place_name ?
                vehicleData?.current_fleet[0]?.destination?.place_name : ""
              }</TableCell>

              <TableCell>
                <Label color={(status === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
              </TableCell>
            </TableRow>
            <InTransit vehicleType={vehicleType} vehicleData={vd ? vd : vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={m4open}
              setMOpen={setM4Open}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              setM2open={setM5Open}
              vd={vd}
              setvd={setvd}

            />
          </> : <></>
      }
      {
        numStatus == 5 ?
          <>
            <TableRow
              tabIndex={-1}
              role="checkbox"
              selected={selected}
              className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
              onClick={(e) => {
                setM5Open(true);
              }}
            >
              <TableCell component="th" scope="row" padding="0.4">
                <Stack direction="column" alignItems="start" spacing={0.5}>
                  <p className="text-sm">{vehicleType}</p>
                  <Typography variant="subtitle2" noWrap>
                    {vehicleNumber}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{vehicleData?.current_location ? vehicleData?.current_location?.location : ""}</TableCell>

              <TableCell>{vehicleData?.current_fleet[0]?.origin?.place_name ?
                vehicleData?.current_fleet[0]?.origin?.place_name : ""
              }</TableCell>
              <TableCell>{vehicleData?.current_fleet[0]?.destination?.place_name ?
                vehicleData?.current_fleet[0]?.destination?.place_name : ""
              }</TableCell>

              <TableCell>
                <Label color={(status === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
              </TableCell>
            </TableRow>
            <UnloadingVehicle vehicleType={vehicleType} vehicleData={vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={m5open}
              setMOpen={setM5Open}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              // setM2open={setM5Open}
              vd={vd}
              setvd={setvd}
            />
          </> : <></>
      }
    </>
  );
}
UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};