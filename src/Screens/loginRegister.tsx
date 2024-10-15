import React, { useEffect, useState } from 'react';
import logo from '../Assets/logoBlack.svg';
import style from './loginRegister.module.css';
import google from '../Assets/Google.svg';
import { Button, TextField } from "@mui/material";
import MySupClient from '../SupabaseClient';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [supabase] = useState(() => MySupClient());
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null); // State to track the user's session

    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    // Email validation function
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password: string): string | null => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must contain at least one special character";
        }
        if (/\s/.test(password)) {
            return "Password should not contain spaces";
        }
        return null; // Password is valid
    };

    // Check if the user is already logged in
    async function checkLogin() {
        const { data } = await supabase.auth.getSession();
        setSession(data.session); // Update session state
        if (data.session) {
            navigate("/home");
        }
    }

    async function userSignIn() {
        setEmailError("");
        setPassError("");

        // Perform validation
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        const errorMessage = validatePassword(pass);
        if (errorMessage) {
            setPassError(errorMessage);
            return;
        }
        if (email === "" || pass === "") {
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass,
        });
        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }
        if (data.user?.aud === "authenticated") {
            toast.success("Login successful");
            setSession(data.session); // Update session state
            navigate("/home");
        }
        setLoading(false);
    }

    async function userSignInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            toast.error(`Google Sign-In failed: ${error.message}`);
            return;
        }

        // After signing in, check the session state
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session); // Update session state

        if (sessionData.session) {
            toast.success("Google Sign-In successful!");
            navigate("/home");
        } else {
            toast.error("Failed to retrieve session after Google sign-in.");
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <div style={{ margin: "1% 2%" }}>
            <Link to="/home">
                <img src={logo} height="40px" alt="logo" />
            </Link>
            <div className={style.LoginSection}>
                <div style={{ width: "100%" }}>
                    <div style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}>
                        <b>Login / Register</b>
                    </div>
                    <div>
                        <TextField
                            onChange={(text) => setEmail(text.target.value)}
                            placeholder='Mobile / Email'
                            variant="standard"
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </div>
                    <div>
                        <TextField
                            onChange={(text) => setPass(text.target.value)}
                            placeholder='Password'
                            variant="standard"
                            type="password"
                            error={!!passError}
                            helperText={passError}
                        />
                    </div>
                    <div style={{ textAlign: "right" }}>
                        Don't have password?
                    </div>

                    <Button
                        variant="outlined"
                        color='warning'
                        style={{ padding: "2px", color: "black", textTransform: 'none', borderRadius: "15px" }}
                        onClick={userSignInWithGoogle}
                    >
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", textAlign: "center" }}>
                            <img src={google} height="30px" alt="google logo" />
                            Sign in with Google
                        </span>
                    </Button>

                    <Button
                        onClick={userSignIn}
                        variant="outlined"
                        style={{ padding: "2px", color: "white", textTransform: 'none', borderRadius: "15px", fontSize: "20px", backgroundColor: "black", marginTop: '6%' }}
                    >
                        Login
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
