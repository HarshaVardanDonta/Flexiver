import React from 'react';
import './VehicleComp.css';
import { Typography } from 'antd';

interface VehicleCompProps {
    vehicleName: string;
    vehicleImage: string;
    vehicleDescription: string;
}

export default function VehicleComp({ vehicleName, vehicleImage, vehicleDescription }: VehicleCompProps) {
    return (
        <div className='vehicleContainer'>
            <div className='vehicleImageContainer'>
                <img src={vehicleImage} alt='logo' className='vehicleLogo' />
            </div>
            <div className='vehicleTextContainer'>
                <Typography.Text>
                    {vehicleName}
                </Typography.Text>
                <div className='extraVehicleTextReveal'>
                    <Typography.Text>
                        {vehicleDescription}
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
}