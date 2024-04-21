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
import Atpickup from './components/Atpickup';
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
  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [vehicalStatus, setVehicalStatus] = useState();

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
    console.log(status);
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
  }, [status])


  console.log(status);

  return (
    <>
      {!status ?
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
            <TableCell></TableCell>
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
          <CreateFleetModal vehicleType={vehicleType}
            vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
            setMOpen={setMOpen}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        </> : <></>
      }
      {
        status == 1 || status == 2 ?
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
              <TableCell></TableCell>

              <TableCell>{vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.origin.place_name : ""}</TableCell>
              <TableCell>{vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.destination.place_name : ""}</TableCell>

              <TableCell>
                <Label color={(status === 'banned' && 'error') || 'success'}>{vehicalStatus}</Label>
              </TableCell>
            </TableRow>
            <EnroutePickupFleetModal vehicleData={vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
              setMOpen={setMOpen}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </> : <></>
      }
      {
        status == 3 ?
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
              <TableCell></TableCell>

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
            <Atpickup vehicleType={vehicleType} vehicleData={vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
              setMOpen={setMOpen}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </> : <></>
      }
      {
        status == 4 ?
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
              <TableCell></TableCell>

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
            <InTransit vehicleType={vehicleType} vehicleData={vehicleData}
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
              setMOpen={setMOpen}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </> : <></>
      }
      {
        status == 5 ?
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
              <TableCell></TableCell>

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
              vehicleNumber={vehicleNumber} status={vehicalStatus} mopen={mopen}
              setMOpen={setMOpen}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
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