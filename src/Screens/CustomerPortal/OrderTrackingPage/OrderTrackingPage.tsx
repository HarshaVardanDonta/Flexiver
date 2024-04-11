import { Divider, Step, StepLabel, Stepper } from "@mui/material";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import "./OrderTrackingPage.css";
export default function OrderTrackingPage() {

    const orderStatus = ['Order Confirmed', 'Partner Assigned', 'Package Picked Up', 'Package Enroute', 'Package Delivered'];
    return (
        <div>
            <CustomerPortalHeader />
            <div className="orderTrackingPage">
                <h2>Current Order Status</h2>
                <div className="trackPageTop">
                    <div className="trackPageSummary">
                        <h3>Order Id: #123456</h3>
                        <p>Delivered By / Delivery Partner: #DriverId | Name</p>
                        <p>Item Description: Some Item Description provided by user</p>
                    </div>
                    <div className="trackPagePrice">
                        <h3>Base Price: $400</h3>
                        <h3>Tax: $10</h3>
                        <Divider sx={{
                            width: "100%",
                            backgroundColor: "#D99F26"
                        }} />
                        <h3>Total: $410</h3>
                    </div>

                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <div>
                        <h3>Status:</h3>
                    </div>
                </div>

                <div className="trackPageStatusSection">
                    <div className="trackPageStepper">
                        <Stepper activeStep={2} orientation="vertical">
                            {orderStatus.map((label) => (
                                <Step sx={{
                                    '& .MuiStepLabel-root .Mui-completed': {
                                        color: 'black',
                                    },
                                    '& .MuiStepLabel-root .Mui-active': {
                                        color: '#D99F26',
                                        fontWeight: 'bold',
                                    },
                                }} key={label}>
                                    <StepLabel>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                    <div className="trackPageMap"></div>
                </div>
            </div>
            <CustomerPortalFooter />
        </div >
    );
}