import { Button, Typography } from "@mui/material";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./DeliveryStatusScreen.css";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomDialog from "../../CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapComp from "../../../Components/MapComp";
import { Icon } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import MySupClient from "../../../SupabaseClient";
import { set } from "react-ga";
import toast from "react-hot-toast";

export default function DeliverStatusScreen() {
  const { state } = useLocation();
  const [ongoing, setOngoing] = useState(state ? state.ongoing : false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openAreUSure, setOpenAreUSure] = useState(false);
  const navigate = useNavigate();

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
  }, []);

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

      console.log("driver assigned");

      console.log("Status updated");
    }
  };



  return (
    <div>
      <CustomerPortalHeader driverSide={true} />
      <div className="deliveryStatusScreen">
        <div className="deliveryStatusHeader">
          <h2>
            Delivery Id: #DID-{state.order.id}-{new Date().getFullYear()}
          </h2>
          {!ongoing && <h2>Delivery Delivered On: 12-12-1212</h2>}
        </div>
        <div className="deliverStatusMapSection">
          <div className="mapSectionLeft">
            <MapComp
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
              <Typography variant="h5">Pick Up Address</Typography>
              <Typography variant="h6">{state.order.pickUpAddress}</Typography>
            </div>
            <div>
              <Typography variant="h5">Drop Off Address</Typography>
              <Typography variant="h6">{state.order.dropOffAddress}</Typography>
            </div>
            <div>
              <Typography variant="h5">Total Trip Distance</Typography>
              <Typography variant="h6">{state.order.distance}</Typography>
            </div>
            <div>
              <Typography variant="h5">Total Trip Fare</Typography>
              <Typography variant="h6">200 $</Typography>
            </div>
          </div>
        </div>
        <div className="itemDimensions">
          <Typography fontWeight={600} variant="h6">
            Item Dimensions: &nbsp;
          </Typography>
          <Typography variant="h6">{state.order.itemNote}</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography fontWeight={600} variant="h6">
            No Of Items: &nbsp;
          </Typography>
          <Typography variant="h6">{state.order.noOfItems}</Typography>
        </div>
        <div className="itemDimensions">
          <Typography fontWeight={600} variant="h6">
            Item Description: &nbsp;
          </Typography>
          <Typography variant="h6">{state.order.itemNote}</Typography>
        </div>
        <div className="itemDimensions">
          <Typography fontWeight={600} variant="h6">
            Important Notes: &nbsp;
          </Typography>
          <Typography variant="h6">{state.order.pickUpInstructions}</Typography>
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
