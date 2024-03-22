import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import "./DriverLogin.css";
import CustomTextField from "../Components/CustomTextField";
import ButtonComp from "../Components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import image from "../Assets/loginImage.png";
import logo from "../Assets/logo.png";
import { Typography } from "antd";
import toast from "react-hot-toast";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types.cjs";

export default function DriverSignUp() {
  const navigate = useNavigate();

  const [supabase] = useState(() => MySupClient());
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState(false);
  const [mobile, setMobile] = useState<E164Number>("");

  async function userSignUp() {
    if (email === "" || pass1 === "" || pass2 === "" || firstName === "" || lastName === "") {
      // alert("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    if (pass1 !== pass2) {
      // alert("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    if (pass1 === pass2) {
      setLoading(true);
      const data = await supabase.auth.signUp({
        email: email,
        password: pass1,
      });
      if (data.error) {
        alert(data.error.message);
        setLoading(false);
        return;
      }

      if (data.data.user?.aud === "authenticated") {
        // set User name
        const data = await supabase.auth.updateUser({
          data: { fullName: firstName + " " + lastName, phone: mobile },
        });
        console.log("username", data);

        toast.success("Account Activated, Please Log In.");
        // toast.success("Your email has been verified");
        navigate("/driverLogin");
      }

      setLoading(false);
    }
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
        <Link to="/">
          <div>
            <img src={logo} alt="Logo" className="Logo" />
          </div>
        </Link>
      </div>
      <div className="mainContainer">
        <img className="imageContainer" src={image} alt="login" />
        <div className="signupContainer">
          <CustomTextField
            style={{
              backgroundColor: "#f8f8f8",
              border: "none",
            }}
            placeHolder="First Name" onChanged={(e) => {
              setFirstName(e.target.value);
            }} />
          <br />
          <CustomTextField
            style={{
              backgroundColor: "#f8f8f8",
              border: "none",
            }}
            placeHolder="Last Name" onChanged={(e) => {
              setLastName(e.target.value);
            }} />
          <br />
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
          <CustomTextField
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
              setPass1(e.target.value);
            }}
          />
          <br />
          <CustomTextField
            passMisMatch={passError}
            style={{
              backgroundColor: passError ? "#ff6e6e" : "#f8f8f8",
              border: "none",
              transition: "0.5s",
            }}
            isPassword={true}
            placeHolder="Re Enter Password"
            onChanged={(e) => {
              setPass2(e.target.value);
              if (e.target.value !== pass1) {
                setPassError(true);
              } else {
                setPassError(false);
              }
            }}
          />
          {passError ? (
            <p style={{ color: "red" }}>Passwords do not match</p>
          ) : (
            <></>
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
            text="Sign Up"
            onClick={async () => {
              await userSignUp();
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
          Already have an account?{" "}
          <a
            onClick={() => {
              navigate("/driverLogin");
            }}
          >
            Log In
          </a>
        </Typography.Text>
      </div>
    </div>
  );
}
