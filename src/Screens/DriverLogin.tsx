import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import "./DriverLogin.css";
import CustomTextField from "../Components/CustomTextField";
import ButtonComp from "../Components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import image from "../Assets/loginImage.png";
import logo from "../Assets/logo.png";
import { Typography } from "antd";
import Spacer from "../Components/MySpacer";
import spin from "../Assets/spin.gif";
import DriverLanding from "./DriverLanding";

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
      var inTable = await supabase
        .from("DriverDetails")
        .select("*")
        .eq("userId", session.data.session.user.id)
        .then((data) => {
          console.log(data);
          if (data.data!.length === 0) {
            navigate("/");
          } else {
            navigate("/");
          }
        });
    }
    return;
  }
  useEffect(() => {
    checkLogin();
  }, []);

  async function userSignIn() {
    if (email === "" || pass === "") {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    const data = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    });
    if (data.error) {
      alert(data.error.message);
      setLoading(false);
      return;
    }
    if (data.data.user?.aud === "authenticated") {
      navigate("/");
    }
    setLoading(false);
  }

  return loading ? (
    <>
      <div className="center">
        <img src={spin} alt="" />
      </div>
    </>
  ) : (
    <div className="screenHeight">
      <div className="loginHeader">
        <Link to='/'>
          <div>
            <img src={logo} alt='Logo' className='Logo' />
          </div>
        </Link>
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className="mainContainer">
        <img className="imageContainer" src={image} alt="login" />

        <div className="signupContainer">
          <Typography.Title level={2} style={{ color: "#D69F29" }}>
            Driver Login
          </Typography.Title>
          <Spacer height={30} />
          <CustomTextField
            type="email"
            style={{
              backgroundColor: "#f8f8f8",
              border: "none",
            }}
            placeHolder="Email"
            onChanged={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <CustomTextField
            style={{
              backgroundColor: "#f8f8f8",
              border: "none",
            }}
            isPassword={true}
            placeHolder="Enter Password"
            onChanged={(e) => {
              setPass(e.target.value);
            }}
          />
          <br />
          <ButtonComp
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#D69F29",
              color: "white",
              width: "50%",
              fontWeight: "bold",
              fontSize: "20px",
              borderRadius: "10px",
              height: "40px",
            }}
            text="Sign In"
            onClick={async () => {
              await userSignIn();
            }}
          />
        </div>
      </div>
      <div className="footerContainer">
        <Typography.Text
          style={{ color: "white", fontSize: 30, fontFamily: "sans-serif" }}
        >
          Flexiver
        </Typography.Text>
        <Typography.Text style={{ color: "white" }}>
          Don't have an account? <a href="/driverSignUp">Sign Up</a>
        </Typography.Text>
      </div>
    </div>
  );
}
