import { Divider, Step, StepLabel, Stepper } from "@mui/material";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import "./OrderTrackingPage.css";
import MapComp from "../../../Components/MapComp";
import { Icon, LatLngExpression } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MySupClient from "../../../SupabaseClient";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";
import polyline from "@mapbox/polyline";

const LocationIcon = new Icon({
  iconUrl: mark,
  iconSize: [30, 60], // size of the icon
});

const PinIcon = new Icon({
  iconUrl: pin,
  iconSize: [30, 60], // size of the icon
});

export default function OrderTrackingPage() {
  var [polyPoints, setPolyPoints] = useState<Array<LatLngExpression>>([]);

  async function getPolyLine() {
    var decodedPoly = polyline.decode(orderDetails?.polyString!);
    setPolyPoints(decodedPoly);
    console.log("polyPoints", polyPoints);
  }

  const orderStatusArray = [
    "Order Pending",
    "Partner Assigned",
    "Package Picked Up",
    "Package En Route",
    "Package Delivered",
  ];

  const { state } = useLocation(); //this stores the quote id

  var [orderDetails, setOrderDetails] = useState<CustomerQuoteModel>();
  const [supabase] = useState(() => MySupClient());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    console.log(state);

    const { data, error } = await supabase
      .from("CustomerQuote")
      .select("*")
      .eq("id", state);

    if (data) {
      console.log("record", data);

      orderDetails = data[0];
      setOrderDetails(data[0]);
      getPolyLine();


      console.log("set record");
      console.log(orderDetails);

      setLoading(false);
    } else {
      console.log("No record found", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerPortalHeader />
      <div className="orderTrackingPage">
        <h2>Current Order Status: {orderDetails?.orderStatus}</h2>
        <div className="trackPageTop">
            <div className="trackPageSummary">
              <h3>Order Id: #{orderDetails?.id}</h3>
              <strong>{orderDetails?.orderStatus === "Order Pending"? "Waiting for Delivery Partner to be assigned":""}</strong><br/>
              Item Description: {orderDetails?.itemNote}<br/>
              Item Weight: {orderDetails?.approxWeight} lbs<br/>
              Item Quantity: {orderDetails?.noOfItems}<br/>
              Item Dimensions: {orderDetails?.itemDimensions}<br/>
              Distance: {orderDetails?.distance}<br/>
              Vehicle Type: {orderDetails?.vehicleType}<br/>
            </div>
          <img className="trackPageImage" src={orderDetails?.imageUrl} alt="Item" />
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
            <Stepper
              activeStep={
                orderDetails
                  ? orderStatusArray.indexOf(orderDetails.orderStatus)
                  : 0
              }
              orientation="vertical"
            >
              {orderStatusArray.map((label) => (
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
            {orderDetails ? (
              <MapComp
                polyPoints={polyPoints}
                positionWithIconsArray={[
                  {
                    lat: orderDetails.pickUpLat,
                    lng: orderDetails.pickUpLng,
                    marker: LocationIcon,
                    popup: "",
                  },
                  {
                    lat: orderDetails.dropOffLat,
                    lng: orderDetails.dropOffLng,
                    marker: PinIcon,
                    popup: "POP-UP",
                  },
                ]}
              />
            ) : (
              <MapComp
                positionWithIconsArray={[
                  {
                    lat: 51.511,
                    lng: -0.09,
                    marker: LocationIcon,
                    popup: "",
                  },
                  {
                    lat: 51.495,
                    lng: -0.055,
                    marker: PinIcon,
                    popup: "POP-UP",
                  },
                ]}
              />
            )}
          </div>
        </div>
        {
          orderDetails?.deliveryPartnerPickUpImage !==null &&
          <div className="driverSideImageSection">
            <div>
                <h3>Delivery Partner Pick Up Image</h3>
                <img className="trackPageImage" src={orderDetails?.deliveryPartnerPickUpImage} alt="Pickup Image" />
            </div>
            {
            orderDetails?.deliveryPartnerDropOffImage !==null &&
            <div>
                <h3>Delivery Partner Drop Off Image</h3>
                <img className="trackPageImage" src={orderDetails?.deliveryPartnerDropOffImage} alt="Pickup Image" />
            </div>
            }
         </div>
        }
       
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
