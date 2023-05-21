import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Home from '@mui/icons-material/Home';
// import Home from '@mui/icons-material/Home';
// import Home from '@mui/icons-material/Home';
import ChatIcon from "@mui/icons-material/AdbOutlined";
import Profile from '@mui/icons-material/AccountCircle';
import Community from '@mui/icons-material/Message'
import { useNavigate ,useLocation} from 'react-router-dom';
export default function LabelBottomNavigation({profile,setProfile}) {
  let location=useLocation();
  const [value, setValue] = React.useState('dashboard');
let navigate=useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {!(
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/GetOtp"
      ) ? (
        <>
          <BottomNavigation
            sx={{
              width: "100vw",
              position: "fixed",
              left: 0,
              bottom: 0,
              backgroundColor: "#c0f5d3",
            }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="Dashboard"
              value="dashboard"
              icon={<Home />}
              onClick={() => {
                navigate("/dashboard");
              }}
            />

            {/* <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      /> */}
            <BottomNavigationAction
              label="ChatBot"
              value="ChatBot"
              icon={<ChatIcon />}
              onClick={() => {
                navigate("/chatbot");
              }}
            />
            <BottomNavigationAction
              label="Profile"
              value="profile"
              icon={<Profile />}
              onClick={() => {
                navigate("/profile");
              }}
            />
            <BottomNavigationAction
              label="Community"
              value="community"
              icon={<Community />}
              onClick={() => {
                navigate("/community");
              }}
            />
          </BottomNavigation>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}