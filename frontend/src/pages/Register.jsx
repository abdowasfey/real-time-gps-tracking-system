import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", data);
      alert("تم التسجيل بنجاح!");
      navigate("/login");
    } catch (error) {
      alert("حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            placeholder="الاسم الكامل" 
            style={styles.input}
            onChange={e => setData({ ...data, name: e.target.value })} 
            required
          />
          <input 
            type="email"
            placeholder="البريد الإلكتروني" 
            style={styles.input}
            onChange={e => setData({ ...data, email: e.target.value })} 
            required
          />
          <input 
            type="password"
            placeholder="كلمة المرور" 
            style={styles.input}
            onChange={e => setData({ ...data, password: e.target.value })} 
            required
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footer}>
          لديك حساب بالفعل؟ <Link to="/login" style={styles.link}>سجل دخولك</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { background: '#121212', padding: '40px', borderRadius: '15px', width: '380px', textAlign: 'center', border: '1px solid #333' },
  title: { color: '#5b6cff', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1e1e1e', color: 'white', outline: 'none' },
  button: { padding: '12px', backgroundColor: '#5b6cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  footer: { marginTop: '20px', fontSize: '14px', color: '#aaa' },
  link: { color: '#5b6cff', textDecoration: 'none', fontWeight: 'bold' }
};