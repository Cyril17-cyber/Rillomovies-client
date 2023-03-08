import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Home, Info} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function BottomNav({setSearchMenu}) {
  const [value, setValue] = React.useState('home');

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'inline-flex', md: 'none'}}} elevation={3} onClick={()=> {setSearchMenu(false);}}>
         <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange} className='bottomNav'>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<Home />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Recent"
        value="recent"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction label="Info" value="info" icon={<Info />} />
    </BottomNavigation>
    </Paper>
  );
}