import React from 'react';
import DriverRegistration from './DriverRegistration';
import DriverLanding from './DriverLanding';
import DriverSignUp from './DriverSignUp';
import DriverLogin from './DriverLogin';
import DriverDashboard from './DriverDashboard';
import MobileLogin from './MobileLogin';
import Aos from 'aos';
import { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
}
    from 'react-router-dom';

export default function DriverMain() {
    useEffect(() => {
        Aos.init();
        Aos.refresh();
    }, [])
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DriverLanding />} />
                    <Route path="/driverRegistration" element={<DriverRegistration />} />
                    <Route path="/driverSignUp" element={<DriverSignUp />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/driverDashboard" element={<DriverDashboard />} />
                    <Route path="/mobileLogin" element={<MobileLogin />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}