import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCancel, faClock, faCross, faLocation, faXmark } from '@fortawesome/free-solid-svg-icons';

import { MapProvider } from 'react-simple-maps';
import ModalMap from 'src/components/Modal/Map';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';

// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { AddressAutofill, useAddressAutofillCore } from '@mapbox/search-js-react';
import UseAutocompletePopper from 'src/components/AAutocompleteInput';
import ALocationInputBox from 'src/components/ALocationInputBox';
import { FirstComponet, SecondComponet } from 'src/components/BDateTimeInputBox';
import { IoMdArrowDropup } from 'react-icons/io';
// import DropDownMenu from 'src/components/DropDownMenu';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaTruck } from 'react-icons/fa';
import Tabs from "../../components/Tabs"
// import { Axios } from 'axios';
import axios from "axios";
import ACreateTrip from 'src/components/ACreateTrip';
// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 3rem)',
  height: 'calc(100vh - 3rem)',
  bgcolor: 'rgba(255,255,255,0.95)',
  boxShadow: 1,
  borderRadius: 1.5,
  transition: 'all 0.2s ease-in',
  // overflowY:"scroll"
};

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

const ADateTimePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'DateTimePicker',
          'TimePicker',
          'DateRangePicker',
          'DateTimeRangePicker',
        ]}
      >
        <DemoItem label="">
          <DateTimePicker
            defaultValue={today}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default function UserTableRow({
  selected,
  name,
  vehicleType,
  company,
  role,
  isVerified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [mopen, setMOpen] = useState(false);
  const [address, setAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [fleet, setFleet] = useState();
  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [field, setField] = useState('');

  const access_token = import.meta.env.VITE_APP_MAPBOX_API_KEY;

  const handleOpenMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChange = (address) => {
    setAddress({ address });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };



  // label,
  // {text:, lat,long, date, time}
  // ALocationInputBox

  // async function getAutoFill() {
  //   const autofill = useAddressAutofillCore({ accessToken: access_token });
  //   // const ss =
  //   // const sessionToken = new SessionToken();
  //   const result = await autofill.suggest('Washington D.C.', { sessionToken: 'test-123' });
  //   // console.log("hello");
  //   console.log(result);
  // }
  // getAutoFill();
  // useEffect(() => {
  //   getAutoFill();
  // }, [])

  const handleMouseEnter = () => {
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(true);
  };

  // useEffect(() => {
  //   async function fetchFleets() {
  //     await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/getFleet?vehiclenum=${123}`)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         window.alert("Some error occurred");
  //       })
  //   }
  //   fetchFleets();
  // }, []);

  const handleChangeLocation = (ftext) => {
    const dumpick = pick;
    const dumPickAdd = pickAddress;
    if (!pick) {
      setPick(true);
      setField(ftext);
    }
  }

  return (
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
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="0.4">
          <Stack direction="column" alignItems="start" spacing={0.5}>
            <p className="text-sm">{vehicleType}</p>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Modal
        open={mopen}
        onClose={() => {
          setMOpen((mopen) => !mopen);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-hidden ">
          <div className="w-full h-full flex justify-start content-center flex-col pb-4 overflow-auto ">
            <div style={{ background: "rgba(255,255,255,0.7)" }} className="flex justify-between p-3 border-solid border-b-2 border-black bg-transparent backdrop-blur-lg sticky top-0 z-[1]">
              <div className="flex justify-center flex-row content-center">
                <p className="text-normal font-semibold">NL01AC4734</p>
              </div>
              <div className="flex justify-center content-center gap-3 px-2">
                <button>
                  <FontAwesomeIcon icon={faBell} />
                </button>
                <button>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      setMOpen(false);
                    }}
                  />
                </button>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.4)" }} className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-11 z-[1]">
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                Available
              </button>
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                En-route
              </button>
              <button
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className="flex items-center relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse active:border- duration-300 active:text-green-900"
                onClick={() => setIsOpen(!isOpen)}
              >
                Intransit
                {!isOpen ? (
                  <IoMdArrowDropdown className="h-3" />
                ) : (
                  <IoMdArrowDropup className="h-3" />
                )}
              </button>
              {/* {isOpen && ( */}
              <div className={'w-full h-full transition-all ease-out duration-500'}>
                <Tabs isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
              {/* )} */}
            </div>
            <div className='flex gap-4 w-full h-full p-4 mt-14 '>
              <div style={{ minHeight: "calc(100% - 2rem)", width: "70%" }} className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md overflow-hidden">
                <ModalMap pick={pick} setPick={setPick} pickAddress={locationIns} setPickAddress={setLocationIns} field={field} />
              </div>
              <div style={{ width: "30%" }} className="w-full h-full flex flex-col gap-4">
                <div className='h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'

                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>Origin</p>
                  <div className='flex flex-col h-fit w-full p-2'>
                    {locationIns && locationIns.origin.latitude ?
                      <p><span>Location: </span>{locationIns.origin.place_name}</p>
                      :
                      <button
                        className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100'
                        onClick={() => handleChangeLocation("origin")}
                      >Pick Location</button>
                    }

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          'DatePicker',
                          'DateTimePicker',
                          'TimePicker',
                          'DateRangePicker',
                          'DateTimeRangePicker',
                        ]}
                      >
                        <DemoItem label="" className="p-2 text-sm">
                          <DateTimePicker
                            className="p-2 text-sm"
                            defaultValue={today}
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                            onAccept={(newValue) => { setTime(time => newValue) }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                </div>
                {locationIns && locationIns.origin ?
                  <div className='h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'

                  >
                    <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>Destination</p>
                    <div className='flex flex-col h-fit w-full p-2'>
                      {locationIns && locationIns.destination.latitude ?
                        <p><span>Location: </span>{locationIns.destination.place_name}</p>
                        :
                        <button
                          className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100'
                          onClick={() => handleChangeLocation("destination")}
                        >Pick Location</button>
                      }

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            'DatePicker',
                            'DateTimePicker',
                            'TimePicker',
                            'DateRangePicker',
                            'DateTimeRangePicker',
                          ]}
                        >
                          <DemoItem label="" className="p-2 text-sm">
                            <DateTimePicker
                              className="p-2 text-sm"
                              defaultValue={today}
                              views={['year', 'month', 'day', 'hours', 'minutes']}
                              onAccept={(newValue) => { setTime(time => newValue) }}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>

                  </div>
                  : <></>
                }

              </div>
              {/* <ACreateTrip /> */}
            </div>

            {/* ----------------Create a trip------------- */}

            {/* <div className="w-full flex justify-center items-center flex-col ">
              <div className="flex justify-start items-center gap-4 w-full p-4 flex-col">
                <div className="w-full  flex justify-center items-center flex-wrap gap-4">
                  <ALocationInputBox statusUpdate={"Origin"} />
                  <ALocationInputBox statusUpdate={"Destination"} />
                </div>
              </div>
              <button
                className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                style={{ width: 'calc(100% - 40px)' }}
              >
                Create Trip
              </button>
            </div> */}
            {/* ----------------Route timeline------------ */}
            {/* <div className="w-full flex justify-center items-center flex-col py-4 px-3">
              <div className="flex justify-center items-center flex-col w-fit">
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 bg-green-900 rounded-full ml-3"></div>
                  <div
                    className="h-1 bg-gray-500"
                    style={{ minWidth: '15rem', maxWidth: 'calc(100vw - 14rem)' }}
                  ></div>
                  <div className="w-5 h-5 bg-red-900 rounded-full mr-3"></div>
                </div>
                <div className="flex justify-between items-center w-full font-semibold text-normal">
                  <p>Mumbai</p>
                  <p>Delhi</p>
                </div>
              </div>
            </div> */}
            {/* ----------------Enroute for pickup------------- */}
            {/* <FirstComponet
              vehicalStatus={'Enroute for pickup'}
              location={'Mumbai, Maharashtra, India'}
            /> */}
            {/* ----------------At pickup------------- */}
            {/* <SecondComponet
              vehicalStatus={'At pickup'}
              information={'Arrival Information:'}
              location={'Mumbai, Maharashtra, India'}
              time={'19:00:00'}
            /> */}
            {/* ---------------In Transit---------------- */}
            {/* <SecondComponet
              vehicalStatus={'In Transit'}
              information={'Vehicle Journey Start Information:'}
              location={'Mumbai, Maharashtra, India'}
              time={'19:00:00'}
            /> */}
          </div>

        </Box>
      </Modal>
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