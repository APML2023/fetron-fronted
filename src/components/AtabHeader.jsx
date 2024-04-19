// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import NotificationsPopover from 'src/layouts/dashboard/common/notifications-popover';

const AtabHeader = (props) => {
  return (
       <div
              style={{ background: 'rgba(255,255,255,0.7)' }}
              className="flex justify-between p-3 border-solid border-b-2 border-black bg-transparent backdrop-blur-lg sticky top-0 z-[1]"
            >
              <div className="flex justify-center flex-row content-center">
                <p className="text-normal font-semibold">
                  {/* Enroute for pickup {vehicleData?.vehicleNumber} */}
                  {props.tabHeader}
                  {props.vehNo}
                </p>
              </div>
              <div className="flex justify-center content-center gap-3 px-2">
                <button>
                  <NotificationsPopover/>
                </button>
                <button>
                    {props.cancelIcon}
                  {/* <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      setMOpen(false);
                    }}
                  /> */}
                </button>
              </div>
            </div> 
  )
}

export default AtabHeader