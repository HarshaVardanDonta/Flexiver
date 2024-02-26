import { useNavigate } from "react-router-dom";
import logo from '../Assets/logo.png';
import './DriverLanding.css';
import ButtonComp from '../Components/ButtonComp';
export default function DriverLanding() {
    let navigate = useNavigate();
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
                    }} text="Apply To Drive" onClick={() => { navigate('/driverSignUp') }} />
                    <Spacer width={50} />
                    <ButtonComp text="Login" onClick={() => { }} />
                </div>
            </div>
            <div >

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