import React, { useState } from "react";
import "./QuotePage.css";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import VehicleComp from "../Components/VehicleComp/VehicleComp";
import Spacer from "../../../Components/MySpacer";
import Logo from "../../../Assets/CustomerPortal/FlexiverWhiteLogo.png"
import { Typography } from "antd";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import CustomTextField from "../../../Components/CustomTextField";
import { Height, Margin, Padding } from "@mui/icons-material";
import { Divider } from "@mui/material";
import FlightOfStairsComp from "../Components/FlightOfStairsComp/FlightOfStairsComp";
import CustomDropDown from "../Components/CustomDropDown/CustomDropDown";

export default function QuotePage() {
    const [pickUpStairsCount, setPickUpStairsCount] = useState(0);
    const [dropOffStairsCount, setDropOffStairsCount] = useState(0);

    function handlePickUpStairsAdd() {
        if (pickUpStairsCount >= 0) {
            setPickUpStairsCount(pickUpStairsCount + 1);
        }
    }
    function handlePickUpStairsRemove() {
        if (pickUpStairsCount > 0) {
            setPickUpStairsCount(pickUpStairsCount - 1);
        }
    }
    function handleDropOffStairsAdd() {
        if (dropOffStairsCount >= 0) {
            setDropOffStairsCount(dropOffStairsCount + 1);
        }
    }
    function handleDropOffStairsRemove() {
        if (dropOffStairsCount > 0) {
            setDropOffStairsCount(dropOffStairsCount - 1);
        }
    }
    return (
        <div>
            <CustomerPortalHeader />
            <Spacer height={20} />
            <div className="customerQuotePage">
                <Typography.Title level={2} style={{
                    textAlign: "center",
                }}>Let's plan your move!</Typography.Title>
                <Typography.Title level={4} style={{
                    textAlign: "center",
                }}>Select vehicle type</Typography.Title>
                <Typography.Title level={4} ><AiOutlineEnvironment /> City</Typography.Title>
                <div className="vehicleBanner">
                    <VehicleComp vehicleName={"Two Wheeler"} vehicleImage={Logo} vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"} />
                    <VehicleComp vehicleName={"Two Wheeler"} vehicleImage={Logo} vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"} />
                    <VehicleComp vehicleName={"Two Wheeler"} vehicleImage={Logo} vehicleDescription={"Can Carry upto 5Kg and 3ftx3ftx3ft package"} />
                    <div className="getQuoteButton">
                        Get an Instant<br />Quote Now!
                        <br /><br /> →
                    </div>
                </div>
                <div className="dateSelectionSection">
                    <Typography.Title level={4} style={{
                        textAlign: "center",
                    }}>Choose a Date and Time:
                    </Typography.Title>
                    <div className="chooseDateButton">
                        <BiCalendar /> <Spacer width={10} /> Open Calender
                    </div>
                </div>
                <div className="pickupAndDropSectionBanner">
                    <div className="pickupSection">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '89%'
                        }}>
                            <CustomTextField placeHolder={'First Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                            <Spacer width={20} />
                            <CustomTextField placeHolder={'Last Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                        </div>
                        <CustomTextField placeHolder={'Enter E-Mail'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <CustomTextField placeHolder={'Enter Password'} type='password' onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <FlightOfStairsComp onAdd={handlePickUpStairsAdd}
                            onRemove={handlePickUpStairsRemove}
                            count={pickUpStairsCount} />
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className="pickupSection">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '89%'
                        }}>
                            <CustomTextField placeHolder={'First Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                            <Spacer width={20} />
                            <CustomTextField placeHolder={'Last Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                        </div>
                        <CustomTextField placeHolder={'Enter E-Mail'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <CustomTextField placeHolder={'Enter Password'} type='password' onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <FlightOfStairsComp onAdd={handleDropOffStairsAdd}
                            onRemove={handleDropOffStairsRemove}
                            count={dropOffStairsCount} />
                    </div>
                </div>
            </div>
            <Spacer height={30} />
            <div className="quoteItemSpecSection">
                <div className="quoteItemSpecSectionMapSection">

                </div>
                <div className="quoteItemSpecSectionRightSection">
                    <Typography.Title level={4}>Provide Item Specifications</Typography.Title>
                    <div className="quoteItemSpecSectionRightSectionEntrycontainer">
                        <div className="quoteItemSpecSectionRightSectionText">
                            Enter Number of Items
                        </div>
                        <CustomTextField placeHolder={'How many items'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '40%',
                            border: 'none',
                        }} />
                    </div>
                    <div className="quoteItemSpecSectionRightSectionEntrycontainer">
                        <div className="quoteItemSpecSectionRightSectionText">
                            Enter Approx Weight
                        </div>
                        <CustomTextField placeHolder={'Maximum for selected Vehicle'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '40%',
                            border: 'none',
                        }} />
                    </div>
                    <div className="quoteItemSpecSectionRightSectionEntrycontainer">
                        <div className="quoteItemSpecSectionRightSectionText">
                            No. of Haulers
                        </div>
                        <CustomTextField placeHolder={'Maximum 2 Haulers'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '40%',
                            border: 'none',
                        }} />
                    </div>
                    <div className="quoteItemSpecSectionRightSectionEntrycontainer">
                        <div className="quoteItemSpecSectionRightSectionText">
                            Parking Space Available?
                        </div>
                        <div style={{
                            width: '43%',
                        }}>
                            <CustomDropDown
                                label={'Select an Option'}
                                options={['Yes', 'No']}
                                selectedOption={'Select'}
                                onOptionChange={(option) => { }}
                                buttonId={'parkingSpaceAvailableDropButton'}
                                menuId={'parkingSpaceAvailableMenu'}
                                style={{
                                    backgroundColor: '#FFECC0',
                                    borderRadius: 15,
                                    padding: 10,
                                    width: '100%',
                                }}
                                textStyle={{
                                    fontWeight: '600',
                                    color: '#4A4A4A',
                                    textAlign: 'start',
                                }}
                            />
                        </div>


                    </div>
                    <div className="quoteItemSpecSectionRightSectionEntrycontainer">
                        <div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '16px',
                            fontWeight: '600',
                            backgroundColor: '#FFECC0',
                            padding: '10px',
                            borderRadius: '15px',
                            width: '40%',
                            justifyContent: 'center',
                            color: '#4A4A4A',
                            cursor: 'pointer',
                        }}>
                            Take a Picture!
                        </div>
                    </div>
                </div>
            </div>
            <div className="customerQuotePage">
                hi

            </div>
        </div>
    );
}