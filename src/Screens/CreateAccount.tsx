import React from "react";
import LoginPageHeader from "./LoginPageHeader";
import { TextField } from "@mui/material";
import style from "./CreateAccount.module.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CreateAccount = () => {
  return (
    <LoginPageHeader>
      <div className={style.LoginSection}>
        <div
          style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}
        >
          <b>Create your account</b>
        </div>
        <div style={{ display: "flex", gap: "2%" }}>
          <TextField placeholder="First name" variant="standard" />
          <TextField placeholder="Last name" variant="standard" />
        </div>
        <div>
          <TextField placeholder="Contact number / Email" variant="standard" />
        </div>
        <div>
          <TextField placeholder="Enter password" variant="standard" />
        </div>
        <div>
          <TextField placeholder="Re enter password" variant="standard" />
        </div>
        <FormGroup>
      <FormControlLabel control={<Checkbox/>} label={
        <>
          I agree to the{' '}
          <a href="/termsAndConditions" style={{textDecoration:"none"}}>
            terms and conditions
          </a>
        </>
      }/>
    </FormGroup>
{/* <span style={{ display: "flex", marginTop: "3%",position:"relative" }}>
  <input type="checkbox" style={{position:"absolute",left:"0" }} />
</span> */}
  <div style={{display:"flex",justifyContent:"end"}}>
        <button
          style={{
            backgroundColor: "#D69F29",
            color: "white",
            padding: "5px 50px",
            border: "none",
            borderRadius: "4px",
            fontSize:"20px",
            cursor:"pointer"
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
