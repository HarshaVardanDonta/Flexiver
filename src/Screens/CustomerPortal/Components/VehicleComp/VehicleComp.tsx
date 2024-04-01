import React from 'react';
import './VehicleComp.css';
import { Typography } from 'antd';
import logo from '../../../../Assets/CustomerPortal/FlexiverWhiteLogo.png';

export default function VehicleComp() {
    return (
        <div className='vehicleContainer'>
            <div className='vehicleImageContainer'>
                <img src={logo} alt='logo' className='vehicleLogo' />
            </div>
            <div className='vehicleTextContainer'>
                Vehicle Name
                <div className='extraVehicleTextReveal'>
                    extra information regarding the vehicle
                </div>
            </div>
        </div>
    );
}