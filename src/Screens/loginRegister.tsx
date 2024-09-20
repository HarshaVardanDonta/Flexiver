import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import logo from '../Assets/logoBlack.svg'
import style from './loginRegister.module.css';
import google from '../Assets/Google.svg';
import facebook from '../Assets/Facebook.svg';
import apple from '../Assets/AppleLogo.svg';
import { Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MySupClient from '../SupabaseClient';
import toast from 'react-hot-toast';


const LoginRegister = () => {
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
            navigate("/home");
          } else {
            navigate("/home");
          }
        });
    }
    return;
  }

  async function userSignIn() {
    if (email === "" || pass === "") {
      // alert("Please fill all the fields");
      toast.error("Please fill all the fields");
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
      toast.success("login successful");
      navigate("/home");
    }
    setLoading(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div style={{ margin: "1% 2%" }}>
      <div>
        <img src={logo} height="40px" />
      </div>
      <div className={style.LoginSection}>
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}>
            <b>Login / Register</b>
          </div>
          <div>
            <TextField onChange={(text) => {
              setEmail(text.target.value);
            }} placeholder='Mobile / Email' variant="standard" />
          </div>
          <div>
            <TextField onChange={(text) => {
              setPass(text.target.value);
            }} placeholder='Password' variant="standard" />
          </div>
          <div style={{ textAlign: "right" }}>
            Don't have password?
          </div>

          <Button variant="outlined" color='warning' style={{ padding: "2px", color: "black", textTransform: 'none', borderRadius: "15px" }}><span style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", textAlign: "center" }}><img src={google} height="30px" />Sign in with Google</span></Button>

          <Button variant="outlined" color='warning' style={{ padding: "2px", color: "black", textTransform: 'none', borderRadius: "15px" }}><span style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", textAlign: "center" }}><img src={facebook} height="30px" />Sign in with Facebook</span></Button>

          <Button variant="outlined" style={{ padding: "2px", color: "white", textTransform: 'none', borderRadius: "15px", backgroundColor: "black" }}><span style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", textAlign: "center" }}><img src={apple} height="25px" />Sign in with Apple</span></Button>


          <Button
            onClick={() => {
              userSignIn();
            }}
            variant="outlined" style={{ padding: "2px", color: "white", textTransform: 'none', borderRadius: "15px", fontSize: "20px", backgroundColor: "black", marginTop: '6%' }}>Login</Button>

        </div>

      </div>
    </div >
  )
}

export default LoginRegister