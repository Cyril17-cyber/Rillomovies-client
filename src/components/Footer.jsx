import React from 'react';
import { Link } from "react-router-dom";
import { Email, WhatsApp, GitHub, LinkedIn, Phone, Twitter } from '@mui/icons-material';
import logo from '../images/logo.png';

function Footer() {
    const date = new Date();
  return (
    <footer className='footer'>

    <div className="footer_top">
        <Link to={"/"} className="logo">
            <img src={logo} alt="logo" />
        </Link>

        <div className="footer_contacts">
        <a href="https://twitter.com/Cyril_Asogwa_BM">
            <Twitter />
        </a>
        <a href="mailto: asogwac029@gmail.com">
            <Email />
        </a>
        <a href="https://www.linkedin.com/in/cyril-asogwa-419a69208/">
            <LinkedIn />
        </a>
        <a href="https://github.com/Cyril17-cyber">
            <GitHub />
        </a>
        <a href="tel: +234907894087">
            <Phone />
        </a>
        <a href="https://wa.me/message/ACAKGMOG5A7VG1">
            <WhatsApp />
        </a>
        </div>

    </div>

        <hr />

        <div className="footer_links">
        <Link to={'/'}>Home</Link>
        <Link to={'/features'}>Features</Link>
        <Link to={'/about'}>About Us</Link>
        <Link to={'/login'}>Login</Link>
        </div>

        <p className="copy">
            &copy; {date.getFullYear()} <strong className="logo"><a href="https://cyrilasogwa.online">Cyril™ </a></strong> All rights reserved.
        </p>
        
    </footer>
  )
}

export default Footer;