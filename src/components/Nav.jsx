import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import { DarkMode, LightMode } from '@mui/icons-material';


function Nav(props) {

    return(
        <nav className="nav">

        <div onClick={props.mobileSetter} id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>

            <Link to={'/'} className="logo">
                <img src={logo} alt="logo" />
            </Link>

            <section className="nav_links">
                <Link to={'/'}>Home</Link>
                <Link to={'/features'}>Features</Link>
                <Link to={'/about'}>About Us</Link>
                <Link to={'/login'}>Login</Link>
            </section>

            <section className="method">
            {props.darkMode === "light"? <DarkMode onClick={props.darkModeSetter} /> : <LightMode onClick={props.darkModeSetter} />}
            
            <Link to={'/register'} className='login'>Sign Up</Link>
            </section>
        </nav>
    )
}

export default Nav;