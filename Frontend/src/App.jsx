import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import NavBar from "./pages/auth/Layout1";
import Verify from "./pages/auth/verify";
import { USER_INFO_ROUTE } from "./utils/constants";
import axios from "axios";
import { useAppStore } from "./store";

function App() {
    const { userInfo, setUserInfo } = useAppStore();
    const [loading, setLoading] = React.useState(true);

    // Fetch user information on component mount
    React.useEffect(() => {
        async function getInfo() {
            try {
                const response = await axios.get(USER_INFO_ROUTE, {
                    withCredentials: true
                });
                setUserInfo(response.data.userInfo);
            } catch (err) {
                // Handle errors if necessary
            } finally {
                setLoading(false);
            }
        }

        getInfo();
    }, [setUserInfo]);

    // Display loading message while fetching data
    if (loading) {
        return <h1>Wait a few seconds...</h1>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Signup />} />
                    <Route path="login" element={<Login />} />
                </Route>

                <Route path="/verify/:userId/:uniqueString" element={<Verify />} />
                <Route path="chat" element={userInfo ? <Chat /> : <Navigate to="/login" />} />
                <Route path="profile" element={userInfo ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
