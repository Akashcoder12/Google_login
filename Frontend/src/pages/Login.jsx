import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const handleLogin = async (response) => {
    const { credential } = response;
    const profile = JSON.parse(atob(credential.split(".")[1])); // decode JWT from Google

    const res = await axios.post(
      "http://localhost:5000/api/auth/google-login",
      profile,
      { withCredentials: true }
    );

    alert("Login Successful");
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleLogin} />
    </div>
  );
};

export default Login;
