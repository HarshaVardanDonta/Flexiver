import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import './DriverLogin.css';
import CustomTextField from "../Components/CustomTextField";
import ButtonComp from "../Components/ButtonComp";
import { useNavigate } from "react-router-dom";
import image from "../Assets/loginImage.png";
import logo from "../Assets/logo.png";
import { Typography } from "antd";
import Spacer from "../Components/MySpacer";

export default function DriverLogin() {

    const navigate = useNavigate();

    const [supabase] = useState(() => MySupClient());
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);

    async function checkLogin() {
        const session = await supabase.auth.getSession();
        console.log(session);
        if (session.data.session !== null) {
            var inTable = await supabase.from("DriverDetails").select("*").eq("userId", session.data.session.user.id).then((data) => {
                console.log(data);
                if (data.data!.length === 0) {
                    navigate("/driverRegistration");
                }
                else {
                    navigate("/driverDashboard");
                }
            });
        }
        return
    }
    useEffect(() => {
        checkLogin();
    }
        , [])

    async function userSignIn() {
        setLoading(true);
        const data = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });
        if (data.error) {
            alert(data.error.message);
            setLoading(false);
            return;
        }
        if (data.data.user?.aud === "authenticated") {
            navigate("/driverRegistration");
        }
        setLoading(false);
    }

    return (
        loading ?
            <>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
                </div>
                Loading...
            </>
            :
            < div className="screenHeight">
                <div className="loginHeader">
                    <img src={logo} alt="logo" />
                </div>
                <div className="mainContainer">
                    <img className="imageContainer" src={image} alt="login" />

                    <div className="signupContainer">
                        <Typography.Title level={2} style={{ color: "#D69F29" }}>Driver Login</Typography.Title>
                        <Spacer height={30} />
                        <CustomTextField
                            style={{
                                backgroundColor: "#FFE3A8",
                                border: "none",
                            }}
                            placeHolder="Email" onChanged={(e) => {
                                setEmail(e.target.value)
                            }} />
                        <br />
                        <CustomTextField
                            style={{
                                backgroundColor: "#FFE3A8",
                                border: "none",
                            }}
                            isPassword={true}
                            placeHolder="Enter Password" onChanged={(e) => {
                                setPass(e.target.value)
                            }} />
                        <br />
                        <ButtonComp style={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "#D69F29",
                            color: "white",
                            width: "50%",
                            fontWeight: "bold",
                            fontSize: "20px",
                            borderRadius: "10px",
                            height: "40px",
                        }} text="Sign In" onClick={async () => { await userSignIn() }} />
                    </div>
                </div>
                <div className="footerContainer">
                    <Typography.Text style={{ color: "white", fontSize: 30, fontFamily: "sans-serif" }}>Flexiver</Typography.Text>
                    <Typography.Text style={{ color: "white" }}>Don't have an account? <a href="/driverSignUp">Sign Up</a></Typography.Text>
                </div>
            </div>)
}