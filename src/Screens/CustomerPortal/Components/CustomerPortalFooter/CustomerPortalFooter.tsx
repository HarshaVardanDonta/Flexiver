import "./CustomerPortalFooter.css";
import Logo from "../../../../Assets/CustomerPortal/FlexiverWhiteLogo.png"
import Instagram from "../../../../Assets/CustomerPortal/Instagram Circle.png"
import Linkedin from "../../../../Assets/CustomerPortal/LinkedIn Circled.png"
import Facebook from "../../../../Assets/CustomerPortal/Facebook.png"
import { Typography } from "antd";

export default function CustomerPortalFooter() {
    return (
        <div className="customerPortalFooter">
            <img src={Logo} alt="Flexiver Logo" />
            <div className="customerPortalHeaderSection">
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Useful Links</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                }}>Terms and Conditions</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                }}>Privacy Policy</Typography.Text>
            </div>
            <div className="customerPortalHeaderSection">
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Socials</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }}> <img src={Instagram} alt="instagram icon" />Instagram Handle</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }}> <img src={Linkedin} alt="linkedin icon" />LinkedIn Handle</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                }}> <img src={Facebook} alt="facebook icon" />Facebook Page</Typography.Text>
            </div>
            <div className="customerPortalHeaderSection">
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                }}>Contact Us</Typography.Text>
                <Typography.Text style={{
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                }}>Maroubra sydney,1/206 Maroubra Rd, Maroubra NSW 2035</Typography.Text>
            </div>
        </div>
    );
}