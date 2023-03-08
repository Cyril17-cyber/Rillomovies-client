import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
    const navigate = useNavigate();

      const [progress, setProgress] = useState(false);

      const handleClick = ()=> {
        setProgress(true);
        props.setHomeItems({});
        navigate('/');
        props.hide();
      }
  return (
        <div className="logout">
            <main>
                    <h2>Logout</h2>
                    <p>Are you Sure You Want To Proceed Logout?</p>
            {
                !progress ?
                <div className="logout__links">
                <button onClick={props.hide}>Cancel</button>
                <button onClick={handleClick} className='proceed'>Proceed</button>
                </div> 
                :
                <CircularProgress />
            }
                </main>
        </div>
  )
}
