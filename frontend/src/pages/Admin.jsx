import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [machineModel, setMachineModel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, machinesRes] = await Promise.all([
        api.get("/users"),
        api.get("/machines")
      ]);
      setUsers(usersRes.data.data || usersRes.data);
      setMachines(machinesRes.data.data || machinesRes.data);
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات من السيرفر");
    }
  };

  const handleAddMachine = async () => {
    if (!machineModel.trim()) return alert("الرجاء كتابة موديل العربية");
    try {
      await api.post("/machines", {
        user_id: selectedUser.user_id,
        model: machineModel
      });
      setMachineModel("");
      fetchData();
      alert("تمت إضافة العربية بنجاح ✅");
    } catch (err) {
      alert("فشل في إضافة العربية ❌");
    }
  };

  const handleDeleteMachine = async (mac_id) => {
    try {
      await api.delete(`/machines/${mac_id}`);
      fetchData();
      alert("تم حذف العربية بنجاح ✅");
    } catch {
      alert("فشل في حذف العربية ❌");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#2c2c2c", color: "#fff", padding: "20px", fontFamily: "sans-serif", direction: "rtl" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* المستخدمين */}
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div style={{ flex: 1, background: "#3a3a3a", borderRadius: "8px", padding: "15px" }}>
            <h3 style={{ marginBottom: "10px" }}>👤 المستخدمين</h3>
            {users.map(u => (
              <div
                key={u.user_id}
                onClick={() => setSelectedUser(u)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  background: selectedUser?.user_id === u.user_id ? "#007bff" : "#4a4a4a"
                }}
              >
                {u.name}
              </div>
            ))}
            {error && <p style={{ color: "#ff5555" }}>{error}</p>}
          </div>

          {/* تفاصيل المستخدم */}
          <div style={{ flex: 2, background: "#3a3a3a", borderRadius: "8px", padding: "20px" }}>
            {selectedUser ? (
              <>
                <h3 style={{ marginBottom: "15px" }}>👤 {selectedUser.name}</h3>

                {/* إضافة عربية */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <input
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    placeholder="أدخل موديل العربية (مثال BMW)"
                    style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #555", background: "#222", color: "#fff" }}
                  />
                  <button
                    onClick={handleAddMachine}
                    style={{ padding: "10px 15px", background: "#28a745", border: "none", borderRadius: "5px", cursor: "pointer", color: "#fff" }}
                  >
                    ➕ إضافة
                  </button>
                </div>

                <hr style={{ borderColor: "#555", marginBottom: "15px" }} />

                <h4 style={{ marginBottom: "10px" }}>🚗 العربات المسجلة:</h4>
                {machines.filter(m => m.user_id === selectedUser.user_id).length > 0 ? (
                  machines
                    .filter(m => m.user_id === selectedUser.user_id)
                    .map(m => (
                      <div key={m.mac_id} style={{ background: "#4a4a4a", padding: "12px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        موديل: <strong>{m.model}</strong>
                        <button
                          onClick={() => handleDeleteMachine(m.mac_id)}
                          style={{ background: "#d9534f", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", color: "#fff" }}
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    ))
                ) : (
                  <p style={{ color: "#aaa" }}>لا توجد عربات مسجلة لهذا المستخدم.</p>
                )}
              </>
            ) : (
              <p style={{ textAlign: "center", marginTop: "50px", color: "#aaa" }}>اضغط على اسم مستخدم لعرض عرباته 🚗</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
