import { faBell, faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, CircularProgress, Modal } from '@mui/material';
import Tabs from '../../../components/Tabs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import ModalMap from 'src/components/Modal/Map';
import AtabHeader from 'src/components/AtabHeader';
import AinfoBox from 'src/components/AinfoBox';
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

export default function EnroutePickupFleetModal({
  vehicleNumber,
  vehicleData,
  status,
  mopen,
  setMOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationIns, setLocationIns] = useState({ origin: 0 });
  const [pick, setPick] = useState(false);
  const [field, setField] = useState('');

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns]);

  console.log(vehicleData);
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
          <AtabHeader
            tabHeader={`Enroute for Pickup | ${vehicleData?vehicleNumber:""}`}
            cancelIcon={<FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                setMOpen(false);
              }}
            />}
            />
            <div
              style={{ background: 'rgba(255,255,255,0.4)' }}
              className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-11 z-[1]"
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
                style={{ minHeight: 'calc(100% - 2rem)', width: '65%' }}
                className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md"
              >
                <ModalMap
                  pick={pick}
                  setPick={setPick}
                  pickAddress={locationIns}
                  setPickAddress={setLocationIns}
                  field={field}
                  status={1}
                  current_fleet={vehicleData?.current_fleet ? vehicleData?.current_fleet[0] : {}}
                />
              </div>
              <div style={{ width: '35%' }} className="w-full h-full flex flex-col gap-4">
                {vehicleData &&
                vehicleData.current_fleet &&
                vehicleData.current_fleet[0].fleetstatus['enroute-for-pickup'] ? (
                  ""
                ) : (
                  <AinfoBox
                  status="At Pickup"
                  location="Delhi"
                  time="at 5:13 PM, 18-Oct"
                  button ="Mark Departed"
                  />
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}