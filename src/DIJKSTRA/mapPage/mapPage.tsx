import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../../App";
import "../mapPage/mapPage.css";

const MapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const destination = useMemo(() => ({ lat: -25.585518, lng: -49.406884}), []);
  const origin = useMemo(() => ({ lat: -25.580250, lng: -49.401800 }), []);

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
  }, [origin, destination]); 

  const position =[ 
    {lat:-25.584140, lng:-49.403422},
    {lat:-25.580937, lng: -49.402739},
    {lat:-25.581813, lng: -49.400311},
    {lat: -25.582552, lng: -49.404863},
    {lat: -25.580250, lng: -49.401800 }
  ] 
  console.log("Olha o position: ", position)
  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  /*useEffect(() => {
    position.forEach((mark, index) => {
      console.log(`Olha o mark [${index}]: `, mark);
    });
  }, [position]);*/

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={`${REACT_APP_GOOGLE_API_KEY}`}
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position[0]}
          zoom={20}
        >
        
          {directions && (
            <DirectionsRenderer directions={directions} />
          )}    

          {position.map((mark, index) => (
           <Marker
               key={index}
               position={mark}
               onLoad={() => console.log(`Marker ${index} loaded at position: `, mark)}
           />
            ))}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
