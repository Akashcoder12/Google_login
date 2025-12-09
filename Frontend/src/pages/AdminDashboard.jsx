import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/admin-dashboard", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => (window.location.href = "/"));
  }, []);

  return user ? (
    <h1>Welcome Admin {user.name} 👑</h1>
  ) : (
    <h2>Checking Access...</h2>
  );
}
