import "./BillingPage.css";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import { Alert, Dialog, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../Components/SuccessPaymentComp/SuccessPaymentComp";
import { useState } from "react";
import { set } from "react-ga";
import Success from "../../../Assets/CustomerPortal/Approval.png";
import MapComp from "../../../Components/MapComp";
import { Icon } from "leaflet";
import mark from '../../../Assets/Location.png';
import pin from '../../../Assets/MapPin.png';
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";

const LocationIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 30] // size of the icon
});

const PinIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30] // size of the icon
});

export default function BillingPage() {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [supabase] = useState(() => MySupClient());

    async function checkUserLogin() {
        const session = await supabase.auth.getSession();
        if (session.data.session === null) {
            toast.error("Please Login to Proceed", {
                duration: 4000,
                position: 'bottom-right',
            });
        }
        else {
            setDialogOpen(true);
        }
    }
    return (
        <div className="billingPage">
            <CustomerPortalHeader />
            <div className="billinPageMainSection">
                <div className="orderSummary">
                    <h2>Order Summary</h2>
                    <div className="mapAndDescription">
                        <div className="summaryMap">
                            <MapComp positionWithIconsArray={[{
                                lat: 51.511, lng: -0.09, marker: LocationIcon,
                                popup: ""
                            }, { lat: 51.495, lng: -0.055, marker: PinIcon, popup: "POP-UP" }]} />
                        </div>
                        <div className="description">
                            <div>
                                <h3>Billing Summary:</h3>
                                <p style={{
                                    width: "100%",
                                }}>Some summary details about the order summary details about the order</p>
                            </div>
                            <div>
                                <h3>Item Description:</h3>
                                <p style={{
                                    width: "60%",
                                }}>Some summary details about the order summary details about the order</p>
                            </div>
                            <div>
                                <h3>Receiver Details:</h3>
                                <p style={{
                                    width: "60%",
                                }}>Some summary details about the order summary details about the order</p>
                            </div>
                        </div>

                    </div>
                    <h3>Total Distance: 50Km</h3>
                </div>
                <div className="billingSection">
                    <h2>Date And Time</h2>
                    <div className="priceDetails">
                        <div style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            Basic Price:
                            <div>1000</div>
                        </div>
                        <div style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            Basic Price:
                            <div>1000</div>
                        </div>
                        <div style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            Basic Price:
                            <div>1000</div>
                        </div>
                        <Divider />
                        <div style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            Basic Price:
                            <div>1000</div>
                        </div>
                    </div>
                    <div className="payButton" onClick={async () => {
                        await checkUserLogin();
                        //navigate("/orderTrackingPage");
                    }}>Proceed & Pay</div>
                    <CustomDialog open={dialogOpen} image={Success} title="Success!" description="Your Order is placed Successfully" onClose={() => {
                        setDialogOpen(false);
                        navigate("/orderTrackingPage");
                    }} />
                </div>
            </div>
            <CustomerPortalFooter />
        </div>
    );
}