import React, {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {LockOutlined, VisibilityTwoTone,VisibilityOffTwoTone} from '@mui/icons-material';

export default function ChangePass({userDetails, setUserDetails}) {
    const [items, setItems] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
        id: userDetails._id
    });
    const [progress, setProgress] = useState(false);

    const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
    };

    const toogleVisible = () => {
        setVisibility((preValue)=> {
            return !preValue
        });
    };

    const toogleConfirmVisible = () => {
        setConfirmVisibility((preValue)=> {
            return !preValue
        });
    };

    const navigate = useNavigate();

  const handleSubmit = (e)=> {
    setProgress(true);
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://rillo-server.onrender.com/changePass',
      data
    })
    .then((res)=> {
      if(res.data.message === "Success!!") {
        setUserDetails(res.data.user);
        navigate('/login');
      } else {
        setItems(res.data.message);
        setProgress(false);
      }
    })
    .catch((error)=> {
      setItems("Could not communicate with server... Please Try Again");
      setProgress(false);
    })
  }

    return (
        <div className='change otp register'>
            <div className="intro"><LockOutlined />{items === ""? <h3>Change Your Password</h3> : <h3>{items}</h3>}</div>

            <form onSubmit={handleSubmit}>
          <div className="main">
          <div className="input">
            <label htmlFor="password">Password</label>
            <main>
            <div className="inputPassword">
                <input type={visibility? "text" : "password"} name="password" required value={data.password} onChange={handleChange}/>

                {
        visibility ?

        <VisibilityOffTwoTone onClick={toogleVisible} />
        :
        <VisibilityTwoTone onClick={toogleVisible} />

    }
            </div>
            </main>
                {data.password.length > 0 && <aside>{data.password.length < 8? <b style={{color: "rgb(255 0 0)"}}>Password is weak</b>: <b style={{color: "rgb(0 255 0)"}}>Password is strong</b>}</aside>}
        </div>

        <div className="input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <main>
            <div className="inputPassword">
                <input type={confirmVisibility? "text" : "password"} name="confirmPassword" required value={data.confirmPassword} onChange={handleChange}/>

                {
        confirmVisibility ?

        <VisibilityOffTwoTone onClick={toogleConfirmVisible} />
        :
        <VisibilityTwoTone onClick={toogleConfirmVisible} />

    }
            </div>
            </main>
        </div>
          {!progress ? <button type="submit" className="submit" style={{marginTop: 20}}>Submit</button> : <CircularProgress style={{marginTop: 20}} />}
          </div>
      </form>
        </div>
    )
}
