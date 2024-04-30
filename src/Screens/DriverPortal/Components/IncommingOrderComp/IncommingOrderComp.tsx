import { FaMapMarker } from "react-icons/fa";
import "./IncommingOrderComp.css";
import { FaMapPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CustomerQuoteModel from "../../../../Model/CustomerQuoteModel";

interface incomingOrderProps {
  order: CustomerQuoteModel;
}

export default function IncommingOrderComp(props: incomingOrderProps) {
  const navigate = useNavigate();
  const { order } = props;

  return (
    <div
      className="IncommingOrderComp"
      onClick={() => {
        navigate("/deliveryStatusScreen", {
          state: { ongoing: true, order: order },
        });
      }}
    >
      <div className="customerDetailsSection">
        <div>Customer Name: {order.pickUpContactName}</div>
        <div>Receiver Name: {order.dropOffContactName}</div>
        <div>
          Delivery Id: #DID-{order.id}-{new Date().getFullYear()}
        </div>
      </div>
      <hr />
      <div className="customerDetailsSection">
        <div>Item Dimensions: {order.itemNote}</div>
        <div>Item Weight: {order.approxWeight} lbs</div>
        <div>Quantity: {order.noOfItems}</div>
      </div>
      <hr />
      <div className="customerDetailsSection">
        <div className="incommingOrderCompAddress">
          <FaMapPin />
          <div>
            <b>Pick up Address</b>
            <br />
            {order.pickUpAddress}
          </div>
        </div>

        <div className="incommingOrderCompAddress">
          <FaMapMarker />
          <div>
            <b>Drop Address</b>
            <br />
            {order.dropOffAddress}
          </div>
        </div>
      </div>
    </div>
  );
}
