import { Divider } from "@mui/material";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import OrderComponent from "../Components/OrderComponent/OrderComponent";
import "./OrderHistoryPage.css";
import Spacer from "../../../Components/MySpacer";

export default function OrderHistoryPage() {
    const orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            <CustomerPortalHeader />
            <div className="orderHistoryPage">
                <h2>Order History</h2>
                <h3>Older Entries</h3>
                <Divider sx={{
                    width: "85%",
                    backgroundColor: "#D99F26"
                }} />
                <Spacer height={10} />
                {orders.map((order, index) => {
                    return (
                        <div>
                            <OrderComponent key={index} />
                            <Spacer height={10} />
                        </div>

                    );
                })}
            </div>
            <CustomerPortalFooter />
        </div>
    );
}