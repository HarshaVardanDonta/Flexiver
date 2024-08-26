import React, { useState } from 'react'
import LoginPageHeader from './LoginPageHeader'
import { Button, TextField } from '@mui/material'
import google from '../Assets/Google.svg';
import apple from '../Assets/AppleLogo.svg';
import style from './otp.module.css'
import OTPInput from './OTPComponent';

const OTP = () => {
  const [visible,setVisible]=useState(false)
  return (
    <LoginPageHeader>
      <div className={style.LoginSection}>
        <div style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}>
          <b>
        What's your contact number / email?
          </b>
        </div>
        <div>
        <TextField placeholder='Contact number / email' variant="standard"/>
        </div>
        <section style={{display:"flex",gap:"10%"}}>

        <Button variant="outlined" color='warning' style={{padding:"2px", color:"black",textTransform: 'none',borderRadius:"15px"}}><span style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",textAlign:"center"}}><img src={google} height="30px"/>Google</span></Button>
        <Button variant="outlined" style={{padding:"2px", color:"white",textTransform: 'none',borderRadius:"15px",backgroundColor:"black"}}><span style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",textAlign:"center"}}><img src={apple} height="25px"/>Apple</span></Button>

        </section>
        <div style={{textAlign:"center"}}>
        Some info on how the site uses this information.
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className={style.loginButton}
            style={{
              backgroundColor: "#D69F29",
              color: "white",
              padding: "5px 50px",
              border: "none",
              borderRadius: "4px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={()=>{
              setVisible(true)
            }}
          >
            Get OTP
          </button>
        </div>
        {
          visible
          ?
          <>
        <OTPInput/>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className={style.loginButton}
            style={{
              backgroundColor: "#D69F29",
              color: "white",
              padding: "5px 40px",
              border: "none",
              borderRadius: "4px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            >
            Verify OTP
          </button>
        </div>
        </>:<></>
    }
      </div>
    </LoginPageHeader>
  )
}

export default OTP