import React, { useEffect, useState } from "react";
import LoginPageHeader from "./LoginPageHeader";
import { TextField } from "@mui/material";
import style from "./CreateAccount.module.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import MySupClient from "../SupabaseClient";
import { E164Number } from "libphonenumber-js/types.cjs";
import toast from "react-hot-toast";
import { set } from "react-ga";

const CreateAccount = () => {
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

  return (
    loading ?
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
      </> : <LoginPageHeader>
        <div className={style.LoginSection}>
          <div
            style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}
          >
            <b>Create your account</b>
          </div>
          <div style={{ display: "flex", gap: "2%" }}>
            <TextField onChange={(text) => {
              setFirstName(text.target.value);

            }} placeholder="First name" variant="standard" />
            <TextField onChange={(text) => {
              setLastName(text.target.value);


            }} placeholder="Last name" variant="standard" />
          </div>
          <div>
            <TextField onChange={(text) => {
              setEmail(text.target.value);
            }} placeholder="Email" variant="standard" />
          </div>
          <div>
            <TextField onChange={(text) => {
              setPass1(text.target.value);

            }} placeholder="Enter password" variant="standard" />
          </div>
          <div>
            <TextField onChange={(text) => {
              setPass2(text.target.value);
            }} placeholder="Re enter password" variant="standard" />
          </div>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={
              <>
                I agree to the{' '}
                <a href="/termsAndConditions" style={{ textDecoration: "none" }}>
                  terms and conditions
                </a>
              </>
            } />
          </FormGroup>
          {/* <span style={{ display: "flex", marginTop: "3%",position:"relative" }}>
<input type="checkbox" style={{position:"absolute",left:"0" }} />
</span> */}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => {
                userSignUp();
              }}
              style={{
                backgroundColor: "#D69F29",
                color: "white",
                padding: "5px 50px",
                border: "none",
                borderRadius: "4px",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              Next
            </button>
          </div>
        </div>
      </LoginPageHeader>
  );
};

export default CreateAccount;
