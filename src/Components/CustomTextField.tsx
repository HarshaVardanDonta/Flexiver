import React from 'react';
import TextField from '@mui/material/TextField';
import './CustomTextFieldCSS.css';

function CustomTextField(
    { placeHolder, onChanged, style, isPassword, type, maxLength, value, ref, label }: { placeHolder: string, onChanged: (e: any) => void, style?: any, isPassword?: boolean, type?: string, maxLength?: number, value?: string, ref?: any, label?: string }
) {
    return (
        <div
            style={style}
            className='textFieldContainer'>
            <TextField
                ref={ref}
                fullWidth
                className='textField'
                label={label}
                InputProps={{
                    disableUnderline: true,
                }}
                onInput={(e) => {
                    if (maxLength) {
                        if ((e.target as HTMLInputElement).value.length > maxLength) {
                            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.slice(0, maxLength);
                        }
                    }
                }}
                type={isPassword ? 'password' : type ? type : 'text'}
                variant="standard"
                placeholder={placeHolder}
                value={value}
                onChange={(e) => {
                    onChanged(e);
                }} />
        </div>
    );
}


export default CustomTextField;