import { Button, Typography, Card, Grid } from "@mui/material";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./DeliveryStatusScreen.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialog from "../../CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";
import MapComp from "../../../Components/MapComp";
import { Icon, LatLng } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";
import useWindowDimensions from "../../../Model/WindowDimensions";
import polyline from "@mapbox/polyline";

export default function DeliverStatusScreen() {
  const { state } = useLocation();
  const [ongoing, setOngoing] = useState(state ? state.ongoing : false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openAreUSure, setOpenAreUSure] = useState(false);
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const LocationIcon = new Icon({ iconUrl: mark, iconSize: [30, 60] });
  const PinIcon = new Icon({ iconUrl: pin, iconSize: [30, 60] });

  const [supabase] = useState(() => MySupClient());
  const [driverId, setDriverId] = useState();
  const [isDriverVerified, setIsDriverVerified] = useState(false);
  var [polyPoints, setPolyPoints] = useState<LatLng[]>([]);

  useEffect(() => {
    getDriver();
    getPolyLine();
  }, []);

  async function getPolyLine() {
    var decodedPoly = polyline.decode(state.order.polyString!);
    var points: LatLng[] = [];
    decodedPoly.forEach((point) => {
      const latLngPoint = new LatLng(point[0], point[1]);
      points.push(latLngPoint);
    });
    setPolyPoints(points);
  }

  const getDriver = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const { data, error } = await supabase
          .from("DriverDetails")
          .select("*")
          .eq("userId", session.data.session.user.id);

      if (error) {
        alert(error.message);
        return;
      }

      setDriverId(data[0].driverId);
      setIsDriverVerified(data[0].isVerified);
    }
  };

  const acceptOrder = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const { error } = await supabase
          .from("CustomerQuote")
          .update({ driverId, orderStatus: "Partner Assigned" })
          .eq("id", state.order.id);
      if (error) {
        alert(error.message);
        return;
      }

      setOpenAreUSure(false); // Close the confirmation dialog
      setOpenSuccess(true); // Optionally, open a success dialog or toast
      navigate("/activeDeliveryScreen", { state: state.order }); // Navigate to the new screen
    }
  };

  function dateFormat(date: string) {
    const timestamp = parseInt(date, 10);
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
      <div>
        <CustomerPortalHeader driverSide={true} />
        <div className="deliveryStatusScreen">
          <Card elevation={3} sx={{ padding: 2, marginBottom: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h5">Delivery Id: #DID-{state.order.id}</Typography>
            {!ongoing && <Typography variant="h6">Delivered On: {dateFormat(state.order.dateAndTime.toString())}</Typography>}
          </Card>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} className="mapSectionLeft" sx={{ padding: 2 }}>
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
              </Card>
            </Grid>

            <Grid item xs={12} md={6} className="mapSectionRight">
              {[
                { title: "Pick Up Address", address: state.order.pickUpAddress, parking: state.order.pickUpParkingSpace, stairs: state.order.pickUpStairs, elevator: state.order.pickUpElevator, instructions: state.order.pickUpInstructions },
                { title: "Drop Off Address", address: state.order.dropOffAddress, parking: state.order.dropOffParkingSpace, stairs: state.order.dropOffStairs, elevator: state.order.dropOffElevator, instructions: state.order.dropOffInstructions },
              ].map(({ title, address, parking, stairs, elevator, instructions }) => (
                  <Card elevation={3} sx={{ padding: 2 }} key={title}>
                    <Typography variant="h6" gutterBottom>{title}</Typography>
                    <Typography>{address}</Typography>
                    <Typography>Parking Available: {parking ? "Yes" : "No"}</Typography>
                    <Typography>Flight of Stairs: {stairs}</Typography>
                    <Typography>Elevator Available: {elevator ? "Yes" : "No"}</Typography>
                    <Typography>Instructions: {instructions}</Typography>
                  </Card>
              ))}

              <Card elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Total Trip Distance</Typography>
                <Typography>{state.order.distance}</Typography>
              </Card>

              <Card elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Driver Fare</Typography>
                <Typography>{state.order.driverFare} $</Typography>
              </Card>
            </Grid>
          </Grid>

          <Card elevation={3} sx={{ padding: 2, marginTop: 2, backgroundColor: "#f9f9f9", height: 'auto' }}>
            <Typography variant="h6" gutterBottom>Item Dimensions: {state.order.itemDimensions}</Typography>
            <Typography variant="h6" gutterBottom>No Of Items: {state.order.noOfItems}</Typography>
            <Typography variant="h6" gutterBottom>Item Description: {state.order.itemNote}</Typography>
            <Typography variant="h6" gutterBottom>Weight: {state.order.approxWeight} lbs</Typography>
          </Card>

          <div className="buttonContainer">
            {!ongoing ? (
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
            ) : (
                <>
                  <Button
                      sx={{
                        borderRadius: 2,
                      }}
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={async () => {
                        if (!isDriverVerified) {
                          return toast.error("Your account is not verified yet!");
                        }

                        const confirmAccept = window.confirm("Do you really want to accept this delivery?");
                        if (confirmAccept) {
                          await acceptOrder();
                        }
                      }}
                  >
                    Accept this Delivery
                  </Button>

                  <CustomDialog
                      autoHeight={true}
                      open={openAreUSure}
                      title="Are you sure?"
                      description="Do you want to accept this delivery?"
                      onClose={() => setOpenAreUSure(false)}
                  />
                </>
            )}
          </div>
        </div>
      </div>
  );
}
