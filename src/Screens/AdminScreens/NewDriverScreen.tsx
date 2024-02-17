import './NewDriverScreen.css';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import DriverDetails from '../../Model/DriverDetailsModel';


const supabase = createClient('https://tnfeykqptcbbabeuwwxn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU')


export default function NewDriverScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState<DriverDetails[]>([]);
    async function fetchDrivers() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('DriverDetails')
                .select('*')
            if (data !== null) {
                data.forEach((driver) => {
                    const driverDetails = new DriverDetails();
                    driverDetails.fromJson(driver);
                    setDrivers([...drivers, driverDetails]);
                });
                console.log(drivers);
            }
            if (error) {
                console.error('Error fetching drivers', error);
            } else {
                setDrivers(data);
            }
        } catch (error) {
            console.error('Error fetching drivers', error);
        } finally {
            setLoading(false);
        }
    }

    const init = useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <>
            {
                loading ?
                    <div className='loading'>
                        <div className='loadingAnimation'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
                        </div>
                        Fetching Drivers...
                    </div>
                    :
                    <div>
                        <h1>Drivers</h1>
                        <div >
                            {drivers.map((driver, index) => {
                                return (
                                    <div key={index} className='driverCard'>
                                        <h2>{driver.firstName} {driver.lastName}</h2>
                                        <p>{driver.email}</p>
                                        <p>{driver.mobileNo}</p>
                                        <p>{driver.aBNNo}</p>
                                        <p>{driver.subUrb}</p>
                                        <p>{driver.city}</p>
                                        <p>{driver.isVerified}</p>
                                        <p>{driver.availability}</p>
                                        <p>{driver.canYouLiftAndGroove}</p>
                                        <p>{driver.flexerTale}</p>
                                        <p>{driver.flexerStyle}</p>
                                        <p>{driver.lastDanceMove}</p>
                                        <p>{driver.vehicleType}</p>
                                        <p>{driver.vehicleModel}</p>
                                        <p>{driver.vehicleMake}</p>
                                        <p>{driver.vehicleYear}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            }
        </>
    );
}