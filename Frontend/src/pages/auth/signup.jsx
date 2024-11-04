import React from "react";
import "./main.css"; // Import CSS for styling
import { toast } from "sonner"; // Import toast notifications
import { SIGNUP_ROUTE } from "@/utils/constants"; // Import signup route constant
import axios from "axios";

const Signup = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Validate signup form inputs
  function validateSignup() {
    const { email, password, passwordConfirm } = data;
    if (!email) {
      toast.warning("Enter Email");
      return false;
    }
    if (!password) {
      toast.warning("Enter Password");
      return false;
    }
    if (password !== passwordConfirm) {
      toast.warning("Password and confirm password should be the same");
      return false;
    }
    return true;
  }

  // Handle signup form submission
  async function handleSignup(event) {
    event.preventDefault();
    if (validateSignup()) {
      try {
        const response = await axios.post(SIGNUP_ROUTE, {
          userEmail: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        });
        toast.success(response.data.Message);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
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

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={data.passwordConfirm}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              passwordConfirm: e.target.value,
            }))
          }
        />

        <button type="submit" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
