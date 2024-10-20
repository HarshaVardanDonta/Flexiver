import { TextField } from '@mui/material';
import MyQuoteTextField from '../LatestPrototype/MyQuoteTextField'
import './NewCustomerSignIn.css'
import { FaGoogle } from "react-icons/fa";
export default function NewCustomerSignIn() {
    return (
        <div className="newCustomerSignInMainPage">
            Login/Register
            <MyQuoteTextField
                lable='mobile/email'
                width='300px' />
            <br />
            <MyQuoteTextField
                lable='password'
                width='300px' />
            Don't have password?

            <div className='loginButton'>
                Login
            </div>
            <br />
            <div className='googleSignInButton'>
                <FaGoogle />  Sign in with google
            </div>
        </div>
    )
}
