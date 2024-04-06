import React from "react";
import "./QuotePage.css";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import VehicleComp from "../Components/VehicleComp/VehicleComp";
import Spacer from "../../../Components/MySpacer";
import Logo from "../../../Assets/CustomerPortal/FlexiverWhiteLogo.png"

export default function QuotePage() {
    return (
        <div>
            <CustomerPortalHeader />
            <Spacer height={20} />
            <div className="vehicleBanner">
                <VehicleComp vehicleName={"Two Wheeler"} vehicleImage={Logo} vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"} />
            </div>
        </div>
    );
}