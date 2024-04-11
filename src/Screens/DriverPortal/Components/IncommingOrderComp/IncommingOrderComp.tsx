import { FaMapMarker } from "react-icons/fa"
import "./IncommingOrderComp.css"
import { FaMapPin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function IncommingOrderComp() {
    const navigate = useNavigate();
    return (

        <div className="IncommingOrderComp" onClick={() => {
            navigate("/deliveryStatusScreen", { state: { ongoing: true } })
        }}>
            <div className="customerDetailsSection">
                <div >Customer Name: Some Name</div>
                <div >Receiver Name: Some Name</div>
                <div >Delivery Id: #DID-001-2024</div>
            </div>
            <hr />
            <div className="customerDetailsSection">
                <div >
                    Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div >Item Weight: 4Kg</div>
                <div >Quantity: 1Nos</div>
            </div>
            <hr />
            <div className="customerDetailsSection">
                <div className="incommingOrderCompAddress">
                    <FaMapPin />
                    <div>
                        <b >Pick up Address</b>
                        <br />
                        jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                    </div>
                </div>

                <div className="incommingOrderCompAddress">
                    <FaMapMarker />
                    <div>
                        <b >Drop Address</b>
                        <br />
                        jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                    </div>
                </div>
            </div>
        </div>
    );
}