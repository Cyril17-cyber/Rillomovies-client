import React, { useState } from 'react';
import {VisibilityOffTwoTone, VisibilityTwoTone} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({setUserDetails}) {
    const [items, setItems] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [progress, setProgress] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const toogleVisible = () => {
        setVisibility((preValue)=> {
            return !preValue
        });
    };

    const handleSubmit = (e)=> {
        setProgress(true);
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://rillo-server.onrender.com/login',
            data
        })
        .then((res)=> {
            if(res.data.message === "Success!!") {
                setUserDetails(res.data.user);
                navigate('/home');
            } else if(res.data.message === "Redirect!!") {
                setUserDetails(res.data.user);
                navigate('/verifyuser');
            } else {
                setItems(res.data.message);
                setProgress(false);
            }
        })
        .catch((error)=> {
            console.log(error);
            setItems("Could not communicate with server... Please Try Again");
            setProgress(false);
        });
    }

    return (
        <div className="register" onSubmit={handleSubmit}>
            <div className="intro">
            {items === ""? <h3>User Login</h3> : <h3>{items}</h3>}
            </div>
            <form>
                <div className="main">
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required value={data.email} onChange={handleChange} id="email"/>
                    </div>

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
                    </div>

                    <p className="alt">Forgot Password? <Link to={"/forgot"}>Reset here.</Link></p>
                </div>

                {
                    !progress ? 
                    <button type="submit" className="submit">
                    Login
                    </button> :
                    <CircularProgress />
                }

            <p className="alt">Don't have an account? <Link to={"/register"}>Signup here.</Link></p>
            </form>
        </div>
    )
}
