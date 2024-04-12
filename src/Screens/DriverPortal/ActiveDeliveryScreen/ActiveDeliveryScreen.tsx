import ButtonComp from "../../../Components/ButtonComp";
import Spacer from "../../../Components/MySpacer";
import CustomDropDown from "../../CustomerPortal/Components/CustomDropDown/CustomDropDown";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./ActiveDeliveryScreen.css";

export default function ActiveDeliveryScreen() {
    return (
        <div>
            <CustomerPortalHeader driverSide={true} />
            <div className="activeDeliveryPage">
                <h3>Delivery ID : DID-12-12-12-1212</h3>
                <div className="activeDeliveryMapComp">

                </div>
                <div className="buttonContainer">
                    <div className="buttonContainer1">
                        <div className="buttonStyle" onClick={function (): void {
                        }} >
                            Get Directions
                        </div>
                        <Spacer width={20} />
                        <div className="buttonStyle" onClick={function (): void {
                        }} >
                            Call Receiver
                        </div>
                    </div>
                    <div className="buttonStyle" onClick={function (): void {
                    }} >
                        Report a Problem
                    </div>
                </div>
                <div className="dropContainer">
                    <h3>Current Delivery Status: &nbsp;</h3>
                    <CustomDropDown
                        style={{
                            backgroundColor: "#323232",
                            color: "white",
                            borderRadius: "5px",
                        }}
                        textStyle={{
                            color: "white"
                        }}
                        label={"Status"}
                        options={['Delivery Partner Assigned', 'Package Picked Up', 'Package En Route', 'Package Delivered']}
                        selectedOption={"Delivery Partner Assigned"}
                        buttonId={"statusDropId"}
                        menuId={"StatusDropMenuId"}
                        onOptionChange={function (option: string): void {
                        }} />
                </div>
            </div>
        </div>
    );
}