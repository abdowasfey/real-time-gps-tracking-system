import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await api.get("/machines");
        setMachines(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#16181d",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#fff"
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "30px",
          letterSpacing: "0.5px"
        }}
      >
        🚗 السيارات
      </h1>

      {/* Grid */}
      {machines.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {machines.map((m) => (
            <div
              key={m.mac_id}
              style={{
                background: "#1f222a",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                transition: "transform 0.15s ease"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "14px", color: "#9ca3af" }}>
                موديل السيارة
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "18px",
                  fontWeight: "600"
                }}
              >
                {m.model}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "#888", fontSize: "15px" }}>
          لا توجد سيارات مسجلة بعد
        </div>
      )}
    </div>
  );
}
