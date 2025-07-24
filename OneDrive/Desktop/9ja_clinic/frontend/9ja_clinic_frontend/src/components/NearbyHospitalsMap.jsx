import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to update map center
const SetMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};

const NearbyHospitalsMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [error, setError] = useState("");

  // Hardcoded hospitals for now
  const hospitals = [
    {
      name: "UCH, Ibadan",
      location: "Ibadan",
      coords: [7.4438, 3.8856],
    },
    {
      name: "Lautech Teaching Hospital",
      location: "Ogbomosho",
      coords: [8.1218, 4.2381],
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
      },
      (err) => {
        console.error(err);
        setError("Location access denied.");
      }
    );
  }, []);

  return (
    <div className="h-[400px] rounded-xl overflow-hidden shadow-md mt-4">
      {userPosition ? (
        <MapContainer center={userPosition} zoom={13} className="w-full h-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetMapCenter position={userPosition} />
          <Marker position={userPosition}>
            <Popup>Your Current Location</Popup>
          </Marker>

          {hospitals.map((hospital, index) => (
            <Marker key={index} position={hospital.coords}>
              <Popup>
                <strong>{hospital.name}</strong> <br />
                {hospital.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : error ? (
        <div className="text-red-500 p-4">{error}</div>
      ) : (
        <div className="p-4 text-gray-500">Getting your location...</div>
      )}
    </div>
  );
};

export default NearbyHospitalsMap;
