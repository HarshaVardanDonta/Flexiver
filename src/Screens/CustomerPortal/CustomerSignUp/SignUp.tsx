import "./SignUp.css";
import Logo from "../../../Assets/CustomerPortal/FlexiverSignInPageLogo.png"
import React from 'react';
import { Divider } from '@mui/material';
import { Typography } from "antd";
import Spacer from '../../../Components/MySpacer';
import CustomTextField from '../../../Components/CustomTextField';
export default function CustomerSignUp() {
    return (
        <div>
            <div className='customerSignUpMain'>
                <div className='customerSignUpImageContainer'>
                    <div>
                        <img src={Logo} alt='Logo' className='customerSignUpImage' />
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
                <div className='customerSignUpFieldsMain'>
                    <div className='SignUpFieldsContainer'>
                        <Typography.Text style={{
                            fontSize: '2rem',
                            // fontWeight: 'bold',
                        }}>
                            Fill your Details!
                        </Typography.Text>
                        <Spacer height={40} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '89%'
                        }}>
                            <CustomTextField placeHolder={'First Name'} onChanged={(e) => { }} style={{
                                backgroundColor: 'white',
                                width: '85%',
                                border: 'none',
                            }} />
                            <Spacer width={20} />
                            <CustomTextField placeHolder={'Last Name'} onChanged={(e) => { }} style={{
                                backgroundColor: 'white',
                                width: '85%',
                                border: 'none',
                            }} />
                        </div>

                        <Spacer height={20} />
                        <CustomTextField placeHolder={'Enter E-Mail'} onChanged={(e) => { }} style={{
                            backgroundColor: 'white',
                            width: '85%',
                            border: 'none',
                        }} />
                        <Spacer height={20} />
                        <CustomTextField placeHolder={'Enter Password'} type='password' onChanged={(e) => { }} style={{
                            backgroundColor: 'white',
                            width: '85%',
                            border: 'none',
                        }} />
                        <Spacer height={20} />
                        <CustomTextField placeHolder={'Re-Enter Password'} type='password' onChanged={(e) => { }} style={{
                            backgroundColor: 'white',
                            width: '85%',
                            border: 'none',
                        }} />
                        <Spacer height={20} />
                        <div className='CustomerSignUpButton'>
                            Sign Up
                        </div>
                    </div>
                    <Spacer height={20} />
                    <Divider orientation="horizontal" flexItem />
                    <Spacer height={20} />
                    <Typography.Text style={{
                        fontSize: '1.2rem'
                    }}>
                        Already have an Account? | <a href="/CustomerLogIn">Sign In Instead</a>
                    </Typography.Text>

                </div>
            </div>
        </div >
    );
}