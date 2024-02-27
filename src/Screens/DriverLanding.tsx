import { useNavigate } from "react-router-dom";
import logo from '../Assets/logo.png';
import './DriverLanding.css';
import ButtonComp from '../Components/ButtonComp';
import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import landingVideo from "../Assets/lVideo.mp4";
import map from "../Assets/map.png";
import { FaFilePen, FaTruck } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa";
import ReactPlayer from "react-player";
import "aos/dist/aos.css";
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
        < >
            <div id="header" className="header">
                <img src={logo} alt="logo" />
                <div className="headerButtonsContainer">
                    <ButtonComp text="About Us" onClick={() => { }} />
                    <ButtonComp text="Services" onClick={() => { }} />
                    <ButtonComp text="Available Vehicles" onClick={() => { }} />
                </div>
                <div className="userActionContainer">
                    <ButtonComp style={{
                        padding: "5px 60px",
                        backgroundColor: "#D69F29",
                        color: "white",
                        borderRadius: "10px"
                    }} text="Apply To Drive" onClick={() => {
                        if (session.data.session) {
                            navigate('/driverDashboard')
                            return
                        }
                        navigate('/driverSignUp')
                    }} />
                    <Spacer width={50} />
                    <ButtonComp text="Login" onClick={() => {
                        navigate('/driverLogin')
                    }} />
                </div>
            </div>
            <div className="page">
                <div className="hero">
                    {/* <Spacer height={1080} /> */}
                    <ReactPlayer url={landingVideo} playing loop muted width="100%" height="100vh" />
                    <div className="hero-text" data-aos="fade-up">
                        <h1>START EARNING <br />WITH YOUR VAN.</h1>
                        <p>Become a Partner in Our Moving Services Network</p>
                    </div>
                </div>
                <div className="flow">
                    <div className="flow-item" data-aos="fade-up" data-aos-offset="100">
                        <FaFilePen color='black' size={38} />
                        <p>Register</p>
                    </div>
                    <div className="flow-item" data-aos="fade-up" data-aos-offset="300">
                        <FaRegThumbsUp color='black' size={38} />
                        <p>Get Approval</p>
                    </div>
                    <div className="flow-item" data-aos="fade-up" data-aos-offset="400">
                        <FaTruck color='black' size={38} />
                        <p>Start Driving</p>
                    </div>
                </div>
                <div className="map">
                    <img src={map} alt="map" />
                </div>

                <div className="about" id='about' data-aos="fade-right">
                    <h1>ABOUT US</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames. Est ultricies integer quis auctor elit. Erat pellentesque adipiscing commodo elit. Viverra adipiscing at in tellus integer feugiat scelerisque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur exercitationem at, omnis vel, corporis porro fugiat alias reprehenderit minus rerum quaerat explicabo rem ipsum autem dolore, praesentium itaque dolor. Veniam, quam nesciunt ex, repudiandae, ad iste maiores id totam placeat consectetur ullam soluta quas aliquam illo? Repellat, possimus quasi.</p>
                </div>
                <div className="service" id='service' data-aos="fade-left">
                    <h1>SERVICES</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames. Est ultricies integer quis auctor elit. Erat pellentesque adipiscing commodo elit. Viverra adipiscing at in tellus integer feugiat scelerisque.</p>
                </div>
            </div>
        </>
    )
}


interface SpacerProps {
    height?: number;
    width?: number;
}
function Spacer(SpacerProps: SpacerProps) {
    return <div style={{ height: SpacerProps.height, width: SpacerProps.width }}></div>
}