import React, { useState, useCallback, useRef, memo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import styles from "./styles";

const API_KEY = "AIzaSyDLg1rFmG08zo7CNjmwwY9fORRtKC6AU_o";
const libraries = ["places"];

const containerStyle = {
  width: "100vw",
  height: "500px",
};

const center = {
  lat: 16.047079,
  lng: 108.20623,
};

const options = {
  styles,
  disableDefaultUI: true,
  zoomControl: true,
};

function ShynnMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [maker, setMaker] = useState(center);

  const onMapClick = useCallback((event) => {
    setMaker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
  }, []);
  if (loadError) return "Error loading google map API";
  if (!isLoaded) return "Loading Map...";

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      <Marker position={maker} />
    </GoogleMap>
  );
}

export default memo(ShynnMap);

// const [map, setMap] = React.useState(null);

// const onLoad = React.useCallback(function callback(map) {
//   const bounds = new window.google.maps.LatLngBounds();
//   map.fitBounds(bounds);
//   setMap(map);
//   console.log(map);
// }, []);

// const onUnmount = React.useCallback(function callback(map) {
//   setMap(null);
// }, []);
