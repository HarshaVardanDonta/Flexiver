import React from "react";
import DriverRegistration from "./DriverRegistration";
import DriverLanding from "./DriverLanding";
import DriverSignUp from "./DriverSignUp";
import DriverLogin from "./DriverLogin";
import DriverDashboard from "./DriverDashboard";
import MobileLogin from "./MobileLogin";
import DriverProfileScreen from "./DriverProfile/DriverProfileScreen";
import CustomerLogin from "./CustomerPortal/CustomerSignIn/SignIn"
import CustomerSignUp from "./CustomerPortal/CustomerSignUp/SignUp";
import QuotePage from "./CustomerPortal/Quote/QuotePage";
import TearmsAndConditions from "./TearmsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";

import BillingPage from "./CustomerPortal/BillingPage/BillingPage";
import OrderTrackingPage from "./CustomerPortal/OrderTrackingPage/OrderTrackingPage";
import OrderHistoryPage from "./CustomerPortal/OrderHistoryPage/OrderHistoryPage";
import Aos from "aos";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga";
import { Toaster } from "react-hot-toast";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
ReactGA.initialize('G-176G8Q4X9H');

export default function DriverMain() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    history.listen((location) => {
      console.log("loaction", window.location.search);
      ReactGA.pageview(window.location.pathname + window.location.search);
    });
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
          <Route path="/customerLogin" element={<CustomerLogin />} />
          <Route path="/customerSignUp" element={<CustomerSignUp />} />
          <Route path="/quotePage" element={<QuotePage />} />
          <Route path="/billingPage" element={<BillingPage />} />
          <Route path="/orderTrackingPage" element={<OrderTrackingPage />} />
          <Route path="/orderHistoryPage" element={<OrderHistoryPage />} />
        </Routes>

        <Toaster position="bottom-right" />
      </BrowserRouter>
    </>
  );
}
