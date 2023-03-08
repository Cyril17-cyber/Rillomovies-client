import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import Aos from 'aos/dist/aos';
import "aos/dist/aos.css";
import desk from '../images/sid_imac2015retina_front.png';
import about from '../images/illustration-intro.png';
import {features} from '../components/arrays';

function Landing({pop}) {
  useEffect(() => {
    Aos.init({});
  }, []);
  
  return (
    <div className='landing-page'>
        <div className="banner">
            <div className="text">
                <h1 data-aos="fade-left" data-aos-duration="1500">Leave where to watch to us!</h1>
                <p data-aos="fade-right" data-aos-duration="1500">Check out great content and great movies right here on my project... you can't watch it or download it here though 🌚🌚... that'd be theft... just enjoy the features.</p>
                <Link to={'/register'} data-aos="fade-right" data-aos-duration="1500">TRY FOR FREE</Link>
            </div>
            <img src={desk} alt="laptop preview" data-aos="fade-down" data-aos-duration="1500" />
        </div>

        <div className="features">
          <h1>Features</h1>
        <div className="flex" data-aos="fade-left" data-aos-duration="1500">
          <img src={features[0].image} alt="Illustration" />
          <div className="texts">
            <h2>{features[0].head}</h2>
            <p>{features[0].subheader}</p>
          </div>
        </div>
        <div className="flex-inverse" data-aos="fade-right" data-aos-duration="1500">
        <div className="texts">
            <h2>{features[1].head}</h2>
            <p>{features[1].subheader}</p>
          </div>
        <img src={features[1].image} alt="Illustration" />
        </div>
        <div className="flex" data-aos="fade-left" data-aos-duration="1500">
        <img src={features[2].image} alt="Illustration" />
        <div className="texts">
            <h2>{features[2].head}</h2>
            <p>{features[2].subheader}</p>
          </div>
        </div>
        <div className="flex-inverse" data-aos="fade-right" data-aos-duration="1500">
        <div className="texts">
            <h2>{features[3].head}</h2>
            <p>{features[3].subheader}</p>
          </div>
        <img src={features[3].image} alt="Illustration" />
        </div>
        </div>

        <div className="about">
          <h1>About Us</h1>
          <div className="banner">
            <div className="text">
                <p data-aos="fade-right" data-aos-duration="1500">Check out great content and great movies right here on my project... you can't watch it or download it here though 🌚🌚... that'd be theft... just enjoy the features.</p>
                <Link to={'/register'} data-aos="fade-right" data-aos-duration="1500">GET STARTED</Link>
            </div>
            <img src={about} alt="laptop preview" data-aos="fade-down" data-aos-duration="1500" />
          </div>
        </div>
    </div>
  )
}

export default Landing