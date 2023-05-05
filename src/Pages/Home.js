import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '400px'
};

const center = {
  lat: 30.733315,
  lng: 76.779419
}

const markerList = [
  {
    name: "Chandigarh",
    lat: 30.733315,
    lng: 76.779419
  },
  {
    name: "Ludhiana",
    lat: 30.900965,
    lng: 75.857277
  },
  {
    name: "Himachal",
    lat: 31.817261,
    lng: 77.302757
  },
]

const Home = () => {
  // useJsApiLoader and LoadScript-gave various props but LOADSCRIPT(gave more props than jsApiLoader)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDU1M27ycDQ6o-u15AX2SfMbv36Oyec5J4"
  })

  const [map, setMap] = useState(null)

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return (
    <div className='d-flex justify-content-center p-5'>
      {
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {markerList.map((places) => {
              let lat = places.lat
              let lng = places.lng

              return (
                <Marker
                  position={{ lat: lat, lng: lng }}
                >
                  <div>{places.name}</div>
                </Marker>
              )
            })}
          </GoogleMap>
        ) : <></>
      }
      {/* or I also used like this without onLoad function */}
      {/* <LoadScript googleMapsApiKey="AIzaSyDU1M27ycDQ6o-u15AX2SfMbv36Oyec5J4">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onUnmount={onUnmount}
        >
          <></>
        </GoogleMap >
      </LoadScript> */}
    </div>
  )
}

export default Home;