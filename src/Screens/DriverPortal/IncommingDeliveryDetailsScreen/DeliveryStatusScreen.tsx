import { Button, Typography } from "@mui/material";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./DeliveryStatusScreen.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomDialog from "../../CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";



export default function DeliverStatusScreen() {
    const { state } = useLocation();
    const [ongoing, setOngoing] = useState(state ? state.ongoing : false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openAreUSure, setOpenAreUSure] = useState(false);
    return (
        <div>
            <CustomerPortalHeader driverSide={true} />
            <div className="deliveryStatusScreen">
                <div className="deliveryStatusHeader">
                    <h2>Delivery Id: DID: 324-234-234</h2>
                    {
                        !ongoing &&
                        <h2>Delivery Delivered On: 12-12-1212</h2>
                    }
                </div>
                <div className="deliverStatusMapSection">
                    <div className="mapSectionLeft">
                    </div>
                    <div className="mapSectionRight">
                        <div>
                            <Typography variant="h5">Pick Up Address</Typography>
                            <Typography variant="h6">dalksn dasklnd adslkn asdlknasdm kn aek. fvj kear vkje vkjer rvkjrf kvjr</Typography>
                        </div>
                        <div>
                            <Typography variant="h5">Drop Off Address</Typography>
                            <Typography variant="h6">dalksn dasklnd adslkn asdlknasdm kn aek. fvj kear vkje vkjer rvkjrf kvjr</Typography>
                        </div>
                        <div>
                            <Typography variant="h5">Total Trip Distance</Typography>
                            <Typography variant="h6">20 Km</Typography>
                        </div>
                        <div>
                            <Typography variant="h5">Total Trip Fare</Typography>
                            <Typography variant="h6">200 $</Typography>
                        </div>
                    </div>
                </div>
                <div className="itemDimensions">
                    <Typography fontWeight={600} variant="h6">Item Dimensions: &nbsp;</Typography>
                    <Typography variant="h6">3ft x 3ft x 3ft</Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography fontWeight={600} variant="h6">No Of Items: &nbsp;</Typography>
                    <Typography variant="h6">2 Nos</Typography>
                </div>
                <div className="itemDimensions">
                    <Typography fontWeight={600} variant="h6">Item Description: &nbsp;</Typography>
                    <Typography variant="h6">dalksn dasklnd adslkn asdlknasdm kn aek. fvj kear vkje vkjer rvkjrf kvjr</Typography>
                </div>
                <div className="itemDimensions">
                    <Typography fontWeight={600} variant="h6">Important Notes: &nbsp;</Typography>
                    <Typography variant="h6">dalksn dasklnd adslkn asdlknasdm kn aek. fvj kear vkje vkjer rvkjrf kvjr</Typography>
                </div>
                <div className="buttonContainer">
                    {
                        !ongoing &&
                        <Button sx={{
                            borderRadius: 2,
                            backgroundColor: "#FFECC1",
                            color: "#000000",
                            "&:hover": {
                                backgroundColor: "#FFECC1",
                                color: "#000000",
                            }
                        }} fullWidth variant="contained" >Go Back</Button>
                    }
                    {
                        ongoing &&
                        <>
                            <Button sx={{
                                borderRadius: 2,
                            }} fullWidth variant="contained" color="success" onClick={() => {
                                setOpenAreUSure(true);
                            }}>Accept this Delivery</Button>
                            <CustomDialog autoHeight={true} open={openSuccess} title={""} description={""} htmlComponent={<>
                                <div >
                                    <h3>Pick Up Address:</h3>
                                    <h4>doasn asodin adsoin adsoinasd oaisnd  adsio</h4>
                                </div>
                                <div >
                                    <h3>Drop Off Address:</h3>
                                    <h4>doasn asodin adsoin adsoinasd oaisnd  adsio</h4>
                                </div>
                                <div >
                                    <h3>Receiver Name:</h3>
                                    <h4>doasn asodin </h4>
                                </div>
                                <div >
                                    <h3>Receiver Contact:</h3>
                                    <h4>doasn asodin adsoin adsoinasd oaisnd  adsio</h4>
                                </div>
                            </>}
                                onClose={function (): void {
                                    setOpenSuccess(false);
                                }} />

                            <CustomDialog hideYayButton={true} autoHeight={true} open={openAreUSure} title={""} description={""}
                                htmlComponent={
                                    <div>
                                        <h3>Are you sure you want to accept this delivery?</h3>
                                        <div style={{
                                            display: "flex",
                                            gap: "20px",
                                            justifyContent: "center",
                                            marginTop: "20px",
                                        }}>
                                            <Button sx={{
                                                borderRadius: 2,
                                            }} variant="contained" color="error" onClick={() => {
                                                setOpenAreUSure(false);
                                            }}>No</Button>
                                            <Button sx={{
                                                borderRadius: 2,
                                            }} variant="contained" color="success" onClick={() => {
                                                setOpenAreUSure(false);
                                                setOpenSuccess(true);
                                            }}>Yes</Button>
                                        </div>
                                    </div>
                                }
                                onClose={function (): void {
                                    setOpenAreUSure(false);
                                    setOpenSuccess(true);
                                }} />

                        </>

                    }
                    {
                        ongoing &&
                        <Button sx={{
                            borderRadius: 2,
                        }} fullWidth variant="contained" color="error">Nope</Button>
                    }
                </div>

            </div>
        </div>
    );
}