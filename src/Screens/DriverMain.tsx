import React from "react";
import DriverRegistration from "./DriverRegistration";
import DriverLanding from "./DriverLanding";
import DriverSignUp from "./DriverSignUp";
import DriverLogin from "./DriverLogin";
import DriverDashboard from "./DriverDashboard";
import MobileLogin from "./MobileLogin";
import DriverProfileScreen from "./DriverProfile/DriverProfileScreen";

import TearmsAndConditions from "./TearmsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";

import Aos from "aos";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

export default function DriverMain() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DriverLanding />} />
          <Route path="/driverRegistration" element={<DriverRegistration />} />
          <Route path="/driverSignUp" element={<DriverSignUp />} />
          <Route path="/driverLogin" element={<DriverLogin />} />
          <Route path="/driverDashboard" element={<DriverDashboard />} />
          <Route path="/mobileLogin" element={<MobileLogin />} />
          <Route path="/termsAndConditions" element={<TearmsAndConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/driverProfile" element={<DriverProfileScreen />} />
        </Routes>

        <Toaster position="bottom-right" />
      </BrowserRouter>
    </>
  );
}
