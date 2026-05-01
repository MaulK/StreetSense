"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "../lib/supabase";

// User marker icon (Blue)
const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Other reports marker icon (Red)
const reportIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationMarker({ location, setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return location.lat !== "" ? (
    <Marker position={[location.lat, location.lng]} icon={userIcon}>
      <Popup>Lokasi laporan Anda</Popup>
    </Marker>
  ) : null;
}

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15);
  }, [center, map]);
  return null;
}

export default function ReportMap({ location, setLocation }) {
  const [center, setCenter] = useState([-6.2088, 106.8456]); // Default to Jakarta
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (location.lat) {
      setCenter([location.lat, location.lng]);
    }
  }, [location]);

  useEffect(() => {
    async function fetchReports() {
      const { data } = await supabase.from('road_reports').select('*');
      if (data) setReports(data);
    }
    fetchReports();
  }, []);

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden", zIndex: 0, marginTop: "10px", border: "1px solid #ddd" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <MapUpdater center={center} />
        <LocationMarker location={location} setLocation={setLocation} />
        
        {reports.map((report) => (
          report.latitude && report.longitude ? (
            <Marker key={report.id} position={[report.latitude, report.longitude]} icon={reportIcon}>
              <Popup>
                <strong>{report.road_name}</strong><br/>
                <span style={{ color: report.severity === 'High' ? 'red' : 'orange' }}>Severity: {report.severity}</span><br/>
                {report.description}
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}
