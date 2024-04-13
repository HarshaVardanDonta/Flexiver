import ButtonComp from "../../../Components/ButtonComp";
import Spacer from "../../../Components/MySpacer";
import CustomDropDown from "../../CustomerPortal/Components/CustomDropDown/CustomDropDown";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./ActiveDeliveryScreen.css";
import MapComp from "../../../Components/MapComp";
import { Icon } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { useState } from "react";
import ImagePreview from "../../../Components/ImagePreview";
import Camera from "react-html5-camera-photo";

const LocationIcon = new Icon({
  iconUrl: mark,
  iconSize: [30, 30], // size of the icon
});

const PinIcon = new Icon({
  iconUrl: pin,
  iconSize: [30, 30], // size of the icon
});

export default function ActiveDeliveryScreen() {
  const [showCameraButton, setShowCameraButton] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [dataUri, setDataUri] = useState("");

  const handleDropDownChange = (option: string) => {
    // Check if the selected option is 'Package Picked Up' or 'Package Delivered'
    if (option === "Package Picked Up" || option === "Package Delivered") {
      setShowCameraButton(true); // Show camera button
    } else {
      setShowCameraButton(false); // Hide camera button
    }
  };

  const handleTakePhotoAnimationDone = (dataUri: any) => {
    console.log("Take Photo");
    console.log(dataUri);
    setDataUri(dataUri);
  };

  if (openCamera) {
    return (
      <div>
        {dataUri ? (
          <>
            <ImagePreview dataUri={dataUri} isFullscreen={true} />
            <button onClick={() => setOpenCamera(false)}>back</button>
          </>
        ) : (
          <Camera
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
            isFullscreen={true}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <CustomerPortalHeader driverSide={true} />
      <div className="activeDeliveryPage">
        <h3>Delivery ID : DID-12-12-12-1212</h3>
        <div className="activeDeliveryMapComp">
          <MapComp
            positionWithIconsArray={[
              {
                lat: 51.511,
                lng: -0.09,
                marker: LocationIcon,
                popup: "",
              },
              { lat: 51.495, lng: -0.055, marker: PinIcon, popup: "POP-UP" },
            ]}
          />
        </div>
        <div className="buttonContainer">
          <div className="buttonContainer1">
            <div className="buttonStyle" onClick={function (): void {}}>
              Get Directions
            </div>
            <Spacer width={20} />
            <div className="buttonStyle" onClick={function (): void {}}>
              Call Receiver
            </div>
          </div>
          <div className="buttonStyle" onClick={function (): void {}}>
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
              color: "white",
            }}
            label={"Status"}
            options={[
              "Delivery Partner Assigned",
              "Package Picked Up",
              "Package En Route",
              "Package Delivered",
            ]} //package picked up and delivered
            selectedOption={"Delivery Partner Assigned"}
            buttonId={"statusDropId"}
            menuId={"StatusDropMenuId"}
            onOptionChange={handleDropDownChange}
          />
        </div>

        {showCameraButton && (
          <div
            className="buttonStyle"
            onClick={() => setOpenCamera(!openCamera)}
          >
            Take a Picture
          </div>
        )}
      </div>
    </div>
  );
}
