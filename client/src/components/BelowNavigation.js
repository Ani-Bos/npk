import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Home from '@mui/icons-material/Home';
// import Home from '@mui/icons-material/Home';
// import Home from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
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
    <>
    {
    (!(location.pathname==='/' ||location.pathname==='/login'|| location.pathname==='/GetOtp'))?
    <>
    <BottomNavigation sx={{width:'100vw',position:'fixed',left:0,bottom:0 ,backgroundColor:"rgb(198 207 221)"}} value={value} onChange={handleChange}>

      <BottomNavigationAction
        label="Dashboard"
        value="dashboard"
       
        icon={<Home />}
        onClick={()=>{navigate('/dashboard')}}
      />
     
      {/* <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      /> */}
      <BottomNavigationAction
   
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        onClick={()=>{navigate('/dev')}}
      />
      <BottomNavigationAction  label="Profile" value="profile" icon={<Profile/>} onClick={()=>{navigate('/profile')}}/>
      <BottomNavigationAction  label="Community" value="community" icon={<Community/>} onClick={()=>{navigate('/community')}}/>
    </BottomNavigation>
    </>:<></>}
    </>
  );
}