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
          <h3>Order Id: #{data.id}</h3>
          <h3>Delivery By: #Driver Id | Name</h3>
          <p>Item Description: {data.itemNote}</p>
        </div>
        <div className="orderCompRight">
          <h3>Delivery Date: 23-23-2323</h3>
          <h3> 200$</h3>
        </div>
      </div>
      <Spacer height={10} />
    </div>

  );
}
