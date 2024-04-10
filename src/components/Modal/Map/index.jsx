import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Map, { AttributionControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl';

import GeocoderControl from './geocoder-control';
import ControlPanel from './control-panel';
import Skeleton from '@mui/material/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import UseAutocomplete from 'src/components/AAutocompleteInput';
import AAutoCI2 from 'src/components/AAutoCI2';




const parkLayer = {
    id: 'landuse_park',
    type: 'fill',
    source: 'mapbox',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park'],
    paint: {
        'fill-color': '#4E3FC8'
    }
};

// eslint-disable-next-line
const TOKEN = import.meta.env.VITE_APP_MAPBOX_API_KEY; // Set your mapbox token here


export default function ModalMap({ pick, setPick, pickAddress, setPickAddress, field, status, current_fleet }) {
    const [userLocation, setUserLocation] = React.useState({ latitude: "", longitude: "" });
    const [viewState, setViewState] = React.useState({
        longitude: "",
        latitude: "",
        zoom: 10
    });
    const mapRef = React.useRef();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setViewState({
                ...viewState,
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
            })
            setUserLocation({
                ...userLocation,
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
            })
            // console.log(e.coords);
        })
    }, [])

    React.useEffect(() => {
        // console.log(viewState);
    }, [viewState])



    const [address, setAddress] = React.useState({ longitude: "", latitude: "", place_name: "" });

    // const handleManualInputChange = (event, stateProperty) => {
    //     const newAddress = { ...address };
    //     newAddress[stateProperty] = event.target.value;
    //     // window.alert(newAddress)
    //     setAddress(newAddress);
    // };

    // const search = new SearchBoxCore({ accessToken: import.meta.env.VITE_APP_MAPBOX_API_KEY });
    // const session = new SearchSession(search);
    // console.log(session);

    React.useEffect(() => {
        if (address.latitude && address.longitude) {
            // window.alert(address);
            const dumAddress = { ...address };
            setViewState({
                ...viewState,
                latitude: address.latitude,
                longitude: address.longitude,
            })
            setPick(false);
            var dumPickAdd = { ...pickAddress };
            dumPickAdd[field] = dumAddress;
            setPickAddress({ ...dumPickAdd });
            // moveCamera();
            mapRef.current?.flyTo({ center: [dumAddress.longitude, dumAddress.latitude], duration: 2000, zoom: 14 });

        }
    }, [address])

    // console.log(current_fleet);

    return (
        <>{viewState && viewState.latitude && viewState.longitude ?
            <div className='relative w-full h-full'>
                <>
                    <Map
                        ref={mapRef}
                        className='z-[1]'
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={TOKEN}
                        pitch={0}
                        bearing={0}
                    >
                        <>
                            {pick ?
                                <div style={{ fontSize: "1rem" }} className='text-normal flex flex-col absolute top-2 left-2 z-[2] bg-slate-100 rounded p-3 w-fit gap-2'>
                                    <p style={{ fontSize: "1rem" }} className='text-normal'>Search here...</p>
                                    <div>
                                        {/* <UseAutocomplete /> */}
                                        <AAutoCI2
                                            address={address}
                                            setAddress={setAddress}

                                        // setAddress={setAddress}
                                        // handleManualInputChange={handleManualInputChange}
                                        // streetAndNumber={address.streetAndNumber}
                                        />
                                    </div>

                                </div>
                                : <></>
                            }
                        </>
                        <>
                            {status == 0 ?
                                <>
                                    {pickAddress && pickAddress.origin && pickAddress.origin.latitude ?
                                        <Marker latitude={pickAddress.origin.latitude} longitude={pickAddress.origin.longitude}
                                            color='red'
                                        // draggable={true}
                                        ></Marker>
                                        : <></>
                                    }

                                    {pickAddress && pickAddress.destination && pickAddress.destination.latitude ?
                                        <Marker latitude={pickAddress.destination.latitude} longitude={pickAddress.destination.longitude}
                                            color='green'
                                        // draggable={true}
                                        ></Marker>
                                        : <></>
                                    }
                                </>
                                : <></>
                            }
                        </>

                        <>
                            {status == 1 ?
                                <>
                                    {current_fleet && current_fleet.origin && current_fleet.destination ?
                                        <>
                                            <Marker latitude={current_fleet.origin.latitude} longitude={current_fleet.origin.longitude}
                                                color='red'
                                            >
                                            </Marker>
                                            <Marker latitude={current_fleet.destination.latitude} longitude={current_fleet.destination.longitude}
                                                color='green'
                                            // draggable={true}
                                            ></Marker>
                                            {pickAddress && pickAddress.origin && pickAddress.origin.latitude ?
                                                <Marker latitude={pickAddress.origin.latitude} longitude={pickAddress.origin.longitude}
                                                >
                                                    <div className='h-10 w-10 bg-sky-400 rounded-full' style={{ background: "rgba(87, 190, 250,0.4)" }}>
                                                        <div className='absolute center h-3 w-3 bg-sky-500 rounded-full'
                                                            style={{
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                            }}
                                                        ></div>
                                                    </div>
                                                </Marker>

                                                : <></>
                                            }
                                        </>
                                        : <></>
                                    }

                                </>
                                : <></>
                            }
                        </>


                        <FullscreenControl />
                        <GeolocateControl />
                        {/* <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}
                        >
                            <div className='h-20 w-20 bg-sky-400 rounded-full' style={{ background: "rgba(87, 190, 250,0.4)" }}>
                                <div className='absolute center h-5 w-5 bg-sky-500 rounded-full'
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                ></div>
                            </div>
                        </Marker> */}
                    </Map >
                </>

            </div >

            :
            <div className='flex justify-center items-center w-full h-full flex-col'>
                {/* <CircularProgress /> */}
                <p>Loading map...</p>
                <Skeleton className='bg-sky-900' animation="pulse" variant="rounded" style={{ width: "calc(100% - 1rem)", height: "calc(100% - 1rem)" }} />
            </div>

        }

            {/* <ControlPanel /> */}
        </>
    );
}