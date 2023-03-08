import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Routes} from 'react-router-dom';
import './scss/styles.css';
import Nav from './components/Nav';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import Features from './pages/Features';
import Register from './pages/Register';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Otp from './components/Otp';
import Popup from './components/Popup';
import Forgot from './pages/Forgot';
import ChangePass from './pages/ChangePass';
import DashNav from './components/DashNav';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Recent from './pages/Recent';
import Movie from './pages/Movie';
import Account from './pages/Account';
import Logout from './components/Logout';

function App() {
  const [userImage, setUserImage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState("light");
  const [popUp, setPopUp] = useState(false);
  const [filter, setFilter] = useState("All");
  const [logOut, setLogout] = useState(false);
  const [popUpDash, setPopUpDash] = useState(false);
  const [popMessage, setPopMessage] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  
  useEffect(()=> {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const colorScheme = event.matches ? "dark" : "light";
      darkMode(colorScheme);
    })
  }, []);

  function mobileSetter() {
    setMobileMenu((prevValue)=> {
        return !prevValue
    });
}

function darkModeSetter() {
  setDarkMode((prevValue)=> {
      if(prevValue === "light") {
        return "dark"
      } else {
        return "light"
      }
  });
}

function showLogOut() {
  setLogout(true);
}

function hideLogOut() {
  setLogout(false);
}

  return (
    <main className={!mobileMenu ? 'Body' : 'Body visibleMenu'}>
      <div className={darkMode === "light" ? 'App' : 'App DarkMode'}>
      <Router>
      {JSON.stringify(userDetails) === "{}" ? <Nav mobileSetter={mobileSetter} items={userDetails} darkMode={darkMode} darkModeSetter={darkModeSetter}  /> : <DashNav user={userDetails} userImage={userImage} setUserImage={setUserImage} darkMode={darkMode} darkModeSetter={darkModeSetter} setFilter={setFilter} popUp={popUpDash} setPopUp={setPopUpDash} popMessage={popMessage} setPopMessage={setPopMessage} setSearchMenu={setSearchMenu} searchMenu={searchMenu} movies={movies} setUserDetails={setUserDetails} logOut={showLogOut} />}
      {mobileMenu && <MobileNavigation mobileSetter={mobileSetter} />}
      <Popup close={setPopUp} open={popUp} />
      {logOut && <Logout setHomeItems={setUserDetails} hide={hideLogOut} />}
        <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/info' element={<About />} />
        <Route path='/features' element={<Features />} />
        <Route path='/register' element={<Register setUserDetails={setUserDetails} />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/login' element={<Login setUserDetails={setUserDetails} />} />
        <Route path='/forgot' element={<Forgot setUserDetails={setUserDetails} />} />
        <Route path='/verifyuser' element={<Otp sendRoute='/verifyuser' resendRoute='/resendVerification' userId={userDetails._id} setUserDetails={setUserDetails} userEmail={userDetails.email} setPopUp={setPopUp} fName={userDetails.firstName} navigate={'/home'} />} />
        <Route path='/forgotOtp' element={<Otp sendRoute='/forgotOtp' resendRoute='/resendForgotOtp' userId={userDetails._id} setUserDetails={setUserDetails} userEmail={userDetails.email} setPopUp={setPopUp} fName={userDetails.firstName} navigate={'/passwordChange'} />} />
        <Route path='/passwordChange' element={<ChangePass userDetails={userDetails} setUserDetails={setUserDetails} />} />
        <Route path='/home' element={<Home userDetails={userDetails} filter={filter} setUserDetails={setUserDetails} popUp={popUpDash} setPopUp={setPopUpDash} popMessage={popMessage} setPopMessage={setPopMessage} setSearchMenu={setSearchMenu} movies={movies} setMovies={setMovies} />} />
        <Route path='/favorites' element={<Favourites userDetails={userDetails} setSearchMenu={setSearchMenu} setUserDetails={setUserDetails} setPopUp={setPopUpDash} setPopMessage={setPopMessage} movies={movies} />} />
        <Route path='/recent' element={<Recent userDetails={userDetails} setSearchMenu={setSearchMenu} setUserDetails={setUserDetails} setPopUp={setPopUpDash} setPopMessage={setPopMessage} movies={movies} />} />
        <Route path='/account' element={<Account userDetails={userDetails} setSearchMenu={setSearchMenu} userImage={userImage} setUserDetails={setUserDetails} setUserImage={setUserImage}  setPopUp={setPopUpDash} setPopMessage={setPopMessage} />} />
        {movies.map((movie, id)=> {
          return (
            <Route key={id} path={`/${movie._id}`} element={<Movie userDetails={userDetails} setSearchMenu={setSearchMenu} setUserDetails={setUserDetails} movie={movie} setPopUp={setPopUp} setPopMessage={setPopMessage} />} />
          )
        })}
        </Routes>
        {JSON.stringify(userDetails) === "{}" ? <Footer /> : <BottomNav setSearchMenu={setSearchMenu} />}
      </Router>
      </div>
    </main>
  )
} 

export default App;