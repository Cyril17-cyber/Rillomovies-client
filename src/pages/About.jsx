import React, {useEffect} from 'react';
import { Email, WhatsApp, GitHub, LinkedIn, Phone, Twitter } from '@mui/icons-material';
import Aos from 'aos/dist/aos';
import "aos/dist/aos.css";
import social from '../images/social.svg';

export default function About() {
    useEffect(() => {
        Aos.init({});
      }, []);
    return (
        <div className="about">
            <div className="intro">
                <h1 data-aos="fade-down-right" data-aos-duration="1500">About Us</h1>
                <p data-aos="zoom-in-left" data-aos-duration="1500">Rillo Movies is a free web project that allows users search, watch trailers and are linked to downloading various movies and television seried!</p>
                <p data-aos="zoom-in-right" data-aos-duration="1500">Initially developed in 2021 by full-stack web developer <a href="https://wa.me/message/ACAKGMOG5A7VG1">Cyril Asogwa</a> and designed same year by UI/UX designer <a href="https://www.linkedin.com/in/lucy-asogwa-8b6b51207/">Lucy Asogwa</a>, Rillo Movies is an updated version of Kyrillo Movies upgraded by  <a href="https://wa.me/message/ACAKGMOG5A7VG1">Cyril Asogwa</a> as a web project and not an actual business </p>
            </div>

            <div className="contacts">
                <img src={social} alt="illustration" data-aos="fade-left" data-aos-duration="1500"/>
                <h1 data-aos="fade-right" data-aos-duration="1500">Want To Reach Us?</h1>
                <a href="mailto: asogwac029@gmail.com"  data-aos="zoom-out" data-aos-duration="1500">
                    <Email />
                    asogwac029@gmail.com <span>(Email)</span>
                </a>
        
                <a href="https://www.linkedin.com/in/cyril-asogwa-419a69208/"  data-aos="zoom-out" data-aos-duration="1500">
                    <LinkedIn />
                    Cyril Asogwa <span>(LinkedIn)</span>
                </a>
        
                <a href="https://github.com/Cyril17-cyber"  data-aos="zoom-out" data-aos-duration="1500">
                    <GitHub />
                    Cyril17-cyber <span>(Github)</span>
                </a>

                <a href="https://twitter.com/Cyril_Asogwa_BM"  data-aos="zoom-out" data-aos-duration="1500">
                    <Twitter />
                    @Cyril_Asogwa_BM <span>(Twitter)</span>
                </a>

                <a href="tel: +2349078924087"  data-aos="zoom-out" data-aos-duration="1500">
                    <Phone />
                    +234(0)9078924087 <span>(Phone)</span>
                </a>

                <a href="https://wa.me/message/ACAKGMOG5A7VG1"  data-aos="zoom-out" data-aos-duration="1500">
                    <WhatsApp />
                    +2349078924087 <span>(WhatsApp)</span>
                </a>
            </div>
        </div>
    )
}
