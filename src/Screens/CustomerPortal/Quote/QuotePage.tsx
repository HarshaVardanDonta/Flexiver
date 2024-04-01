import React from "react";
import "./QuotePage.css";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import VehicleComp from "../Components/VehicleComp/VehicleComp";
import Spacer from "../../../Components/MySpacer";

export default function QuotePage() {
    return (
        <div>
            <CustomerPortalHeader />
            <Spacer height={20} />
            <div className="vehicleBanner">
                <VehicleComp />
                <VehicleComp />
                <VehicleComp />
            </div>
        </div>
    );
}