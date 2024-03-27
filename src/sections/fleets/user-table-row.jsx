import { useEffect, useState } from 'react';
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

import { MapProvider } from "react-simple-maps"
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
// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 3rem)',
  height: 'calc(100vh - 3rem)',
  bgcolor: 'rgba(255,255,255,0.95)',
  // border: '2px solid #000',
  boxShadow: 1,
  borderRadius: 1.5,
  transition: 'all 0.2s ease-in',
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
  )
}

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


  const access_token = import.meta.env.VITE_APP_MAPBOX_API_KEY;

  const handleOpenMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChange = address => {
    setAddress({ address });
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });

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


  return (
    <>
      <TableRow tabIndex={-1} role="checkbox" selected={selected}
        className=' hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out'
        onClick={(e) => { setMOpen(mopen => !mopen) }}
      >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="0.4">
          <Stack direction="column" alignItems="start" spacing={0.5}>
            <p className='text-sm'>{vehicleType}</p>
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
        onClose={() => { setMOpen(mopen => !mopen) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='bg-transparent'
      >
        <Box sx={style} className="overflow-hidden " >
          <div className='w-full h-full flex justify-start content-center flex-col pb-4 overflow-auto'>
            <div className='flex justify-between p-3 bg-slate-300'>
              <div className='flex justify-center content-center'>
                <p className='text-normal font-semibold'>23JhU987</p>
              </div>
              <div className='flex justify-center content-center gap-3 px-2'>
                <button><FontAwesomeIcon icon={faBell} /></button>
                <button><FontAwesomeIcon icon={faXmark} onClick={() => { setMOpen(false) }} /></button>
              </div>
            </div>
            <div className='flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm'>
              <div className='rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit'>Available</div>
              <div className='rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit'>En-route</div>
              <div className='relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse'>
                Intransit
              </div>
            </div>
            <div className='w-full h-96 overflow-hidden ' style={{ minHeight: "50vh" }}>
              <ModalMap />
            </div>
            {/* ----------------Create a trip------------- */}
            {/* <div className='w-full flex justify-center items-center flex-col'>
              <div className='flex justify-start items-center gap-4 w-full p-4 flex-col'>
                <div className='w-full flex justify-center items-center flex-wrap gap-4'>
                  <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                    style={{ width: "calc(50% - 15px)" }}
                  >
                    <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>Origin</p>
                    <div className='w-full p-2'>
                      <UseAutocompletePopper />

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
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>

                  </div>
                  <div className='flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                    style={{ width: "calc(50% - 15px)" }}
                  >
                    <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>Destination</p>
                    <div className='w-full p-2'>
                      <UseAutocompletePopper />
                      <div className='w-full text-sm'>
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

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <button className='rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2'
                style={{ width: "calc(100% - 40px)" }}
              >Create Trip</button>
            </div> */}
            {/* ----------------Enroute for pickup------------- */}
            {/* <div className='w-full flex justify-center items-center flex-col'>
              <div className='w-full flex justify-between items-center flex-wrap p-4 flex-col gap-3'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full'
                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'><span className='font-bold'>Enroute for Pickup</span></p>
                  <div className='w-full p-2 flex justify-start items-start flex-col gap-2 px-4'>
                    <div className='flex gap-1 justify-start items-center px-2'><div className='h-3 w-3 bg-green-900 animate-pulse rounded-xl'></div> Mumbai, Maharashtra, India</div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark as Enrouted for Pickup</button>

                    </div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark Arrived</button>

                    </div>
                  </div>

                </div>
              </div>
            </div> */}
            {/* ----------------At pickup------------- */}
            {/* <div className='w-full flex justify-center items-center flex-col'>
              <div className='w-full flex justify-between items-center flex-wrap p-4 flex-col gap-3'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full'
                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'><span className='font-bold'>At Pickup</span></p>
                  <div className='w-full px-4 py-2 flex justify-start items-start flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <p className='font-bold'>Arrival Information:</p>
                      <div className='flex gap-4 justify-start items-start flex-wrap pl-6'>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faLocation} /> <span className='font-semibold'>Mumbai, Maharashtra, India</span></div>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faClock} /><span className='font-semibold'>19:00:00</span></div>
                      </div>
                    </div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark Departed</button>

                    </div>
                  </div>

                </div>
              </div>
            </div> */}
            {/* ---------------In Transit---------------- */}
            {/* <div className='w-full flex justify-center items-center flex-col'>
              <div className='w-full flex justify-between items-center flex-wrap p-4 flex-col gap-3'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full'
                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'><span className='font-bold'>In transit</span></p>
                  <div className='w-full p-2 flex justify-start items-start flex-col gap-2'>
                    <div className='flex flex-col gap-2 mb-2 px-4'>
                      <p className='font-bold'>Vehicle Journey Start Information:</p>
                      <div className='flex gap-4 justify-start items-start flex-wrap pl-6'>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faLocation} /> <span className='font-semibold'>Mumbai, Maharashtra, India</span></div>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faClock} /><span className='font-semibold'>19:00:00</span></div>
                      </div>
                      <div className='w-full flex justify-start items-center flex-wrap'>
                        <ADateTimePicker />
                        <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark Arrived</button>

                      </div>
                    </div>


                  </div>

                </div>
              </div>
            </div> */}
          </div>



          {/* </div> */}

        </Box>
      </Modal >
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
