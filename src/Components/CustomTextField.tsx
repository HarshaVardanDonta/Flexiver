import React from 'react';
import TextField from '@mui/material/TextField';
import './CustomTextFieldCSS.css';

function CustomTextField(
    { placeHolder, onChanged, style, isPassword }: { placeHolder: string, onChanged: (e: any) => void, style?: any, isPassword?: boolean }
) {
    return (
        <div
            style={style}
            className='textFieldContainer'>
            <TextField
                className='textField'
                type={isPassword ? "password" : "text"}
                InputProps={{
                    disableUnderline: true,
                }}
                variant="standard" placeholder={placeHolder} onChange={(e) => {
                    onChanged(e);
                }} />
        </div>
    );
}


export default CustomTextField;