import { useEffect, useRef, useState } from "react";
import ButtonComp from "../Components/ButtonComp";
import MySupClient from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
import './DriverDashboard.css';
import logo from "../Assets/logo.png";
import React from "react";
import DriverDetails from "../Model/DriverDetailsModel";

export default function DriverDashboard() {
    const [supabase] = useState(() => MySupClient());
    var [driver, setDriver] = useState(new DriverDetails())
    var [editDriver, setEditDriver] = useState(new DriverDetails())
    var [isVerified, setIsVerified] = useState(false)
    var [isRejected, setIsRejected] = useState(false)
    var [underReview, setUnderReview] = useState(false)

    async function getDriverRecord() {
        const session = await supabase.auth.getSession()

        const record = await supabase.from('DriverDetails').select('*').eq('userId', session.data.session?.user.id)

        if (record && record.data && record.data[0]) {
            setDriver(record.data[0])
            editDriver = record.data[0]
            if (record.data[0].rejectionReason === null || record.data[0].rejectionReason === '') {
                setIsRejected(false)
            } else {
                setIsRejected(true)
            }
            if (record.data[0].isVerified) {
                setIsVerified(true)
            }
        }
    }
    const [listIndex, setListIndex] = useState(0)

    async function updateDriver() {
        if (editDriver.mobileNo === '' || editDriver.subUrb === '' || editDriver.city === '' || editDriver.vehicleMake === '' || editDriver.vehicleModel === '' || editDriver.vehicleYear === '' || editDriver.availability === '' || editDriver.canYouLiftAndGroove === '' || editDriver.flexerTale === '' || editDriver.flexerStyle === '' || editDriver.lastDanceMove === '') {
            console.log(editDriver)
            alert('Please fill all the fields')
            return
        }
        console.log(editDriver.toJson())
        const session = await supabase.auth.getSession()
        var { data, error } = await supabase.from('DriverDetails').update(editDriver.toJson()).eq('userId', session.data.session?.user.id)
        if (error) {
            alert(error.message)
            return
        }
        else {
            alert('Updated Successfully')
        }

    }

    useEffect(() => {
        getDriverRecord()
    }, [listIndex])
    return (
        <>
            <div className="dashHeader">
                <img src={logo} alt="logo" />
                <div className="dashHeaderButtonContainer">
                    <ButtonComp style={{
                        display: "flex",
                        padding: "0px 20px",
                        justifyContent: "center",
                        backgroundColor: "#D69F29",
                        color: "white",
                        fontSize: "20px",
                        borderRadius: "10px",
                        height: "40px",
                    }} text="Log Out" onClick={async () => {
                        await supabase.auth.signOut()
                        window.location.href = '/'
                    }} />
                </div>
            </div>
            <div className="dashboard">
                <div className="dashboard-content">
                    <h2>{driver.firstName} {driver.lastName}</h2>
                    <p style={{
                        color: 'grey',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>ABN Number: {driver.aBNNo}</p>
                    <div className="status">
                        {
                            !isVerified &&
                            <p>Your profile is not verified yet!</p>
                        }
                        {
                            isVerified &&
                            <p style={{
                                color: 'green'
                            }}>Verified Profile</p>
                        }
                        {isRejected &&
                            <>
                                <h3 style={{
                                    color: 'red',
                                    fontWeight: 'bold'
                                }}>Reason for Rejection: {driver.rejectionReason}</h3>
                            </>
                        }
                    </div>
                    <div className="dash-grid">
                        <div className="dash-left">
                            <input name="test" type="text" placeholder='Email' disabled={isRejected} defaultValue={driver.email} />
                            <input type="text" placeholder='Phone No' defaultValue={driver.mobileNo} onChange={
                                (e) => {
                                    editDriver.mobileNo = e.target.value;
                                }
                            } />
                            <input type="text" placeholder='Suburb' defaultValue={driver.subUrb} onChange={
                                (e) => {
                                    editDriver.subUrb = e.target.value;
                                }
                            } />
                            <input type="text" placeholder='City' defaultValue={driver.city} onChange={
                                (e) => {
                                    editDriver.city = e.target.value;
                                }
                            } />
                        </div>
                        <br />
                        <br />
                        <div className="dash-right">
                            <select name="type" defaultValue={driver.vehicleType} onChange={
                                (e) => {
                                    editDriver.vehicleType = e.target.value;
                                }
                            }>
                                <option value="2 weeler">2 Wheeler</option>
                                <option value="UTE / Van">4 Wheeler</option>
                                <option value="Refregerated Van">Refregirated Van</option>
                            </select>
                            {/* <input type="text" placeholder='Vehicle Type' defaultValue={driver.vehicleType} /> */}
                            <input type="text" placeholder='Vehicle Make' defaultValue={driver.vehicleMake} onChange={
                                (e) => {
                                    editDriver.vehicleMake = e.target.value;
                                }
                            } />
                            <input type="text" placeholder='Vehicle Model' defaultValue={driver.vehicleModel} onChange={
                                (e) => {
                                    editDriver.vehicleModel = e.target.value;
                                }
                            } />
                            <input type="text" placeholder='Vehicle Year' defaultValue={driver.vehicleYear} onChange={
                                (e) => {
                                    editDriver.vehicleYear = e.target.value;
                                }
                            } />
                        </div>
                    </div>

                    <p className='title'>APPLICATION</p>
                    <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.availability} onChange={
                        (e) => {
                            editDriver.availability = e.target.value;
                        }
                    } />
                    <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.canYouLiftAndGroove} onChange={
                        (e) => {
                            editDriver.canYouLiftAndGroove = e.target.value;
                        }
                    } />

                    <p className='title'>PARTY PREFERENCES</p>
                    <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerTale} onChange={
                        (e) => {
                            editDriver.flexerTale = e.target.value;
                        }
                    } />
                    <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerStyle} onChange={
                        (e) => {
                            editDriver.flexerStyle = e.target.value;
                        }
                    } />

                    <p className='title'>LAST DANCE MOVE</p>
                    <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.lastDanceMove} onChange={
                        (e) => {
                            editDriver.lastDanceMove = e.target.value;
                        }
                    } />
                    <br />
                    <br />
                    <br />
                    <ButtonComp style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#D69F29",
                        color: "white",
                        width: "50%",
                        fontWeight: "bold",
                        fontSize: "20px",
                        borderRadius: "10px",
                        height: "40px",
                    }} text="Update" onClick={async () => {
                        await updateDriver()
                    }} />
                </div>
            </div>
        </>

    )
}