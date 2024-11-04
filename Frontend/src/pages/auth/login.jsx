import React from "react";
import './main.css'; // Import CSS for styling
import { LOGIN_ROUTE } from "@/utils/constants"; // Import route constant
import axios from "axios";
import { toast } from "sonner"; // Import toast notifications
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  // Validate login inputs
  function validateLogin() {
    const { email, password } = data;
    if (!email) {
      toast.warning("Enter Email");
      return false;
    }
    if (!password) {
      toast.warning("Enter Password");
      return false;
    }
    return true;
  }

  // Handle login form submission
  async function handleLogin(event) {
    event.preventDefault();
    if (validateLogin()) {
      try {
        const response = await axios.post(LOGIN_ROUTE, {
          userEmail: data.email,
          password: data.password,
        }, { withCredentials: true });

        setUserInfo(response.data.user);
        toast.success(response.data.Status);

        setTimeout(() => {
          navigate('/chat');
        }, 3000);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
