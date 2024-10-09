import React, { useState } from "react";
import LoginPageHeader from "./LoginPageHeader";
import { TextField, FormControl, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import style from "./moreDetails.module.css";

const MoreDetails = () => {
  const [abn, setAbn] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [insuranceDocument, setInsuranceDocument] = useState<File | null>(null); // Specify the type as File | null
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility

  const [errors, setErrors] = useState({
    abn: "",
    vehicleMake: "",
    vehicleModel: "",
    manufacturingYear: "",
    availability: "",
    type: "",
  });

  const validateFields = () => {
    let newErrors = { abn: "", vehicleMake: "", vehicleModel: "", manufacturingYear: "", availability: "", type: "" };
    let isValid = true;

    if (!abn) {
      newErrors.abn = "ABN No is required";
      isValid = false;
    }
    if (!vehicleMake) {
      newErrors.vehicleMake = "Vehicle make is required";
      isValid = false;
    }
    if (!vehicleModel) {
      newErrors.vehicleModel = "Vehicle model is required";
      isValid = false;
    }
    if (!manufacturingYear || isNaN(Number(manufacturingYear)) || manufacturingYear.length !== 4) {
      newErrors.manufacturingYear = "Please enter a valid manufacturing year (4 digits)";
      isValid = false;
    }
    if (!availability) {
      newErrors.availability = "Availability is required";
      isValid = false;
    }
    if (!type) {
      newErrors.type = "Please select Solo or Duo";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      // Proceed with form submission
      console.log("Form submitted successfully!");
      // Log or handle the uploaded insurance document here
      console.log("Insurance Document:", insuranceDocument);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setInsuranceDocument(file);
  };

  return (
      <LoginPageHeader>
        <form onSubmit={handleSubmit} className={style.LoginSection}>
          <div style={{ fontSize: "28px", marginBottom: "2%", textAlign: "center" }}>
            <b>We need a few more details</b>
          </div>
          <TextField
              placeholder="ABN No"
              variant="standard"
              value={abn}
              onChange={(e) => setAbn(e.target.value)}
              error={!!errors.abn}
              helperText={errors.abn}
          />
          <TextField
              placeholder="Vehicle make"
              variant="standard"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              error={!!errors.vehicleMake}
              helperText={errors.vehicleMake}
          />
          <TextField
              placeholder="Vehicle model"
              variant="standard"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              error={!!errors.vehicleModel}
              helperText={errors.vehicleModel}
          />
          <TextField
              placeholder="Vehicle manufacturing year"
              variant="standard"
              value={manufacturingYear}
              onChange={(e) => setManufacturingYear(e.target.value)}
              error={!!errors.manufacturingYear}
              helperText={errors.manufacturingYear}
          />
          <TextField
              placeholder="Availability"
              variant="standard"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              error={!!errors.availability}
              helperText={errors.availability}
          />

          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "20px", fontSize: "16px", marginTop: "18px" }}>Solo / Duo? </span>
            <section style={{ width: "30%" }}>
              <FormControl variant="standard">
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={(event) => {
                      setType(event.target.value);
                      setErrors({ ...errors, type: "" }); // Clear error when selecting
                    }}
                    label="Solo / Duo?"
                    error={!!errors.type}
                >
                  <MenuItem value="solo">Solo</MenuItem>
                  <MenuItem value="duo">Duo</MenuItem>
                </Select>
              </FormControl>
              {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
            </section>
          </div>

          {/* Button to open the dialog */}
          <div style={{ marginTop: "20px" }}>
            <Button variant="outlined" onClick={handleDialogOpen}>
              Upload Insurance Documents
            </Button>
          </div>

          {/* Dialog for uploading insurance documents */}
          <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle>Upload Insurance Document</DialogTitle>
            <DialogContent>
              <TextField
                  type="file"
                  variant="standard"
                  inputProps={{ accept: "application/pdf,image/*" }} // Accept PDF and image files
                  onChange={handleFileChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              {insuranceDocument && (
                  <div style={{ marginTop: "10px" }}>
                    <b>Selected File:</b> {insuranceDocument.name}
                  </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
                type="submit"
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
        </form>
      </LoginPageHeader>
  );
};

export default MoreDetails;
