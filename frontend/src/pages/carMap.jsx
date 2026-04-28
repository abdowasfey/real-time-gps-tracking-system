// src/pages/CarMap.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= ICON ================= */
const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  iconSize: [32, 32],
});

/* ================= Smooth Move ================= */
function MoveMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;
    map.panTo(position, { animate: true, duration: 1 });
  }, [position, map]);

  return null;
}

/* ================= PAGE ================= */
export default function CarMap() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== Fetch single car only ===== */
  const fetchCar = useCallback(async () => {
    try {
      const res = await fetch(`/api/location/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      setCar(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching car:", err);
    }
  }, [id]);

  /* ===== Polling every 5s ===== */
  useEffect(() => {
    fetchCar();
    const interval = setInterval(fetchCar, 5000);
    return () => clearInterval(interval);
  }, [fetchCar]);

  /* ===== Loading ===== */
  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "40vh", fontSize: 20 }}>
        Loading map...
      </div>
    );
  }

  if (!car) {
    return <div style={{ textAlign: "center" }}>Car not found</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[car.lat, car.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[car.lat, car.lng]} icon={carIcon}>
          <Popup>
            <b>{car.name}</b>
            <br />
            Status: {car.status}
          </Popup>
        </Marker>

        <MoveMap position={[car.lat, car.lng]} />
      </MapContainer>
    </div>
  );
}
