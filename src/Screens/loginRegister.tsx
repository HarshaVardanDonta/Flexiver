import { Header } from 'antd/es/layout/layout'
import React from 'react'
import logo from '../Assets/logoBlack.svg'
import style from './loginRegister.module.css';
import google from '../Assets/Google.svg';
import facebook from '../Assets/Facebook.svg';
import apple from '../Assets/AppleLogo.svg';
import { Button, TextField } from "@mui/material";


const LoginRegister = () => {
  return (
    <div style={{margin:"1% 2%"}}>
    <div>
        <img src={logo} height="40px"/>
    </div>
    <div className={style.LoginSection}>
        <div style={{width:"100%"}}>
        <div style={{fontSize:"28px",marginBottom:"2%",textAlign:"center"}}>
        <b>Login / Register</b>
        </div>
        <div>
            <TextField placeholder='Mobile / Email' variant="standard"/>
        </div>
        <div>
            <TextField placeholder='Password' variant="standard"/>
        </div>
        <div style={{textAlign:"right"}}>
        Don't have password?
        </div>

        <Button variant="outlined" color='warning' style={{padding:"2px", color:"black",textTransform: 'none',borderRadius:"15px"}}><span style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",textAlign:"center"}}><img src={google} height="30px"/>Sign in with Google</span></Button>

        <Button variant="outlined" color='warning' style={{padding:"2px", color:"black",textTransform: 'none',borderRadius:"15px"}}><span style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",textAlign:"center"}}><img src={facebook} height="30px"/>Sign in with Facebook</span></Button>

        <Button variant="outlined" style={{padding:"2px", color:"white",textTransform: 'none',borderRadius:"15px",backgroundColor:"black"}}><span style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",textAlign:"center"}}><img src={apple} height="25px"/>Sign in with Apple</span></Button>


        <Button variant="outlined" style={{padding:"2px", color:"white",textTransform: 'none',borderRadius:"15px",fontSize:"20px",backgroundColor:"black", marginTop:'6%'}}>Login</Button>

        </div>

    </div>
    </div>
  )
}

export default LoginRegister