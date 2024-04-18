import { Divider, Step, StepLabel, Stepper } from "@mui/material";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import "./OrderTrackingPage.css";
import MapComp from "../../../Components/MapComp";
import { Icon } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MySupClient from "../../../SupabaseClient";

const LocationIcon = new Icon({
  iconUrl: mark,
  iconSize: [30, 30], // size of the icon
});

const PinIcon = new Icon({
  iconUrl: pin,
  iconSize: [30, 30], // size of the icon
});

export default function OrderTrackingPage() {
  const orderStatus = [
    "Order Confirmed",
    "Partner Assigned",
    "Package Picked Up",
    "Package Enroute",
    "Package Delivered",
  ];

  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState();
  const [supabase] = useState(() => MySupClient());

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    console.log(state);
    const { data, error } = await supabase
      .from("CustomerQuote")
      .select("*")
      .eq("id", 7);

    if (data != null) {
      console.log("record", data[0]);
      setOrderDetails(data[0]);
      console.log("set record");
    } else {
      console.log("No record found", error);
    }
  };

  return (
    <div>
      <CustomerPortalHeader />
      <div className="orderTrackingPage">
        <h2>Current Order Status</h2>
        <div className="trackPageTop">
          <div className="trackPageSummary">
            <h3>Order Id: #123456</h3>
            <p>Delivered By / Delivery Partner: #DriverId | Name</p>
            <p>Item Description: Some Item Description provided by user</p>
          </div>
          <div className="trackPagePrice">
            <h3>Base Price: $400</h3>
            <h3>Tax: $10</h3>
            <Divider
              sx={{
                width: "100%",
                backgroundColor: "#D99F26",
              }}
            />
            <h3>Total: $410</h3>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <h3>Status:</h3>
          </div>
        </div>

        <div className="trackPageStatusSection">
          <div className="trackPageStepper">
            <Stepper activeStep={2} orientation="vertical">
              {orderStatus.map((label) => (
                <Step
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "black",
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#D99F26",
                      fontWeight: "bold",
                    },
                  }}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="trackPageMap">
            <MapComp
              positionWithIconsArray={[
                {
                  lat: 51.511,
                  lng: -0.09,
                  marker: LocationIcon,
                  popup: "",
                },
                { lat: 51.495, lng: -0.055, marker: PinIcon, popup: "POP-UP" },
              ]}
            />
          </div>
        </div>
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
