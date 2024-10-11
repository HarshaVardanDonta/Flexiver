import React, { useState } from "react";
import LoginPageHeader from "./LoginPageHeader";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import style from "./moreDetails.module.css";

const MoreDetails = () => {
  const [abn, setAbn] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [insuranceDocument, setInsuranceDocument] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for document preview
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false); // State for full preview dialog

  const [errors, setErrors] = useState({
    abn: "",
    vehicleMake: "",
    vehicleModel: "",
    manufacturingYear: "",
    availability: "",
    type: "",
  });

  const validateFields = () => {
    let newErrors = {
      abn: "",
      vehicleMake: "",
      vehicleModel: "",
      manufacturingYear: "",
      availability: "",
      type: "",
    };
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
      const formData = new FormData();
      formData.append("abn", abn);
      formData.append("vehicleMake", vehicleMake);
      formData.append("vehicleModel", vehicleModel);
      formData.append("manufacturingYear", manufacturingYear);
      formData.append("availability", availability);
      formData.append("type", type);
      if (insuranceDocument) {
        formData.append("insuranceDocument", insuranceDocument); // Append the selected file
      }

      // Submit the form data (you can use fetch or axios here)
      console.log("Form submitted successfully with data:", formData);
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
    if (file) {
      setInsuranceDocument(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDeleteDocument = () => {
    setInsuranceDocument(null); // Clear the selected file
    setPreviewUrl(null); // Reset preview URL
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileInput")?.click(); // Trigger file input click
  };

  // Full preview dialog functions
  const handleFullPreviewOpen = () => {
    setFullPreviewOpen(true);
  };

  const handleFullPreviewClose = () => {
    setFullPreviewOpen(false);
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
                      setErrors({ ...errors, type: "" });
                    }}
                    label="Solo / Duo?"
                    error={!!errors.type}
                >
                  <MenuItem value="solo">Solo</MenuItem>
                  <MenuItem value="duo">Duo</MenuItem>
                </Select>
              </FormControl>
              {errors.type && <span style={{ color: "red" }}>{errors.type}</span>}
            </section>
          </div>

          {/* Insurance Document Input Field */}
          <div style={{ marginTop: "20px" }}>
            <TextField
                variant="standard"
                placeholder="Insurance Documents"
                value={insuranceDocument ? insuranceDocument.name : ""}
                InputProps={{
                  readOnly: true,
                  onClick: handleDialogOpen,
                  style: {
                    cursor: "pointer", // Change cursor to pointer
                  },
                }}
            />
          </div>

          {/* Dialog for uploading insurance documents */}
          <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              fullWidth
              maxWidth="sm"
              PaperProps={{
                sx: {
                  width: "400px",
                  height: "400px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
          >
            <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >
              {/* Document preview */}
              <div
                  style={{
                    width: "250px",
                    height: "250px",
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    marginBottom: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={previewUrl ? handleFullPreviewOpen : undefined} // Open full preview on click if there's a preview URL
              >
                {previewUrl ? (
                    previewUrl.endsWith(".pdf") ? (
                        <span style={{ color: "white", cursor: "pointer" }}>
                    Click to Preview PDF
                  </span>
                    ) : (
                        <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )
                ) : (
                    "Image preview, open full preview on click"
                )}
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*,application/pdf" // Accept images and PDFs
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the input
                />
                <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#D69F29",
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#c08d22" },
                    }}
                    onClick={handleFileUploadClick}
                >
                  Select Document
                </Button>
                <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#c00000" },
                    }}
                    onClick={handleDeleteDocument}
                >
                  Delete Document
                </Button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for full preview */}
          <Dialog
              open={fullPreviewOpen}
              onClose={handleFullPreviewClose}
              maxWidth="lg"
              fullWidth
          >
            <DialogTitle>Full Document Preview</DialogTitle>
            <DialogContent>
              {insuranceDocument && previewUrl && (
                  <iframe
                      src={previewUrl}
                      width="100%"
                      height="500px"
                      title="Document Preview"
                      style={{ border: "none" }} // Add border style
                  />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFullPreviewClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Submit Button with margin */}
          <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px", // Add margin to move it away from the input fields
                backgroundColor: "#D69F29",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#c08d22" },
              }}
          >
            Submit
          </Button>
        </form>
      </LoginPageHeader>
  );
};

export default MoreDetails;
