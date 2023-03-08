import React from 'react';
import { Link } from "react-router-dom";

export default function MobileNavigation({mobileSetter}) {
  

  return (
    <div className="mobileNav">
            <Link to={'/'} onClick={mobileSetter}>Home</Link>
                <Link to={'/features'} onClick={mobileSetter}>Features</Link>
                <Link to={'/about'} onClick={mobileSetter}>About Us</Link>
                <Link to={'/login'} onClick={mobileSetter}>Login</Link>
                <Link to={'/register'} onClick={mobileSetter}>Sign Up</Link>
    </div>
  )
}
