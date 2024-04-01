import React from 'react';
import "./SignIn.css";
import Logo from "../../../Assets/CustomerPortal/FlexiverSignInPageLogo.png"
import { Divider } from '@mui/material';
import { Typography } from "antd";
import Spacer from '../../../Components/MySpacer';
import CustomTextField from '../../../Components/CustomTextField';
import MySupClient from '../../../SupabaseClient';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CustomerSignIn() {
    const [supabase] = useState(() => MySupClient());
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    let navigate = useNavigate();
    async function CustomerSignIn() {
        if (email === "" || pass === "") {
            toast.error("Please fill all the fields!");
            return;
        }
        const data = await supabase.auth.signInWithPassword({
            email: email,
            password: pass,
        });
        console.log(data.data.user?.aud);
        if (data.error) {
            alert(data.error.message);
            return;
        }
        if (data.data.user?.aud === "authenticated") {
            navigate('/quotePage');
        }
    }

    return (
        <div>
            <div className='customerSignInMain'>
                <div className='customerSignInImageContainer'>
                    <div>
                        <img src={Logo} alt='Logo' className='customerSignInImage' />
                        <Spacer height={20} />
                        <Typography.Text style={{
                            fontSize: '2.5rem'
                        }}>
                            Move with Ease, Pack with
                        </Typography.Text><br />
                        <Typography.Text strong style={{
                            fontSize: '2.5rem'
                        }}>
                            Precision!
                        </Typography.Text>
                    </div>
                </div>
                <div className='customerSignInFieldsMain'>
                    <div className='SignInFieldsContainer'>
                        <Typography.Text style={{
                            fontSize: '2rem',
                            // fontWeight: 'bold',
                        }}>
                            Log In to Flexiver!
                        </Typography.Text>
                        <Spacer height={40} />
                        <CustomTextField placeHolder={'Enter E-Mail'} onChanged={(e) => {
                            setEmail(e.target.value);
                        }} style={{
                            backgroundColor: 'white',
                            width: '85%',
                            border: 'none',
                        }} />
                        <Spacer height={20} />
                        <CustomTextField placeHolder={'Enter Password'} type='password' onChanged={(e) => {
                            setPass(e.target.value);
                        }} style={{
                            backgroundColor: 'white',
                            width: '85%',
                            border: 'none',
                        }} />
                        <Spacer height={20} />
                        <div className='CustomerSignInButton'
                            onClick={() => {
                                CustomerSignIn();
                            }}>
                            Log In
                        </div>
                    </div>
                    <Spacer height={20} />
                    <Divider orientation="horizontal" flexItem />
                    <Spacer height={20} />
                    <Typography.Text style={{
                        fontSize: '1.2rem'
                    }}>
                        New to FLEXIVER? <a href='/CustomerSignUp'>Sign Up Instead</a>
                    </Typography.Text>

                </div>
            </div>
        </div >
    );
}