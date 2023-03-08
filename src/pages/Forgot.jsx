import React, {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ContactMailOutlined} from '@mui/icons-material';

export default function Forgot({setUserDetails}) {
  const [items, setItems] = useState("");
  const [data, setData] = useState({
    email: ""
  });
  const [progress, setProgress] = useState(false);

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  };

  const navigate = useNavigate();

  const handleSubmit = (e)=> {
    setProgress(true);
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://rillo-server.onrender.com/forgotpass',
      data
    })
    .then((res)=> {
      if(res.data.message === "Success!!") {
        setUserDetails(res.data.user);
        navigate('/forgotOtp');
      } else {
        setItems(res.data.message);
        setProgress(false);
      }
    })
    .catch((error)=> {
      setItems("Could not communicate with server... Please Try Again");
      setProgress(false);
    });
  }
  return (
    <div className='forgot otp register'>
       <div className="intro"><ContactMailOutlined />{items === ""? <h3>Input Your Email</h3> : <h3>{items}</h3>}</div>

       <form onSubmit={handleSubmit}>
          <div className="main">
          <div className="input">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" placeholder="Email Address" required onChange={handleChange} value={data.email} />
          </div>
          {!progress ? <button type="submit" className="submit" style={{marginTop: 20}}>Submit</button> : <CircularProgress style={{marginTop: 20}} />}
          </div>
      </form>
    </div>
  )
}
