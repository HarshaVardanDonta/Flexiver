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
import { Icon, LatLngExpression } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";

import { useLocation } from "react-router-dom";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";
import polyline from "@mapbox/polyline";
import { useLoadScript } from "@react-google-maps/api";
import { LatLng } from "use-places-autocomplete";

const LocationIcon = new Icon({
  iconUrl: mark,
  iconSize: [30, 60], // size of the icon
});

const PinIcon = new Icon({
  iconUrl: pin,
  iconSize: [30, 60], // size of the icon
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
    console.log("BillingQuote", quote);
    if(state.quote.vehicleType === "Two Wheeler"){
      twoWheelerPriceCalculator();
    }
    else if(state.quote.vehicleType === "UTE / Van"){
      uteVanPriceCalculator();
    }
    else if(state.quote.vehicleType === "Refreigerated Van"){
      refvanPriceCalculator();
    }
    // twoWheelerPriceCalculator();
    // uteVanPriceCalculator();
    // refvanPriceCalculator();

    // console.log(quote.toJson());
    getRouteDistance();

    console.log("quote: ", quote);
  }, []);

  async function checkUserLogin() {
    const session = await supabase.auth.getSession();
    if (session.data.session === null) {
      toast.error("Please Login to Proceed", {
        duration: 4000,
        position: "bottom-right",
      });
    } else {
      quote = state.quote;
      //set the customer id in the state
      quote.customerId = session.data.session.user?.id;
      quote.basePrice = finalPrice;
      quote.driverFare = finalPrice * 0.8;
    
      console.log("quote: ", quote);

      // insert the quote to DB
      const { data: insertedData, error } = await supabase
        .from("CustomerQuote")
        .insert(quote)
        .select();

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
          .update({ paymentDone: true, orderStatus: "Order Pending" })
          .eq("id", id_);
        console.log("payment done updated", res);
      } else {
        console.log("No customer quotes found for the current user.");
      }
    }

    navigate("/orderTrackingPage", { state: id_ });
  };
  var [polyPoints, setPolyPoints] = useState<LatLng[]>([]);

  async function getRouteDistance() {
    var decodedPoly = await polyline.decode(state.quote.polyString);
    var points: LatLng[] = [];
    decodedPoly.forEach((point) => {
      points.push({ lat: point[0], lng: point[1] });
    });
    setPolyPoints(points);
    console.log("polyPoints", polyPoints);
  }

  const twoWheelerBasePrice = 10;

  var [finalPrice, setPrice] = useState(0.0);

    var distance = state.quote.distance.split(" ")[0];
    var floors = state.quote.pickUpStairs + state.quote.dropOffStairs;
    var weight = state.quote.approxWeight;
    function twoWheelerPriceCalculator(){
    var price = twoWheelerBasePrice + (distance -1);
    var addPrice = 5.0;
    console.log("Floors: ", floors);
    console.log("Distance: ", distance);
    console .log("Weight: ", weight);
    if(weight>5){
      if (floors >10){
      for ( var i =0; i<weight -6; i++){
        addPrice += addPrice*0.1;
        console.log("Add Price: ", addPrice.toPrecision(2));
      }
      price += addPrice*2;
      }else{
        for ( var i =0; i<weight -6; i++){
          addPrice += addPrice*0.1;
          console.log("Add Price: ", addPrice.toPrecision(2));
        }
        price += addPrice;
      }

    }

    setPrice(parseFloat(price.toFixed(2)));
    console.log("Price: ", finalPrice);
  }

  var pricePerMin = 0.66666667;
  var basePriceUte = {
    50: 75,
    250:125,
    500:175,
    1000:225,
    10000:275,
  };
  var basePriceRefVan = {
    50: 93.75,
    250:156.25,
    500:218.75,
    1000:281.25,
    10000:343.75,
  };
  var weightPriceUte = {
    50: 10,
    250:15,
    500:25,
    1000:40,
    10000:60,
  }
  var timePerStairs = {
    50: 2,
    250:4,
    500:6,
    1000:10,
    10000:15,
  }

  function uteVanPriceCalculator(){
    console.log("UTE VAN PRICE CALCULATOR");
    console.log("Distance: ", distance);
    console.log("Floors: ", floors);
    console.log("Weight: ", weight);
    var priceForDistance = 0;
    var timePerFloor = 0;
    var pricePerWeightOrEffort = 0;

    if(weight>50 && weight<=249){
      priceForDistance = basePriceUte['50'] + (distance-5)*2;
      timePerFloor = timePerStairs['50'];
      pricePerWeightOrEffort = weightPriceUte['50'];
    }
    else if(weight>250 && weight<=499){
      priceForDistance = basePriceUte['250'] + (distance-5)*2;
      timePerFloor = timePerStairs['250'];
      pricePerWeightOrEffort = weightPriceUte['250'];
    }
    else if(weight>500 && weight<=999){
      priceForDistance = basePriceUte['500'] + (distance-5)*2;
      timePerFloor = timePerStairs['500'];
      pricePerWeightOrEffort = weightPriceUte['500'];
    }
    else if(weight>1000 && weight<=9999){
      priceForDistance = basePriceUte['1000'] + (distance-5)*2;
      timePerFloor = timePerStairs['1000'];
      pricePerWeightOrEffort = weightPriceUte['1000'];
    }
    else if(weight>10000 ){
      priceForDistance = basePriceUte['10000'] + (distance-5)*2;
      timePerFloor = timePerStairs['10000'];
      pricePerWeightOrEffort = weightPriceUte['10000'];
    }

    var priceForFloorOrTime = floors * timePerFloor * pricePerMin;

    finalPrice = priceForDistance + priceForFloorOrTime + pricePerWeightOrEffort;
    setPrice(parseFloat(finalPrice.toFixed(2)));

    console.log("Price: ", finalPrice);

  }

  function refvanPriceCalculator(){
    console.log("UTE VAN PRICE CALCULATOR");
    console.log("Distance: ", distance);
    console.log("Floors: ", floors);
    console.log("Weight: ", weight);
    var priceForDistance = 0;
    var timePerFloor = 0;
    var pricePerWeightOrEffort = 0;

    if(weight>50 && weight<=249){
      priceForDistance = basePriceRefVan['50'] + (distance-5)*2;
      timePerFloor = timePerStairs['50'];
      pricePerWeightOrEffort = weightPriceUte['50'];
    }
    else if(weight>250 && weight<=499){
      priceForDistance = basePriceRefVan['250'] + (distance-5)*2;
      timePerFloor = timePerStairs['250'];
      pricePerWeightOrEffort = weightPriceUte['250'];
    }
    else if(weight>500 && weight<=999){
      priceForDistance = basePriceRefVan['500'] + (distance-5)*2;
      timePerFloor = timePerStairs['500'];
      pricePerWeightOrEffort = weightPriceUte['500'];
    }
    else if(weight>1000 && weight<=9999){
      priceForDistance = basePriceRefVan['1000'] + (distance-5)*2;
      timePerFloor = timePerStairs['1000'];
      pricePerWeightOrEffort = weightPriceUte['1000'];
    }
    else if(weight>10000 ){
      priceForDistance = basePriceRefVan['10000'] + (distance-5)*2;
      timePerFloor = timePerStairs['10000'];
      pricePerWeightOrEffort = weightPriceUte['10000'];
    }

    var priceForFloorOrTime = floors * timePerFloor * pricePerMin;

    finalPrice = priceForDistance + priceForFloorOrTime + pricePerWeightOrEffort;
    setPrice(parseFloat(finalPrice.toFixed(2)));

    console.log("Price: ", finalPrice);

  }


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
                  polyPoints={polyPoints}
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
                  weight: {state.quote.approxWeight} | Item Type: {state.quote.itemType}
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
          <h3>Total Distance: {state.quote.distance}</h3>
        </div>
        <div className="billingSection">
          <h2>Date: {new Date(state.quote.dateAndTime).toLocaleString()}</h2>
          <div className="priceDetails">
            {/* <div
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
            </div> */}
            {/* <div
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
            </div> */}
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
              <div>{finalPrice.toString()}$</div>
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
              Total Price:
              <div>{finalPrice.toString()}$</div>
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
