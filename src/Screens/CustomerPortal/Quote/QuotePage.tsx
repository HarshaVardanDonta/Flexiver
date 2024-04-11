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
import { Checkbox, Divider, TextField } from "@mui/material";
import FlightOfStairsComp from "../Components/FlightOfStairsComp/FlightOfStairsComp";
import CustomDropDown from "../Components/CustomDropDown/CustomDropDown";
import Fire from "../../../Assets/CustomerPortal/Fire.png";
import Battery from "../../../Assets/CustomerPortal/Charging Battery.png";
import Chemicals from "../../../Assets/CustomerPortal/Molecule.png";
import Paint from "../../../Assets/CustomerPortal/Paint Brush.png";
import Weapon from "../../../Assets/CustomerPortal/saber weapon.png";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import { useNavigate } from "react-router-dom";

export default function QuotePage() {
    const [pickUpStairsCount, setPickUpStairsCount] = useState(0);
    const [dropOffStairsCount, setDropOffStairsCount] = useState(0);

    const navigate = useNavigate();

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
                        <h3>Pickup Details</h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '89%'
                        }}>
                            <CustomTextField placeHolder={'Contact Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                            <Spacer width={20} />
                            <CustomTextField placeHolder={'Contact Number'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                        </div>
                        <CustomTextField placeHolder={'From Adddress'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <CustomTextField placeHolder={'Instructions for Partner'} onChanged={(e) => { }} style={{
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
                        <h3>DropOff Details</h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '89%'
                        }}>
                            <CustomTextField placeHolder={'Contact Name'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                            <Spacer width={20} />
                            <CustomTextField placeHolder={'Contact Number'} onChanged={(e) => { }} style={{
                                backgroundColor: '#FFECC0',
                                width: '85%',
                                border: 'none',
                            }} />
                        </div>
                        <CustomTextField placeHolder={'To Address'} onChanged={(e) => { }} style={{
                            backgroundColor: '#FFECC0',
                            width: '85%',
                            border: 'none',
                        }} />
                        <CustomTextField placeHolder={'Instructions for Partner'} type='password' onChanged={(e) => { }} style={{
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
                <div style={{
                    fontSize: '24px',
                }}>
                    Please provide details regarding the type of package you intend to send, including dimensions, weight, and any other relevant specifications or instructions?
                </div>
                <TextField
                    sx={{
                        backgroundColor: '#FFECC0',
                        borderRadius: '15px',
                        padding: '10px',
                        height: '100px',
                    }}
                    multiline={true}
                    maxRows={4}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    variant="standard"
                    placeholder="for example: a 10x10 Sofa"
                    onChange={(e) => {
                    }}
                />
                <div style={{
                    fontSize: '24px',
                }}>
                    Alternate Contact Information
                </div>
                <div className="alternateContactContainer" >
                    <CustomTextField placeHolder={'Receivers Name'} onChanged={(e) => { }} style={{
                        backgroundColor: '#FFECC0',
                        width: '45%',
                        border: 'none',
                    }} />
                    <CustomTextField placeHolder={'Receivers Contact'} onChanged={(e) => { }} style={{
                        backgroundColor: '#FFECC0',
                        width: '45%',
                        border: 'none',
                    }} />
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '600',
                }}>
                    Excluded Items
                </div>
                <div className="mainExcludedItemContainer">
                    <div className="excludedItemContainer">
                        <img src={Fire} alt="Fire" />
                        <div>Fire</div>
                    </div>
                    <div className="excludedItemContainer">
                        <img src={Battery} alt="Battery" />
                        <div>Battery</div>
                    </div>
                    <div className="excludedItemContainer">
                        <img src={Chemicals} alt="Chemicals" />
                        <div>Chemicals</div>
                    </div>
                    <div className="excludedItemContainer">
                        <img src={Paint} alt="Paint" />
                        <div>Paint</div>
                    </div>
                    <div className="excludedItemContainer">
                        <img src={Weapon} alt="Weapon" />
                        <div>Weapon</div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                    fontWeight: '600',
                }}>
                    No Excluded Items
                    <Checkbox
                        style={{
                            color: '#FFD700',
                        }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: '#FFECC0',
                    padding: '10px',
                    borderRadius: '15px',
                    width: '20%',
                    height: '30px',
                    justifyContent: 'center',
                    color: '#4A4A4A',
                    cursor: 'pointer',
                }} onClick={() => {
                    navigate('/billingPage');
                }}>
                    Submit
                </div>

            </div>
            <CustomerPortalFooter />
        </div>
    );
}