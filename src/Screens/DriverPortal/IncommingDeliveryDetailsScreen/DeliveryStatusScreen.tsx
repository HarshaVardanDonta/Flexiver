import { Button, Typography } from "@mui/material";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./DeliveryStatusScreen.css";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomDialog from "../../CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapComp from "../../../Components/MapComp";
import { Icon, LatLngExpression } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import MySupClient from "../../../SupabaseClient";
import { set } from "react-ga";
import toast from "react-hot-toast";
import useWindowDimensions from "../../../Model/WindowDimensions";
import polyline from "@mapbox/polyline";
import { LatLng } from "use-places-autocomplete";

export default function DeliverStatusScreen() {
  const { state } = useLocation();
  const [ongoing, setOngoing] = useState(state ? state.ongoing : false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openAreUSure, setOpenAreUSure] = useState(false);
  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();


  console.log(state);
  const record = state.order;
  console.log(record);

  const LocationIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 60], // size of the icon
  });

  const PinIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 60], // size of the icon
  });

  const [supabase] = useState(() => MySupClient());
  const [driverId, setDriverId] = useState();
  const [isDriverVerified, setIsDriverVerified] = useState(false);

  useEffect(() => {
    getDriver();
    getPolyLine();
  }, []);
  var [polyPoints, setPolyPoints] = useState<LatLng[]>([]);

  async function getPolyLine() {
    var decodedPoly = polyline.decode(state.order.polyString!);
    var points: LatLng[] = [];
    decodedPoly.forEach((point) => {
      points.push({ lat: point[0], lng: point[1] });
    });
    setPolyPoints(points);
    console.log("polyPoints", polyPoints);
  }

  const getDriver = async () => {
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      console.log(session.data.session.user.id);
      const { data, error } = await supabase
        .from("DriverDetails")
        .select("*")
        .eq("userId", session.data.session.user.id);

      if (error) {
        alert(error.message);
        return;
      }

      console.log("data", data);
      setDriverId(data[0].driverId);
      setIsDriverVerified(data[0].isVerified);
      console.log("driverId", driverId);
      console.log("isDriverVerified", isDriverVerified);
    }
  };

  const acceptOrder = async () => {
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      const { error } = await supabase
        .from("CustomerQuote")
        .update({ driverId: driverId, orderStatus: "Partner Assigned" })
        .eq("id", state.order.id);
      if (error) {
        alert(error.message);
        return;
      }
      setOpenAreUSure(false);

      navigate("/activeDeliveryScreen", { state: record });

      console.log("driver assigned");

      console.log("Status updated");
    }
  };

  function dateFormat(date: string) {
    const timestamp = parseInt(date, 10);
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  }



  return (
    <div>
      <CustomerPortalHeader driverSide={true} />
      <div className="deliveryStatusScreen">
        <div className="deliveryStatusHeader">
          <h2>
            Delivery Id: #DID-{state.order.id}
          </h2>
          {!ongoing && <h2>Delivered On: {
            dateFormat(state.order.dateAndTime.toString())
            }</h2>}
        </div>
        <div className="deliverStatusMapSection">
          <div className="mapSectionLeft">
            <MapComp
            polyPoints={polyPoints}
              positionWithIconsArray={[
                {
                  lat: state.order.pickUpLat,
                  lng: state.order.pickUpLng,
                  marker: LocationIcon,
                  popup: "Pick UP Location",
                },
                {
                  lat: state.order.dropOffLat,
                  lng: state.order.dropOffLng,
                  marker: PinIcon,
                  popup: "Drop Off Location",
                },
              ]}
            />
          </div>
          <div className="mapSectionRight">
            <div>
              <Typography variant="h6">Pick Up Address</Typography>
              <Typography >{state.order.pickUpAddress} <br/>Parking Available: {state.order.pickUpParkingSpace ? "Yes":"No"} | Flight of Stairs: {state.order.pickUpStairs} | Elevator Available: {state.order.pickUpElevator? "Yes": "No"} | Instructions: {state.order.pickUpInstructions}</Typography>
            </div>
            <div>
              <Typography variant="h6">Drop Off Address</Typography>
              <Typography >{state.order.dropOffAddress} <br/>Parking Available: {state.order.dropOffParkingSpace ? "Yes":"No"} | Flight of Stairs: {state.order.dropOffStairs} | Elevator Available: {state.order.dropOffElevato? "Yes": "No"} | Instructions: {state.order.dropOffInstructions} </Typography>
            </div>
            <div>
              <Typography variant="h6">Total Trip Distance</Typography>
              <Typography >{state.order.distance}</Typography>
            </div>
            <div>
              <Typography variant="h6">Driver Fare</Typography>
              <Typography >{state.order.driverFare} $</Typography>
            </div>
          </div>
        </div>

        <div className="itemRelatedSection">
          <img src={state.order.imageUrl} alt="Item Image" style={{ width: width>600 ? "40%": "80%", height: "auto", borderRadius:"10px" }} />
          <div>
              <div className="itemDimensions">
                <Typography  variant="h6">
                  Item Dimensions: &nbsp;
                </Typography>
                <Typography >{state.order.itemDimensions}</Typography>
              </div>
              <div className="itemDimensions">
                 <Typography  variant="h6">
                  No Of Items: &nbsp;
                </Typography>
                <Typography >{state.order.noOfItems}</Typography>
              </div>
              <div className="itemDimensions">
                <Typography  variant="h6">
                  Item Description: &nbsp;
                </Typography>
                <Typography >{state.order.itemNote}</Typography>
              </div>
              <div className="itemDimensions">
                 <Typography variant="h6">
                  Weight: &nbsp;
                </Typography>
                <Typography >{state.order.approxWeight} lbs</Typography>
              </div>       
          </div>
        </div>
        
       

        <div className="buttonContainer">
          {!ongoing && (
            <Button
              sx={{
                borderRadius: 2,
                backgroundColor: "#FFECC1",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#FFECC1",
                  color: "#000000",
                },
              }}
              fullWidth
              variant="contained"
            >
              Go Back
            </Button>
          )}
          {ongoing && (
            <>
              <Button
                sx={{
                  borderRadius: 2,
                }}
                fullWidth
                variant="contained"
                color="success"
                onClick={() => {
                  if (isDriverVerified === false) {
                    return toast.error("Your account is not verified yet!");
                  }
                  setOpenAreUSure(true);
                }}
              >
                Accept this Delivery
              </Button>
              <CustomDialog
                autoHeight={true}
                open={openSuccess}
                title={""}
                description={""}
                htmlComponent={
                  <>
                    <div>
                      <h3>Pick Up Address:</h3>
                      <h4>doasn asodin adsoin adsoinasd oaisnd adsio</h4>
                    </div>
                    <div>
                      <h3>Drop Off Address:</h3>
                      <h4>doasn asodin adsoin adsoinasd oaisnd adsio</h4>
                    </div>
                    <div>
                      <h3>Receiver Name:</h3>
                      <h4>doasn asodin </h4>
                    </div>
                    <div>
                      <h3>Receiver Contact:</h3>
                      <h4>doasn asodin adsoin adsoinasd oaisnd adsio</h4>
                    </div>
                  </>
                }
                onClose={function (): void {
                  setOpenSuccess(false);
                  navigate("/activeDeliveryScreen", { state: record });
                }}
              />

              <CustomDialog
                hideYayButton={true}
                autoHeight={true}
                open={openAreUSure}
                title={""}
                description={""}
                htmlComponent={
                  <div>
                    <h3>Are you sure you want to accept this delivery?</h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        sx={{
                          borderRadius: 2,
                        }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setOpenAreUSure(false);
                        }}
                      >
                        No
                      </Button>
                      <Button
                        sx={{
                          borderRadius: 2,
                        }}
                        variant="contained"
                        color="success"
                        onClick={acceptOrder}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                }
                onClose={function (): void {
                  setOpenAreUSure(false);
                  setOpenSuccess(true);
                }}
              />
            </>
          )}
          {ongoing && (
            <Button
              sx={{
                borderRadius: 2,
              }}
              fullWidth
              variant="contained"
              color="error"
            >
              Nope
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
