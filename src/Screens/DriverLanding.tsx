import { useNavigate } from "react-router-dom";
import logo from '../Assets/logo.png';
import './DriverLanding.css';
import ButtonComp from '../Components/ButtonComp';
import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
export default function DriverLanding() {
    let navigate = useNavigate();
    const [supabase] = useState(() => MySupClient());
    const [session, setSession] = useState<any>(null);
    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            console.log("session", session)
            setSession(session)

        })
    }, [])
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