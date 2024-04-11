import { Typography } from "@mui/material";
import "./OrderHistoryComp.css";
import { useNavigate } from "react-router-dom";

export default function OrderHistoryComp() {
    const navigate = useNavigate();
    return (
        <div className="orderHistoryComp" onClick={() => {
            navigate("/deliveryStatusScreen", { state: { ongoing: false } })
        }}>
            <div className="orderHistoryDeliveryDetails">
                <b>Delivery ID: #123-223-6657</b>
                <div className="orderHisDes">
                    <Typography variant="body2">Item Description: </Typography>
                    <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.</Typography>
                </div>
            </div>
            <div className="rightSec">
                <Typography fontWeight={600} variant="body2">Order Date: 12/12/2021</Typography>
                <Typography fontWeight={600}>$400</Typography>
            </div>



        </div>
    );
}