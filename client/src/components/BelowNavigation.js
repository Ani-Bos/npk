import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Home from '@mui/icons-material/Home';
import Profile from '@mui/icons-material/AccountCircle';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('Home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{width:'100vw',position:'fixed',left:0,bottom:0 ,backgroundColor:"rgb(198 207 221)"}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="Home"
        selected
        icon={<Home />}
      />
      {/* <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      /> */}
      <BottomNavigationAction label="Profile" value="Profile" icon={<Profile/>} />
    </BottomNavigation>
  );
}