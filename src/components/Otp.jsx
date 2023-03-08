import React, {useState, useEffect} from 'react';
import {VpnKeyOutlined} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Otp(props) {
    useEffect(()=> {
        showPop();
    }, []);
    const [items, setItems] = useState("");
    const [data, setData] = useState({
        id: props.userId,
        otp: ""
    });
    const showPop = ()=> {
        props.setPopUp(true);
    }
    const [progress, setProgress] = useState(false);
    const [wholeProgress, setWholeProgress] = useState(false);

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const navigate = useNavigate();


    const handleSubmit = (e)=> {
        setProgress(true);
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://rillo-server.onrender.com${props.sendRoute}`,
            data
        })
        .then((res)=> {
            if(res.data.message === "Success!!") {
                props.setUserDetails(res.data.user);
                navigate(props.navigate);
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

    const resendData = {
        email: props.userEmail,
        id: props.userId,
        fName: props.fName
    }

    const handleResend = ()=> {
        setWholeProgress(true);
        axios({
            method: 'post',
            url: `https://rillo-server.onrender.com${props.resendRoute}`,
            data: resendData
        })
        .then((res)=> {
            if(res.data.message === "Success!!") {
                props.setPopUp(true);
                setWholeProgress(false);
            } else {
                setItems(res.data.message);
                setWholeProgress(false);
            }
        })
        .catch((error)=> {
            setItems("Server Error... Please try again");
            setWholeProgress(false);            
        })
    }
    return (
        <div className='otp register'>
            <div className="intro"><VpnKeyOutlined />{items === ""? <h3>Input Your OTP</h3> : <h3>{items}</h3>}</div>
            <form onSubmit={handleSubmit}>
                <div className="main">
                <div className="input">
                    <label htmlFor="otp">OTP</label>
                    <input type="number" name="otp" id="fName" placeholder="Input OTP" required onChange={handleChange} value={data.otp} />
                </div>
                {!wholeProgress ? <>
                {!progress ? <button type="submit" className="submit" style={{marginTop: 20}}>Submit</button> : <CircularProgress style={{marginTop: 20}} />}
                </>: <CircularProgress style={{marginTop: 20}} />}
                </div>
            </form>
            {!wholeProgress ? <div className="alt">Didn't get an email? Check your spam folder or <button className="resend" onClick={handleResend}>Send again</button></div> : <CircularProgress style={{marginTop: 20}} />}
        </div>
    )
}
