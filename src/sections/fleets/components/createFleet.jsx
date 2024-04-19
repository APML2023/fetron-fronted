import { faBell, faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, CircularProgress, Modal } from '@mui/material';
import Tabs from '../../../components/Tabs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import ModalMap from 'src/components/Modal/Map';
import NotificationsPopover from 'src/layouts/dashboard/common/notifications-popover';
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
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

export default function CreateFleetModal({ vehicleNumber, vehicleType, status, mopen, setMOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [field, setField] = useState('');
  const [createTripStatus, setCreateTripStatus] = useState(false);
  const [components, setComponents] = useState([]);
  const removeComponent = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1); // Remove the component at the specified index
    setComponents(updatedComponents);
  };

 const addComponent = () =>{
    setComponents([...components,

<div key={components.length} className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                  <p className="text-normal font-semibold bg-green-500 w-full p-2">Route</p>
                  <div className="flex flex-col h-fit w-full p-2">
                    {locationIns && locationIns.origin.latitude ? (
                      <div className="flex justify-between font-semibold">
                        <p>
                          <span>Location: </span>
                          {locationIns.origin.place_name}
                        </p>

                        <button
                          // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                          onClick={() => {
                            setLocationIns({
                              ...locationIns,
                              origin: {
                                latitude: locationIns.origin.latitude,
                                longitude: locationIns.origin.longitude,
                                place_name: locationIns.origin.place_name,
                                time: newValue,
                              },
                            });
                            handleChangeLocation('origin');
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                        onClick={() => handleChangeLocation('origin')}
                      >
                        Pick Location
                      </button>
                    )}

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
                            onAccept={(newValue) => {
                              setLocationIns({
                                ...locationIns,
                                origin: {
                                  latitude: locationIns.origin.latitude,
                                  longitude: locationIns.origin.longitude,
                                  place_name: locationIns.origin.place_name,
                                  time: newValue,
                                },
                              });
                            }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
    </div>])
 }

  useEffect(() => {
    console.log(locationIns);
  }, [locationIns]);

  const handleChangeLocation = (ftext) => {
    const dumpick = pick;
    const dumPickAdd = pickAddress;
    if (!pick) {
      setPick(true);
      setField(ftext);
    }
  };


  const handleCreateTrip = async () => {
    const data = {
      vehicle: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
      },
      fleet: {
        ...locationIns,
      },
    };
    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/createtrip`, data)
      .then((res) => {
        setCreateTripStatus('');
        window.alert(res.data.msg);
        // setMOpen((mopen) => !mopen);
      })
      .catch((err) => {
        setCreateTripStatus('');
        window.alert(err.response.data.error);
      });
  };
  return (
    <>
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
            <div
              style={{ background: 'rgba(255,255,255,0.7)' }}
              className="flex justify-between p-3 border-solid border-b-2 border-black bg-transparent backdrop-blur-lg sticky top-0 z-[1]"
            >
              <div className="flex justify-center flex-row content-center">
                <p className="text-normal font-semibold">{vehicleNumber ? vehicleNumber : ''}</p>
              </div>
              <div className="flex justify-center content-center gap-3 px-2">
                <button>
                  {/* <FontAwesomeIcon icon={faBell} /> */}
                  <NotificationsPopover />
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
            <div
              style={{ background: 'rgba(255,255,255,0.4)' }}
              className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-11 z-[1]"
            >
              <button className="flex items-center relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse active:border- duration-300 active:text-green-900">
                Available
              </button>
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                En-route
              </button>
              <button
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className=" flex items-center rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit"
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
            <div className="flex gap-4 w-full h-full p-4 mt-14 ">
              <div
                style={{ minHeight: 'calc(100% - 2rem)', width: '70%' }}
                className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md "
              >
                <ModalMap
                  pick={pick}
                  setPick={setPick}
                  pickAddress={locationIns}
                  setPickAddress={setLocationIns}
                  field={field}
                  status={0}
                />
              </div>
              <div style={{ width: '30%' }} className="w-full h-full flex flex-col gap-4">
                <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                  <p className="text-normal font-semibold bg-cyan-100 w-full p-2">Origin</p>
                  <div className="flex flex-col h-fit w-full p-2">
                    {locationIns && locationIns.origin.latitude ? (
                      <div className="flex justify-between font-semibold">
                        <p>
                          <span>Location: </span>
                          {locationIns.origin.place_name}
                        </p>

                        <button
                          // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                          onClick={() => {
                            setLocationIns({
                              ...locationIns,
                              origin: {
                                latitude: locationIns.origin.latitude,
                                longitude: locationIns.origin.longitude,
                                place_name: locationIns.origin.place_name,
                                time: newValue,
                              },
                            });
                            handleChangeLocation('origin');
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                        onClick={() => handleChangeLocation('origin')}
                      >
                        Pick Location
                      </button>
                    )}

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
                            onAccept={(newValue) => {
                              setLocationIns({
                                ...locationIns,
                                origin: {
                                  latitude: locationIns.origin.latitude,
                                  longitude: locationIns.origin.longitude,
                                  place_name: locationIns.origin.place_name,
                                  time: newValue,
                                },
                              });
                            }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                 <div>
                    <div className='flex items-center'>
      <IoMdAddCircle className='text-blue-600' onClick={addComponent}/>
      <button onClick={addComponent} className='text-blue-600 ml-1'>via (click to add multiple points)</button>
                    </div>
      {components.map((component, index) => (
        <div key={index}>
          {component}
          <MdCancel className='text-blue-600 h-10 w-5' onClick={() => removeComponent(index)}/>
        </div>
      ))}
    </div>
                {locationIns && locationIns.origin ? (
                  <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                    <p className="text-normal font-semibold bg-cyan-100 w-full p-2">Destination</p>
                    <div className="flex flex-col h-fit w-full p-2">
                      {locationIns && locationIns.destination.latitude ? (
                        <div className="flex justify-between font-semibold">
                          <p>
                            <span>Location: </span>
                            {locationIns.destination.place_name}
                          </p>

                          <button
                            // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                            onClick={() => handleChangeLocation('destination')}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </div>
                      ) : (
                        // <p><span>Location: </span>{locationIns.destination.place_name}</p>
                        <button
                          className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                          onClick={() => handleChangeLocation('destination')}
                        >
                          Pick Location
                        </button>
                      )}

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
                              // defaultValue={today}
                              views={['year', 'month', 'day', 'hours', 'minutes']}
                              onAccept={(newValue) => {
                                setLocationIns({
                                  ...locationIns,
                                  destination: {
                                    latitude: locationIns.destination.latitude,
                                    longitude: locationIns.destination.longitude,
                                    place_name: locationIns.destination.place_name,
                                    time: newValue,
                                  },
                                });
                              }}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {locationIns && locationIns.origin && locationIns.destination ? (
                  <button
                    className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                    style={{ width: 'calc(100%)' }}
                    onClick={() => {
                      setCreateTripStatus('loading');
                      handleCreateTrip();
                    }}
                    disabled={createTripStatus == 'loading'}
                  >
                    {createTripStatus == 'loading' ? (
                      <CircularProgress size={22} color="grey" />
                    ) : (
                      <span>Create Trip</span>
                    )}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
