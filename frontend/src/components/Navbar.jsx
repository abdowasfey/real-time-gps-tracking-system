import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>MyDash</Link>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        {user?.role === "admin" && <Link to="/admin" style={styles.link}>Admin</Link>}
        {user ? (
          <button onClick={() => { logout(); navigate("/login"); }} style={styles.logoutBtn}>Logout</button>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '0 40px', alignItems: 'center', height: '70px', background: '#121212', borderBottom: '1px solid #333' },
  logo: { fontWeight: 'bold', fontSize: '22px', textDecoration: 'none', color: '#5b6cff' },
  linksContainer: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#efefef', fontSize: '15px', fontWeight: '500' },
  logoutBtn: { backgroundColor: '#ff4b5c', color: 'white', border: 'none', padding: '7px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};