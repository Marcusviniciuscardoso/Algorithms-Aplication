import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../../App";
import "../mapPage/mapPage.css";

const MapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const destination = useMemo(() => ({ lat: -25.580942, lng: -49.404481 }), []);
  const origin = useMemo(() => ({ lat: -25.584646, lng: -49.407678 }), []);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        console.log("Olha o status: "+ status);
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);  // Use setState do hook para atualizar as direções
        } else {
          console.error(`Error fetching directions: ${result}`);
        }
      }
    );
  }, [origin, destination]); // O useEffect será executado sempre que origin ou destination mudarem

  const position = {
    lat: -25.584646,
    lng: -49.407678,
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={`${REACT_APP_GOOGLE_API_KEY}`}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={20}
        >
          {directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
