import React from 'react';
import DriverRegistration from './DriverRegistration';
import DriverLanding from './DriverLanding';
import DriverSignUp from './DriverSignUp';
import DriverLogin from './DriverLogin';
import DriverDashboard from './DriverDashboard';
import {
    BrowserRouter,
    Routes,
    Route,
}
    from 'react-router-dom';

export default function DriverMain() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DriverLanding />} />
                    <Route path="/driverRegistration" element={<DriverRegistration />} />
                    <Route path="/driverSignUp" element={<DriverSignUp />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/driverDashboard" element={<DriverDashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}