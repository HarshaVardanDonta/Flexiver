import { useNavigate } from "react-router-dom";
import "./OrderComponent.css";
import CustomerQuoteModel from "../../../../Model/CustomerQuoteModel";
import { useEffect, useState } from "react";
import Spacer from "../../../../Components/MySpacer";

interface OrderProps {
  data: CustomerQuoteModel;
}

export default function OrderComponent(props: OrderProps) {
  const { data } = props;

  const [date, setDate] = useState("");

  useEffect(() => {
    const timestamp = parseInt(data.dateAndTime.toString(), 10);
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDate(formattedDate);
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div
        className="orderComponent"
        onClick={() => {
          navigate("/orderTrackingPage", { state: data.id });
        }}
      >
        <div className="orderCompLeft">
          <div style={{
            fontWeight: "bold",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "lightblue",
            width: "100px",
            textAlign: "center",
          }}>
            {data.orderStatus !== "Package Delivered"? "Active Order":"Order Completed"}
          </div>
          <h3>Order Id: #{data.id}</h3>
          <h3>{data.orderStatus==="Order Pending"?"Driver Not yet Assigned": data.orderStatus}</h3>
          <p>Item Description: {data.itemNote}</p>
        </div>
        <div className="orderCompRight">
          {data.orderStatus === "Package Delivered" && 
            <h3>Delivery Date: {data.deliveryDate}</h3>
          } 
          <h3 style={{
            fontWeight: "bold",
            padding: "5px",
            borderRadius: "5px",
            color: "black",
            backgroundColor: "white",
            textAlign: "center",
          }}>Base Price: {data.basePrice} $</h3>
        </div>
      </div>
      <Spacer height={10} />
    </div>

  );
}
