import React from "react";
import LoginPageHeader from "./LoginPageHeader";
import { RadioGroup, TextField } from "@mui/material";
import { Radio } from "@mui/icons-material";
import style from "./moreDetails.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const MoreDetails = () => {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  return (
    <LoginPageHeader>
      <div className={style.LoginSection}>
        <div
          style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}
        >
          <b>We need a few more details</b>
        </div>
        <TextField placeholder="ABN No" variant="standard" />
        <TextField placeholder="Vehicle make" variant="standard" />
        <TextField placeholder="Vehicle model" variant="standard" />
        <TextField
          placeholder="Vehicle manufacturing year"
          variant="standard"
        />
        <TextField placeholder="Availability" variant="standard" />

        <div style={{ display: "flex" }}>
          <span style={{marginRight:"20px",fontSize:"16px",marginTop:"18px"}}>Solo / Duo? </span>
          <section style={{ width: "30%" }}>
            <FormControl variant="standard">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                onChange={handleChange}
                label="Solo / Duo?"
              >
                <MenuItem value="solo">Solo</MenuItem>
                <MenuItem value="duo">Duo</MenuItem>
              </Select>
            </FormControl>
          </section>
        </div>
        <TextField placeholder="Insurance documents" variant="standard" />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className={style.loginButton}
            style={{
              backgroundColor: "#D69F29",
              color: "white",
              padding: "5px 50px",
              border: "none",
              borderRadius: "4px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </LoginPageHeader>
  );
};

export default MoreDetails;
