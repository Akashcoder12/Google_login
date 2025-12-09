import axios from "axios";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/user-dashboard", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => (window.location.href = "/"));
  }, []);

  return user ? (
    <h1>Welcome {user.name} 👋 (User)</h1>
  ) : (
    <h2>Loading...</h2>
  );
}
