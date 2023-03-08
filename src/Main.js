import React, { useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { Route, Routes} from 'react-router-dom';
import './scss/styles.css';
import Landing from './pages/Landing';
import Nav from './components/Nav';
import MobileNavigation from './components/MobileNavigation';
import Register from './components/Otp';
import Login from './components/DashNav';
import Footer from './components/Footer';
// import Home from './pages/Home';
// import Logout from './components/Logout';
// import Popup from './components/Popup';
// import Newvideo from './pages/Newvideo';
// import Videos from './pages/Videos';
// import Cbt from './pages/Cbt';
// import Questions from './pages/Questions';
// import EQuestions from './pages/EQuestions';
// import AdminAccess from './components/AdminAccess';
// import {questions, eLink} from './components/arrays';


function Main() {



  const [mobileMenu, setMobileMenu] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [showLogin, setLogin] = useState(false);
  const [showAdminLogin, setAdminLogin] = useState(false);
  const [logout, setLogout] = useState(false);
  const [popup, setPopup] = useState(false);
  const [homeItems, setHomeItems] = useState('');
    function mobileSetter() {
        setMobileMenu((prevValue)=> {
            return !prevValue
        });
        setRegister(false);
        setLogin(false);
        setLogout(false);
        setPopup(false);
        setAdminLogin(false);
    }

    function showLogout() {
      setLogout(true);
      setRegister(false);
      setMobileMenu(false);
      setLogin(false);
      setPopup(false);
      setAdminLogin(false);
    };

    function showPopup() {
      setPopup(true);
      setLogout(false);
      setRegister(false);
      setMobileMenu(false);
      setLogin(false);
      setAdminLogin(false);
    };

    function hidePopup() {
      setPopup(false);
    }

    function hideLogout() {
      setLogout(false);
    };

    function showRegisterForm() {
      setRegister(true);
      setMobileMenu(false);
      setLogin(false);
      setLogout(false);
      setPopup(false);
      setAdminLogin(false);
    };

    function hideRegister() {
      setRegister(false);
    };

    function showLoginForm() {
      setRegister(false);
      setMobileMenu(false);
      setLogin(true);
      setLogout(false);
      setAdminLogin(false);
    };
    function showAdminForm() {
      setRegister(false);
      setMobileMenu(false);
      setLogin(false);
      setLogout(false);
      setAdminLogin(true);
    };

    function hideLogin() {
      setLogin(false);
    };
    function hideAdminLogin() {
      setAdminLogin(false);
    };
  return (
    <main className={!mobileMenu ? 'Body' : 'Body visibleMenu'}>
      <div className={showRegister || showLogin || logout || popup ? "App visibleForm" : "App"}>
        <Router>
                <Nav mobileSetter={mobileSetter} register={showRegisterForm} login={showLoginForm} adminLogin={showAdminForm} logout={showLogout} items={homeItems}  />
                {mobileMenu && <MobileNavigation login={showLoginForm} mobileSetter={mobileSetter} adminLogin={showAdminForm} logout={showLogout} items={homeItems} />}

                {/* {showRegister && <Register hide={hideRegister} login={showLoginForm} />}
                {showLogin && <Login  hide={hideLogin} register={showRegisterForm} setHomeItems={setHomeItems} />}
                {showAdminLogin && <AdminAccess  hide={hideAdminLogin} register={showLoginForm} />}
                {logout && <Logout hide={hideLogout} setHomeItems={setHomeItems} />}
                {popup && <Popup hide={hidePopup} />} */}
                <Routes>
                <Route path='/' element={<Landing />} />
                    {/* <Route path='/' element={<Landing register={showRegisterForm}  showPopup={showPopup} />} /> */}
                    {/* <Route path='/home' element={<Home />} />
                    <Route path='/e-questions' element={<EQuestions showPopup={showPopup} items={homeItems} />} />
                    <Route path='/newytb' exact element={<Newvideo />} />
                    <Route path='/videos' exact element={<Videos items={homeItems} />} />
                    <Route path='/cbt' exact element={<Cbt />} />
                    <Route path='/news' exact element={<Cbt />} />
                    <Route path='/questions' exact element={<Questions contents={questions} />} />
                    <Route path='/e-exam' exact element={<Questions contents={eLink} />} /> */}
                </Routes>
                <Footer />
            </Router>
    </div>
  </main>
  );
}

export default Main;
