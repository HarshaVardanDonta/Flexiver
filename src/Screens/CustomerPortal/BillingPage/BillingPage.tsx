import "./BillingPage.css";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import { Alert, Dialog, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../Components/SuccessPaymentComp/SuccessPaymentComp";
import { useEffect, useState } from "react";
import { set } from "react-ga";
import Success from "../../../Assets/CustomerPortal/Approval.png";
import MapComp from "../../../Components/MapComp";
import { Icon } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";

import { useLocation } from "react-router-dom";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";

const LocationIcon = new Icon({
  iconUrl: mark,
  iconSize: [30, 30], // size of the icon
});

const PinIcon = new Icon({
  iconUrl: pin,
  iconSize: [30, 30], // size of the icon
});

export default function BillingPage() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [supabase] = useState(() => MySupClient());
  const [id, setId] = useState(0);

  let quote = new CustomerQuoteModel();

  const { state } = useLocation();

  //useEffect -> using quote id fetch the quote
  useEffect(() => {
    console.log(typeof state.quote.dateAndTime);

    quote = state.quote;

    // console.log(quote.toJson());

    console.log("quote: ", state.quote);
  }, []);

  async function checkUserLogin() {
    const session = await supabase.auth.getSession();
    if (session.data.session === null) {
      toast.error("Please Login to Proceed", {
        duration: 4000,
        position: "bottom-right",
      });
    } else {
      //set the customer id in the state
      quote.customerId = session.data.session.user?.id;

      //insert the quote to DB
      const { data: insertedData, error } = await supabase
        .from("CustomerQuote")
        .insert(quote)
        .select();

      console.log(insertedData);
      if (error == null) {
        console.log("data: ", insertedData);
        setId(insertedData[0].id);
        toast.success("Quote added successfully");
        setDialogOpen(true);
      } else {
        console.log("Error");
        toast.error("Quote added failed");
      }
    }
  }

  const dialogClose = async () => {
    setDialogOpen(false);

    //
    const session = await supabase.auth.getSession();
    let id_ = 0;

    if (session.data.session !== null) {
      const { data, error } = await supabase
        .from("CustomerQuote")
        .select("id")
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      if (data && data.length > 0) {
        id_ = data[0].id;
        console.log("id: ", id_);

        const res = await supabase
          .from("CustomerQuote")
          .update({ paymentDone: true, orderStatus: "Order Confirmed" })
          .eq("id", id_);
        console.log("payment done updated", res);
      } else {
        console.log("No customer quotes found for the current user.");
      }
    }

    navigate("/orderTrackingPage", { state: id_ });
  };

  return (
    <div className="billingPage">
      <CustomerPortalHeader />
      <div className="billinPageMainSection">
        <div className="orderSummary">
          <h2>Order Summary</h2>
          <div className="mapAndDescription">
            <div className="summaryMap">
              {quote ? (
                <MapComp
                  positionWithIconsArray={[
                    {
                      lat: state.quote?.pickUpLat,
                      lng: state.quote?.pickUpLng,
                      marker: LocationIcon,
                      popup: "",
                    },
                    {
                      lat: state.quote?.dropOffLat,
                      lng: state.quote?.dropOffLng,
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
            <div className="description">
              <div>
                <h3>Billing Address:</h3>
                <p
                  style={{
                    width: "100%",
                  }}
                >
                  {state.quote.pickUpAddress}
                </p>
              </div>
              <div>
                <h3>Item Description:</h3>
                <p
                  style={{
                    width: "60%",
                  }}
                >
                  {state.quote.itemNote} | count: {state.quote.noOfItems} |
                  weight: {state.quote.approxWeight}
                </p>
              </div>
              <div>
                <h3>Receiver Details:</h3>
                <p
                  style={{
                    width: "80%",
                  }}
                >
                  Name: {state.quote.dropOffContactName} | Address:{" "}
                  {state.quote.dropOffAddress} | Number:{" "}
                  {state.quote.dropOffContactNumber}
                </p>
              </div>
            </div>
          </div>
          <h3>Total Distance: 50Km</h3>
        </div>
        <div className="billingSection">
          <h2>Date: {new Date(state.quote.dateAndTime).toLocaleString()}</h2>
          <div className="priceDetails">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              Basic Price:
              <div>1000</div>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              Basic Price:
              <div>1000</div>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              Basic Price:
              <div>1000</div>
            </div>
            <Divider />
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              Basic Price:
              <div>1000</div>
            </div>
          </div>
          <div
            className="payButton"
            onClick={async () => {
              await checkUserLogin();
            }}
          >
            Proceed & Pay
          </div>
          <CustomDialog
            open={dialogOpen}
            image={Success}
            title="Success!"
            description="Your Order is placed Successfully"
            onClose={dialogClose}
          />
        </div>
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
