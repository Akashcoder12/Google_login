import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  // Fetch logged user if token exists
  const checkUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/user-dashboard",
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // Google Login Handler
  const handleLogin = async (response) => {
    const profile = JSON.parse(atob(response.credential.split(".")[1]));
    await axios.post(
      "http://localhost:5000/api/auth/google-login",
      profile,
      { withCredentials: true }
    );
    checkUser();
  };

  // Logout Handler
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="flex items-center justify-between px-8 py-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-red-500">🥟 MomoHub</h1>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <img
                src={user.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} />
          )}
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        
        {/* Left Text Section */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Healthy Momos Made with ❤️
          </h2>
          <p className="text-lg text-gray-600">
            Welcome to <b>MomoHub</b> — where taste meets nutrition.  
            From <span className="text-red-600 font-semibold">Green Peas</span>, 
            <span className="text-red-600 font-semibold"> Veggies</span> to 
            <span className="text-red-600 font-semibold"> Soya Momos</span>, 
            we serve healthy, high-protein dumplings with zero oil steam cooking.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition">
              Order Now
            </button>

            {!user && (
              <GoogleLogin onSuccess={handleLogin} />
            )}
          </div>
        </div>

        {/* Right Image Section */}
        <img
          src="https://i.ibb.co/qgF4Sj6/momos.png"
          alt="momos"
          className="w-[400px] animate-float"
        />
      </section>
    </div>
  );
};

export default Home;
