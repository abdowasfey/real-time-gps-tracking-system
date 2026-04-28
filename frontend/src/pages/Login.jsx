import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      // تعديل هنا لنعرف الخطأ القادم من السيرفر
      const errorMsg = err.response?.data?.message || "حدث خطأ ما";
      alert(errorMsg); 
      console.log("Full Error:", err.response?.data);
    }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>تسجيل الدخول</h2>
        <form onSubmit={handle} style={styles.form}>
          <input 
            type="email" 
            placeholder="البريد الإلكتروني" 
            style={styles.input} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="كلمة المرور" 
            style={styles.input} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.footer}>
          ليس لديك حساب؟ <Link to="/register" style={styles.link}>سجل الآن</Link>
        </p>
      </div>
    </div>
  );
}

// نفس الـ styles المستخدمة في Register لتوحيد الشكل
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