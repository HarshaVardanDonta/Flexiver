import { Typography } from "@mui/material";
import "./OrderHistoryComp.css";
import { useNavigate } from "react-router-dom";
import CustomerQuoteModel from "../../../../Model/CustomerQuoteModel";
import { useEffect, useState } from "react";

interface OrderHistoryProps {
  order: CustomerQuoteModel;
}

export default function OrderHistoryComp(props: OrderHistoryProps) {
  const navigate = useNavigate();

  const { order } = props;
  console.log("Order Details:", order);

  const [date, setDate] = useState("");

  useEffect(() => {
    const timestamp = parseInt(order.dateAndTime.toString(), 10);
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDate(formattedDate);
  }, []);

  return (
    <div
      className="orderHistoryComp"
      onClick={() => {
        navigate("/deliveryStatusScreen", {
          state: { ongoing: false, order: order },
        });
      }}
    >
      <div className="orderHistoryDeliveryDetails">
        <b>Delivery ID: #123-223-6657</b>
        <div className="orderHisDes">
          <Typography variant="body2">Item Description: </Typography>
          <Typography variant="body2">{order.itemNote}</Typography>
        </div>
      </div>
      <div className="rightSec">
        <Typography fontWeight={600} variant="body2">
          Order Date: {date}
        </Typography>
        <Typography fontWeight={600}>$400</Typography>
      </div>
    </div>
  );
}
