import React, { useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import UseAutocompletePopper from 'src/components/AAutocompleteInput';


const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

const ALocationInputBox = (props,) => {

  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const OnClickLocation = ()=>{
    setLocationIns({locationIns})
  }

  return (
    <div>
       {/* <div className='h-full flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                    style={{ width: "calc(50% - 15px)" }}
                  >
                    <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>{props.StatusUpdate}</p>
                    <div className='w-full p-2'>

                      <UseAutocompletePopper locationIns={{ text: `${latitude},${longitude}`}}/>

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

                  </div> */}

                   <div className='h-full flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                    style={{ width: "calc(40rem - 15px)" }}
                  >
                    <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>{props.statusUpdate}</p>
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
    </div>
  )
}



export default ALocationInputBox