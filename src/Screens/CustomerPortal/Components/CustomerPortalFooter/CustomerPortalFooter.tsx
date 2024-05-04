import "./CustomerPortalFooter.css";
import Logo from "../../../../Assets/CustomerPortal/FlexiverWhiteLogo.png"
import Instagram from "../../../../Assets/CustomerPortal/Instagram Circle.png"
import Linkedin from "../../../../Assets/CustomerPortal/LinkedIn Circled.png"
import Facebook from "../../../../Assets/CustomerPortal/Facebook.png"
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function CustomerPortalFooter() {
    const navigate = useNavigate();
    return (
        <div className="customerPortalFooter">
            <img src={Logo} alt="Flexiver Logo" style={{
                cursor: "pointer",
            }} onClick={()=>{
                navigate("/");
            }}/>
            <div className="customerPortalHeaderSection">
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Useful Links</Typography.Text>
                <Typography.Text style={{
                    fontSize: "16px",
                    color: "white",
                    cursor: "pointer",
                }} onClick={()=>{
                    navigate("/termsAndConditions");
                }}>Terms and Conditions</Typography.Text>
                <Typography.Text style={{
                    fontSize: "16px",
                    color: "white",
                    cursor: "pointer",
                }} onClick={()=>{
                    navigate("/privacyPolicy");
                }}>Privacy Policy</Typography.Text>
            </div>
            <div className="customerPortalHeaderSection">
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Socials</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }} onClick={()=>{
                    window.open("https://www.instagram.com/flexiver/", '_blank', 'noopener');
                }}> <img src={Instagram} alt="instagram icon" style={{
                    width: "20px",
                }} />flexiver</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }}> <img src={Linkedin} alt="linkedin icon" style={{
                    width: "20px",
                }} />LinkedIn Handle</Typography.Text>
                <Typography.Text style={{
                    fontSize: "16px",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }}> <img src={Facebook} alt="facebook icon" style={{
                    width: "20px",
                }} onClick={()=>{
                    window.open("https://www.facebook.com/FlexiverAU", '_blank', 'noopener');
                }} />Facebook Page</Typography.Text>
            </div>
            <div className="customerPortalHeaderSection" onClick={() => {
                // open url in new window
                window.open(
                  "https://www.google.com/maps/place/Ajaka+%26+Co/@-33.9416148,151.2413084,15z/data=!4m6!3m5!1s0x6b12b3d3baf63f73:0x15aaa1e9bdd8986e!8m2!3d-33.9416148!4d151.2413084!16s%2Fg%2F1tfd2kb8?entry=ttu, '_blank', 'noopener'"
                );
              }}>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Contact Us</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                }}>Maroubra sydney,1/206 Maroubra Rd, Maroubra NSW 2035</Typography.Text>
            </div>
        </div>
    );
}