import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import "./DriverLogin.css";
import CustomTextField from "../Components/CustomTextField";
import ButtonComp from "../Components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import image from "../Assets/loginImage.png";
import logo from "../Assets/logo.png";
import { Typography } from "antd";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types.cjs";
import "react-phone-number-input/style.css";
export default function MobileLogin() {
  const navigate = useNavigate();

  const [supabase] = useState(() => MySupClient());
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  async function sendOtp() {
    console.log(mobile);
    if (mobile.length < 10) {
      alert("Invalid Mobile Number");
      return;
    }
    var { data, error } = await supabase.auth.signInWithOtp({ phone: mobile });
    console.log(error);
    if (data.messageId) {
      alert("OTP Sent");
      setOtpSent(true);
      otpResendCountdown();
    }
  }
  async function verifyOtp() {
    if (otp.length !== 6) {
      alert("Invalid OTP");
      return;
    }
    //verify otp
    var verify = await supabase.auth.verifyOtp({
      phone: mobile,
      token: otp,
      type: "sms",
    });
    if (verify.error) {
      alert(verify.error.message);
    }
    if (verify.data.session !== null) {
      navigate("/");
    }
    console.log(verify);
  }

  function otpResendCountdown() {
    // make showResend true after 60 seconds
    var seconds = 60;
    var x = setInterval(function () {
      seconds = seconds - 1;
      if (seconds === 0) {
        clearInterval(x);
        setShowResend(true);
      }
    }, 1000);
  }
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
            navigate("/driverRegistration");
          } else {
            navigate("/driverDashboard");
          }
        });
    }
    return;
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return loading ? (
    <>
      <div>
        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            fill="%23FF156D"
            stroke="%23FF156D"
            stroke-width="15"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="%23FF156D"
            stroke="%23FF156D"
            stroke-width="15"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="%23FF156D"
            stroke="%23FF156D"
            stroke-width="15"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
        '
      </div>
      Loading...
    </>
  ) : (
    <div className="screenHeight">
      <div className="loginHeader">
        <Link to='/'>
          <div>
            <img src={logo} alt='Logo' className='Logo' />
          </div>
        </Link>
      </div>
      <div className="mainContainer">
        <img className="imageContainer" src={image} alt="login" />
        <div className="signupContainer">
          <PhoneInputWithCountrySelect
            className="phoneInput"
            placeholder="Enter phone number"
            value={mobile}
            onChange={(e) => {
              setMobile(e as E164Number);
            }}
            defaultCountry="AU"
            limitMaxLength={true}
          />
          <br />
          {otpSent && (
            <CustomTextField
              maxLength={6}
              style={{
                backgroundColor: "#f8f8f8",
                border: "none",
              }}
              placeHolder={"Enter OTP"}
              onChanged={(e) => {
                setOtp(e.target.value);
              }}
            />
          )}
          <br />
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
            text={otpSent ? "Validate OTP" : "Send OTP"}
            onClick={async () => {
              if (otpSent) {
                await verifyOtp();
              } else {
                await sendOtp();
              }
            }}
          />
          {showResend && (
            <ButtonComp
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#D69F29",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              text="Resend OTP"
              onClick={async () => {
                sendOtp();
                setOtpSent(false);
                setShowResend(false);
              }}
            />
          )}
          <Typography.Text
            style={{ color: "black", fontSize: 15, fontFamily: "sans-serif" }}
          >
            OR
          </Typography.Text>
          <br />
          <br />
          <Typography.Text>
            Sign In Using{" "}
            <a
              onClick={() => {
                navigate("/driverLogin");
              }}
            >
              E Mail
            </a>
          </Typography.Text>
        </div>
      </div>
      {/* <div className="footerContainer">
        <Typography.Text
          style={{ color: "white", fontSize: 30, fontFamily: "sans-serif" }}>
          Flexiver
        </Typography.Text>
        <Typography.Text style={{ color: "white" }}>
          Don't  have an account?{" "}
          <a onClick={() => {
            navigate("/mobileSignUp");
          }}>
            Sign Up
          </a>
        </Typography.Text>
      </div> */}
    </div >
  );
}
