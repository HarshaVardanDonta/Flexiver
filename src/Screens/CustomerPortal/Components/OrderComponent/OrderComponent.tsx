import { useNavigate } from "react-router-dom";
import "./OrderComponent.css";

export default function OrderComponent() {
    const navigate = useNavigate();
    return (
        <div className="orderComponent" onClick={() => {
            navigate("/orderTrackingPage");

        }}>
            <div className="orderCompLeft">
                <h3>Order Id: #123456</h3>
                <h3>Delivery By: #Driver Id | Name</h3>
                <p>Item Description: Some random Description about the item adslkn aks ndalskd a sdlkna sds Some random Description about the item adslkn aks ndalskd a sdlkna sds</p>
            </div>
            <div className="orderCompRight">
                <h3>Delivery Date: 23-23-2323</h3>
                <h3> 200$</h3>
            </div>
        </div>
    );
}
