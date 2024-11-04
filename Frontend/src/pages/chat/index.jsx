import React from "react";
import { useAppStore } from "@/store"; // Import custom store hook
import { toast } from "sonner"; // Import toast notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { LOGOUT_ROUTE } from "@/utils/constants"; // Import logout route constant

const Chat = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  // Uncomment and use this effect if profile setup is required
  // React.useEffect(() => {
  //   if (!userInfo.profileSetup) {
  //     navigate('/profile');
  //     toast("Please complete profile setup first");
  //   }
  // }, [userInfo, navigate]); // Added userInfo and navigate to dependency array

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await axios.get(LOGOUT_ROUTE, { withCredentials: true });
      setUserInfo(undefined); // Clear user information
      navigate('/login'); // Navigate to login page
    } catch (err) {
      // Display error message
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Chat;
