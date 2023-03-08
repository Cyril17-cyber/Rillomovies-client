import React, {useEffect} from 'react';
import Aos from 'aos/dist/aos';
import "aos/dist/aos.css";
import {features} from '../components/arrays';

export default function Features() {
  useEffect(() => {
    Aos.init({});
  }, []);
  return (
    <div className="features">
      <h1 data-aos="fade-up" data-aos-duration="1500">Features</h1>
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
  )
}
