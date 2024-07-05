import React from "react";
import TextField from "@mui/material/TextField";
import "./CustomTextFieldCSS.css";
import { IconButton } from "@mui/material";
import { FaDeleteLeft, FaMinimize } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function CustomTextField({
  placeHolder,
  onChanged,
  style,
  isPassword,
  type,
  maxLength,
  value,
  ref,
  label,
  passMisMatch,
  closeFun,
  endButton,
}: {
  placeHolder: string;
  onChanged: (e: any) => void;
  style?: any;
  isPassword?: boolean;
  type?: string;
  maxLength?: number;
  value?: string;
  ref?: any;
  label?: string;
  passMisMatch?: boolean;
  closeFun?: () => void;
  endButton?: boolean;
}) {
  return (
    <div style={style} className="textFieldContainer">
      <TextField
        error={passMisMatch}
        ref={ref}
        // fullWidth
        className="textField"
        label={label}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            endButton &&
            <IconButton
              style={{ marginRight: "10px" }}
              onClick={closeFun}
            >
              <IoMdClose size={20} />
            </IconButton>
          ),
        }}
        onInput={(e) => {
          if (maxLength) {
            if ((e.target as HTMLInputElement).value.length > maxLength) {
              (e.target as HTMLInputElement).value = (
                e.target as HTMLInputElement
              ).value.slice(0, maxLength);
            }
          }
        }}
        type={isPassword ? "password" : type ? type : "text"}
        variant="standard"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => {
          onChanged(e);
        }}
      />
      {/* <IconButton
        style={{ marginRight: "10px" }}
        onClick={closeFun} >
        <FaDeleteLeft size={20} />
      </IconButton> */}
    </div>
  );
}

export default CustomTextField;
