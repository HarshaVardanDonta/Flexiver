import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from '../Assets/logo.png';
import scooty from '../Assets/scooty.gif';
import landingVideo from "../Assets/lVideo.mp4";
import map from "../Assets/map.png";
import driver from "../Assets/driver.gif";
import mobile from "../Assets/mobile.png";
import './DriverLanding.css';
import "aos/dist/aos.css";

import ButtonComp from '../Components/ButtonComp';
import Spacer from "../Components/MySpacer";
import { services } from "../data";

import MySupClient from "../SupabaseClient";

import { FaFilePen, FaTruck } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa";

import ReactPlayer from "react-player";
import Carousel from "react-material-ui-carousel";

export default function DriverLanding() {
    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            console.log("session", session)
            setSession(session)
        })
    }, [])

    let navigate = useNavigate();

    const [supabase] = useState(() => MySupClient());
    const [session, setSession] = useState<any>(null);

    return (
        <>
            <div id="header" className="header">
                <img src={logo} alt="logo" />
                <div className="headerButtonsContainer">
                    <ButtonComp text="About Us" onClick={() => {
                        const element = document.getElementById('about');
                        element?.scrollIntoView({ behavior: "smooth" })
                    }} />
                    <ButtonComp text="Services" onClick={() => {
                        const element = document.getElementById('service');
                        element?.scrollIntoView({ behavior: "smooth" })
                    }} />
                    <ButtonComp text="Available Vehicles" onClick={() => {
                        const element = document.getElementById('available');
                        element?.scrollIntoView({ behavior: "smooth" })
                    }} />
                </div>
                <div className="userActionContainer">
                    <ButtonComp style={{
                        // padding: "5px 60px",
                        backgroundColor: "#D69F29",
                        color: "white",
                        borderRadius: "10px"
                    }} text="Apply To Drive" onClick={async () => {
                        if (session.data.session) {
                            navigate('/driverRegistration')
                        } else {
                            navigate('/driverSignUp')
                        }
                    }} />
                    <Spacer width={50} />
                    <ButtonComp text="Login" onClick={() => {
                        navigate('/driverLogin')
                    }} />
                </div>
            </div>
            <div className="page">
                <div className="hero">
                    <video src={landingVideo} autoPlay loop muted />
                    <div className="hero-text" data-aos="fade-up">
                        <h1>START EARNING <br />WITH YOUR VAN.</h1>
                        <p>Become a Partner in Our Moving Services Network</p>
                    </div>
                </div>
                <div className="flow">
                    <div className="flow-item" data-aos="fade-up" data-aos-delay="100">
                        <FaFilePen color='black' size={38} />
                        <p>Register</p>
                    </div>
                    <div className="flow-item" data-aos="fade-up" data-aos-delay="200">
                        <FaRegThumbsUp color='black' size={38} />
                        <p>Get Approval</p>
                    </div>
                    <div className="flow-item" data-aos="fade-up" data-aos-delay="300">
                        <FaTruck color='black' size={38} />
                        <p>Start Driving</p>
                    </div>
                </div>
                <div className="map">
                    <img src={map} alt="map" />
                </div>

                <div className="about" id='about' >
                    <h1 data-aos="fade-right">ABOUT US</h1>
                    <p data-aos="fade-right">At Flexiver, we understand the importance of reliable and efficient delivery services. With years of experience in the industry, we have established ourselves as a premier packers and movers company dedicated to providing seamless transportation solutions tailored to your needs. Whether you're moving homes, sending packages, or transporting goods for your business, trust Flexiver to deliver with precision and professionalism.</p>

                    <div className="about-grid" >
                        <div className="about-left" >
                            <div data-aos="fade-right">
                                <h2>Why Choose Flexiver?</h2> <br />
                                <ul>
                                    <li>
                                        <strong>Reliability:</strong> With Flexiver, you can trust that your packages will reach their destination safely and on time.
                                    </li>
                                    <li>
                                        <strong>Affordability:</strong> We offer competitive rates without compromising on the quality of service.
                                    </li>
                                    <li>
                                        <strong>Customer Satisfaction:</strong> Our dedicated team is committed to providing exceptional customer service every step of the way.
                                    </li>
                                    <li>
                                        <strong>Flexibility:</strong> We understand that plans can change. That's why we offer flexible scheduling options to accommodate your needs.
                                    </li>
                                </ul>
                            </div>
                            <div data-aos="fade-right">
                                <h2>Why Drive with Flexiver?</h2> <br />
                                <ul>
                                    <li>
                                        <strong>Flexibility:</strong> With Flexiver, you're in control of your schedule. Choose when and where you want to work, whether it's part-time or full-time.
                                    </li>
                                    <li>
                                        <strong>Earn More:</strong> Enjoy competitive earnings for every delivery you complete. The more you drive, the more you earn.
                                    </li>
                                    <li>
                                        <strong>Support:</strong> Our dedicated support team is here to assist you every step of the way. From onboarding to ongoing assistance, we're committed to your success.
                                    </li>
                                    <li>
                                        <strong>Safety:</strong> Your safety is our priority. We provide comprehensive safety guidelines and support to ensure a secure driving experience.
                                    </li>
                                    <li>
                                        <strong>Opportunity:</strong> Join a growing community of drivers and tap into new opportunities for growth and development.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="about-right">
                            <img src={driver} alt="driver" data-aos="fade-left" />
                        </div>
                    </div>
                </div>
                <div className="service" id='service' data-aos="fade-left">
                    <h1>SERVICES</h1>
                    <p>At Flexiver, we provide a range of services tailored to meet your transportation needs:</p>

                    <div className='service-container'>
                        {services.map((service, id) => (
                            <div className="service-box" key={id} data-aos="fade-up" data-aos-delay={`${id * 100}`}>
                                <img src={service.image} alt="" />
                                <h2>{service.title}</h2>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="trucks" id="available">
                    <h1 data-aos="fade-up">AVAILABLE VEHICLES</h1>
                    <p data-aos="fade-up">Join our fleet of drivers and choose from a variety of vehicles to suit your preferences and transportation needs:</p>
                    <Carousel >
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <div key={index} className="carousel-item" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                                <img src={scooty} alt="scooty" />
                                <h2>2 Wheeler</h2>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="mobile">
                    <div className="mobile-left">
                        <img src={mobile} alt="mobile" data-aos="fade-right" />
                    </div>
                    <div className="mobile-text" data-aos="fade-left">
                        <div>
                            <h1>AVAILABLE ON <br />YOUR FINGERTIPS</h1>
                            <p>Experience convenience like never before with our innovative solutions. Whether you're at home, on the go, or in the office, access our services effortlessly. </p>
                        </div>
                        <button className='apply-button' onClick={() => {
                            navigate('/driverSignUp')
                        }}>Apply to drive</button>
                        <br />
                    </div>
                </div>

                <div className="landing-footer">
                    <div className="footer-left">
                        <h1>Flexiver</h1>
                    </div>
                    <div className="footer-right">
                        <div className="footer-box">
                            <h3>Services</h3>
                            <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor
                                incididunt ut labore </p>
                        </div>
                        <div className="footer-box">
                            <h3>Contact Us</h3>
                            <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor
                                incididunt ut labore </p>
                        </div>
                        <div className="footer-box">
                            <h3>Careers</h3>
                            <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor
                                incididunt ut labore </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}