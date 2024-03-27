import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Marker } from 'react-map-gl';

import GeocoderControl from './geocoder-control';
import ControlPanel from './control-panel';
import Skeleton from '@mui/material/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';




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


export default function ModalMap() {
    const [userLocation, setUserLocation] = React.useState();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setUserLocation({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude
            })
            console.log(e.coords);
        })
    }, [])

    // const search = new SearchBoxCore({ accessToken: import.meta.env.VITE_APP_MAPBOX_API_KEY });
    // const session = new SearchSession(search);
    // console.log(session);
    return (
        <>{userLocation && userLocation.latitude && userLocation.longitude ?
            <Map
                initialViewState={{
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    zoom: 12,
                    pitch: 0,
                    bearing: 0
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
                style={{
                    position: 'relative',
                    width: '100%', height: '100%', overflow: 'hidden'
                }}
            >
                {/* <Layer {...parkLayer} /> */}
                <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} anchor={'center'}
                    // pitchAlignment={'viewport'}
                    offset={[0, 0]}
                // style={{
                //     width: "50px",
                //     height: "50px",
                //     position: "relative",
                //     top: "-50px",
                //     left: "-25px",
                // }}
                // zoom={10}
                >
                    {/* <img sr */}
                    <div className='h-20 w-20 bg-sky-400 rounded-full' style={{ background: "rgba(87, 190, 250,0.4)" }}>
                        <div className='absolute center h-5 w-5 bg-sky-500 rounded-full'
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        ></div>
                    </div>
                    {/* <FontAwesomeIcon icon={faLocationDot} className='text-4xl text-orange-600'
                        
                    /> */}
                </Marker>
                {/* <GeocoderControl showUserLocation={true} mapboxAccessToken={TOKEN} position="top-left" /> */}

            </Map >
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