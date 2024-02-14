import React from 'react';
import TextField from '@mui/material/TextField';
import './CustomTextFieldCSS.css';

function CustomTextField(
    { placeHolder, onChanged }: { placeHolder: string, onChanged: (e: any) => void }
) {
    return (
        <div className='textFieldContainer'>
            <TextField
                className='textField'
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