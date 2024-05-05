import { faBell, faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Box, CircularProgress, Modal, Snackbar } from '@mui/material';
import Tabs from '../../../components/Tabs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import ModalMap from 'src/components/Modal/Map';
import AtabHeader from 'src/components/AtabHeader';
import AinfoBox from 'src/components/AinfoBox';
import { FaHome } from 'react-icons/fa';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
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
};

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function UnloadingVehicle({
    vehicleNumber,
    vehicleData,
    status,
    mopen,
    setMOpen,
    setFetchAgain
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [locationIns, setLocationIns] = useState({ origin: 0 });
    const [pick, setPick] = useState(false);
    const [field, setField] = useState('');
    const [pickupTime, setPickupTime] = useState();
    const [unloadingD, setUnloadD] = useState({
        unloading: {
            start: "",
            end: ""
        }
    })
    const [createTripStatus, setCreateTripStatus] = useState(false);
    const [notData, setNotData] = useState(false);
    const [waypoints, setWaypoints] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (vehicleData &&
            vehicleData?.current_fleet[0]?.fleetstatus?.intransit
        ) {
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            var cctime = vehicleData.current_fleet[0].fleetstatus.intransit;
            // cctime = cctime[cctime.length - 1].time;
            cctime = `${cctime.split('T')[1].split('.')[0].substring(0, 5)}, ${cctime.split('T')[0]} `;
            // console.log(cctime);
            setPickupTime(cctime);
            // const dateTime = cctime.toLocaleDateString('en-US', dateOptions);
            // console.log(dateTime);
        }

    }, [vehicleData])

    const handleUnloadingStarted = async () => {
        if (!unloadingD.unloading.start || !unloadingD.unloading.end) {
            window.alert("Please fill all fields")
            setCreateTripStatus('');
            return;
        }
        const dataPost = {
            vehicleNumber: vehicleNumber,
            fleetId: vehicleData.current_round,
            data: { ...unloadingD.unloading }
        }
        console.log(dataPost);
        await axios
            .post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/unloading`, dataPost)
            .then((res) => {
                setNotData({ msg: "Success", type: "success" });
                navigate("/fleetMonitoring/completed");
                // setFetchAgain(true);
                setCreateTripStatus('');
                setMOpen(false);
                // window.alert('Success');
                // setMOpen((mopen) => !mopen);
                // setMOpen((mopen) => !mopen);
            })
            .catch((err) => {
                setCreateTripStatus('');
                window.alert("Some error occurred");
            });
    }

    // console.log(vehicleData);
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
                    <Snackbar open={notData ? true : false} autoHideDuration={6000} onClose={() => { setNotData(false) }}>
                        <Alert
                            onClose={() => { setNotData(false) }}
                            severity={notData ? notData.type : ""}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {notData ? notData.msg : ""}
                        </Alert>
                    </Snackbar>
                    <div className="w-full h-full flex justify-start content-center flex-col pb-4 overflow-auto ">
                        <AtabHeader
                            tabHeader={`Unloading | ${vehicleData ? vehicleNumber : ""}`}
                            setMOpen={setMOpen}
                        />
                        <div
                            style={{ background: 'rgba(255,255,255,0.4)' }}
                            className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-14 z-[1]"
                        >
                            <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                                Available
                            </button>
                            <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                                En-route
                            </button>
                            <button
                                className="flex items-center relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse active:border- duration-300 active:text-green-900"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                At-Pickup
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
                                className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md"
                            >
                                <ModalMap pick={pick} setPick={setPick}
                                    pickAddress={locationIns} setPickAddress={setLocationIns} field={field}
                                    status={vehicleData.current_status} current_fleet={vehicleData?.current_fleet ? vehicleData?.current_fleet[0] : {}}
                                    waypoints={waypoints} setWaypoints={setWaypoints}
                                    vehicleData={vehicleData}
                                // waypoints={waypoints} setWaypoints={setWaypoints}
                                />
                            </div>
                            <div style={{ width: '30%' }} className="w-full h-full flex flex-col gap-4">
                                <div className="w-full h-full flex flex-col gap-4 overflow-auto">
                                    {vehicleData?.current_fleet && vehicleData?.current_fleet[0] ?
                                        <div className="w-full flex justify-center items-center flex-col py-4 px-3">
                                            <p className="font-semibold">Route completed</p>
                                            <div className="flex justify-center items-center flex-col w-fit">
                                                <div className="flex justify-center items-center">
                                                    <div className="w-5 h-5 bg-red-900 rounded-full ml-3"></div>
                                                    <div
                                                        className="h-1 bg-gray-500"
                                                        style={{ minWidth: '15rem', maxWidth: 'calc(100vw - 14rem)' }}
                                                    ></div>
                                                    <div className="w-5 h-5 bg-green-900 rounded-full mr-3"></div>
                                                </div>
                                                <div className="flex justify-between w-full font-semibold text-sm">
                                                    <p className="w-1/3 p-1 bg-red-100">{vehicleData.current_fleet[0].origin.place_name}</p>
                                                    <p className="w-1/3 p-1 bg-green-100">{vehicleData.current_fleet[0].destination.place_name}</p>
                                                </div>
                                            </div>
                                        </div> : <></>
                                    }
                                    <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                                        <p className="text-normal font-semibold bg-cyan-100 w-full p-2">Unloading</p>

                                        <div className="flex flex-col h-fit w-full px-4 py-2 gap-6">
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex flex-col'>
                                                    <p>Unloading start:</p>
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
                                                                        const dumUnload = { ...unloadingD };
                                                                        dumUnload.unloading.start = newValue;
                                                                        setUnloadD({ ...dumUnload })
                                                                    }}
                                                                />
                                                            </DemoItem>
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p>Unloading completed:</p>
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
                                                                        const dumUnload = { ...unloadingD };
                                                                        dumUnload.unloading.end = newValue;
                                                                        setUnloadD({ ...dumUnload })
                                                                    }}
                                                                />
                                                            </DemoItem>
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                                <button
                                                    className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                                                    style={{ width: 'calc(100%)' }}
                                                    onClick={() => {
                                                        setCreateTripStatus('loading');
                                                        handleUnloadingStarted();
                                                        // handleCreateTrip();
                                                    }}
                                                // disabled={createTripStatus == 'loading'}
                                                >
                                                    {createTripStatus == 'loading' ? (
                                                        <CircularProgress size={22} color="grey" />
                                                    ) : (
                                                        <span>unloading completed</span>
                                                    )}
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}