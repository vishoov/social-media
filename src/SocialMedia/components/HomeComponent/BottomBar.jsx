import * as React from 'react';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from "react-router-dom";

import { AccountCircleRounded, GroupsRounded, HomeRounded, InterestsRounded, MenuRounded, PublicRounded, SearchRounded, TvRounded } from '@mui/icons-material';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
 
  return (
    <>
    <Box sx={{ width: '100%', overflowX: 'auto', zIndex:9999 }}>
      <BottomNavigation
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          width: 'max-content',
          marginright:'-10px',
          marginLeft:'-10px',
          
          height:'60px'
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" onClick={() => navigate("/environment/socialMedia/home")} icon={<HomeRounded />} />
        <BottomNavigationAction label="Search"  icon={<SearchRounded />} />
        <BottomNavigationAction label="Glance" icon={<TvRounded />} />
        <BottomNavigationAction label="Interestings"  onClick={() => navigate("/environment/socialMedia/home")} icon={<InterestsRounded />} />
        <BottomNavigationAction label="Meet" icon={<PublicRounded />} />
        <BottomNavigationAction label="Clubs" icon={<GroupsRounded />} />
        <BottomNavigationAction label="Profile"  onClick={() => navigate("/environment/socialMedia/profile")} icon={<AccountCircleRounded />} />
        <BottomNavigationAction label="Menu" icon={<MenuRounded />} />
      </BottomNavigation>
    
    </Box>

    </>
  );
}
