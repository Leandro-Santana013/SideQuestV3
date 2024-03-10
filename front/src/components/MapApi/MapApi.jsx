import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"

function LocationMarker({ pos, onMove }) {
  return (
    <Marker
      position={pos}
      draggable
      autoPan
      eventHandlers={{
        moveend: (event) => {
          onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
        }
      }}
    />
  );
}
export const MapApi = () => {
  const [markerPos, setMarkerPos] = useState([51.505, -0.09]);

  return (
    <>
      <MapContainer
      style={{height: "inherit"}}
        center={[51.505, -0.09]}
        zoom={13}
        maxZoom={18}
        bounceAtZoomLimits={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onMove={setMarkerPos} pos={markerPos} />
      </MapContainer>
      <p>lat: {markerPos[0]}</p>
      <p>lng: {markerPos[1]}</p>
    </>
  );
}

