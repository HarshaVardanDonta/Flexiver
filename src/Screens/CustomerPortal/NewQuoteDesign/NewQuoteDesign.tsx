import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./NewQuoteDesign.css";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import VehicleComp from "../Components/VehicleComp/VehicleComp";
import Spacer from "../../../Components/MySpacer";
import Logo from "../../../Assets/CustomerPortal/FlexiverWhiteLogo.png";
import { Typography } from "antd";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import CustomTextField from "../../../Components/CustomTextField";
import { Height, Margin, Padding } from "@mui/icons-material";
import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import FlightOfStairsComp from "../Components/FlightOfStairsComp/FlightOfStairsComp";
import CustomDropDown from "../Components/CustomDropDown/CustomDropDown";
import Fire from "../../../Assets/CustomerPortal/Fire.png";
import Battery from "../../../Assets/CustomerPortal/Charging Battery.png";
import Chemicals from "../../../Assets/CustomerPortal/Molecule.png";
import Paint from "../../../Assets/CustomerPortal/Paint Brush.png";
import Weapon from "../../../Assets/CustomerPortal/saber weapon.png";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import { useNavigate } from "react-router-dom";
import { Icon, LatLngExpression } from "leaflet";
import MapComp from "../../../Components/MapComp";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import ImagePreview from "../../../Components/ImagePreview";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";
import PlacesInput from "../../../Components/Abcd";
import { useLoadScript } from "@react-google-maps/api";
import { DirectionsService } from "@react-google-maps/api";
import { get } from "http";
import polyline from "@mapbox/polyline";
import TwoWheeler from "../../../Assets/CustomerPortal/TwoWheeler.png";
import UteVan from "../../../Assets/CustomerPortal/UTEVan.png";
import RefrigeratedVan from "../../../Assets/CustomerPortal/RefreigeratedVan.png";
import useWindowDimensions from "../../../Model/WindowDimensions";
import { Camera } from "react-camera-pro";
import SmallBox from "../../../Assets/CustomerPortal/Small Box.png";
import SmallBoxMulti from "../../../Assets/CustomerPortal/Small box - Multiple selection.png";
import LargeBox from "../../../Assets/CustomerPortal/Large Box.png";
import LargeBoxMulti from "../../../Assets/CustomerPortal/Large Box - Multiple Selection.png";
import Heavy from "../../../Assets/CustomerPortal/Heavy_Bulk Items.png";
import MaximumHeavyItems from "../../../Assets/CustomerPortal/Maximum no of Heavy Items.png";

export default function NewQuoteDesign() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAeFL_uHBQbPvaGCt1QhCalA6SCEhiEWU",
    libraries: ["places"],
  });
  const [from, setFrom] = useState({ lat: 0, lng: 0 });
  const [to, setTo] = useState({ lat: 0, lng: 0 });
  const [pickUpStairsCount, setPickUpStairsCount] = useState(0);
  const [dropOffStairsCount, setDropOffStairsCount] = useState(0);

  const quote = new CustomerQuoteModel();
  const [quoteDateAndTime, setQuoteDateAndTime] = useState(new Date());
  const [twoWheelerSelected, settwoWheelerSelected] = useState(false);
  const [uteVanSelected, setuteVanSelected] = useState(false);
  const [refrigeratedVanSelected, setrefrigeratedVanSelected] = useState(false);

  const [openCamera, setOpenCamera] = useState(false);
  const [dataUri, setDataUri] = useState("");
  const [distanceBetweenPoints, setDistanceBetweenPoints] = useState("");
  const { height, width } = useWindowDimensions();
  const [pickUpElevator, setPickUpElevator] = useState(false);
  const [pickUpParkingSpace, setPickUpParkingSpace] = useState(false);
  const [dropOffElevator, setDropOffElevator] = useState(false);
  const [dropOffParkingSpace, setDropOffParkingSpace] = useState(false);
  const [onDemandDelivery, setOnDemandDelivery] = useState(false);
  const [itemDimensions, setItemDimensions] = useState("");
  const [itemType, setItemType] = useState("");

  const [supabase] = useState(() => MySupClient());

  const navigate = useNavigate();
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getRouteDistance();
  }, [to, from]);

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

  var [distance, setDistance] = useState("");
  var [polyString, setPolyString] = useState("");

  async function handleSubmit() {
    if (noExcludedItems) {
      quote.city = city;
      quote.vehicleType = vehicleType;
      quote.dateAndTime = dateAndTime.getTime();
      quote.pickUpContactName = pickUpContactName;
      quote.pickUpContactNumber = pickUpContactNumber;
      quote.pickUpAddress = pickUpAddress;
      quote.pickUpInstructions = pickUpInstructions;
      quote.pickUpStairs = pickUpStairsCount;
      quote.dropOffContactName = dropOffContactName;
      quote.dropOffContactNumber = dropOffContactNumber;
      quote.dropOffAddress = dropOffAddress;
      quote.dropOffInstructions = dropOffInstructions;
      quote.dropOffStairs = dropOffStairsCount;
      quote.noOfItems = noOfItems;
      quote.approxWeight = approxWeight;
      quote.noOfHaulers = noOfHaulers;
      quote.itemNote = itemSpecs;
      quote.alternateContactName = alternateContactName;
      quote.alternateContactNumber = alternateContactNumber;
      quote.imageUrl = dataUri;
      quote.pickUpLat = from.lat;
      quote.pickUpLng = from.lng;
      quote.dropOffLat = to.lat;
      quote.dropOffLng = to.lng;
      quote.orderStatus = "off";
      quote.distance = distance;
      quote.polyString = polyString;
      quote.pickUpElevator = pickUpElevator;
      quote.dropOffElevator = dropOffElevator;
      quote.pickUpParkingSpace = pickUpParkingSpace;
      quote.dropOffParkingSpace = dropOffParkingSpace;
      quote.itemDimensions = itemDimensions;
      quote.onDemandDelivery = onDemandDelivery;

      navigate("/billingPage", { state: { quote } });

      // supabase.auth
      //   .getSession()
      //   .then(async (session) => {
      //     if (session.data.session) {
      //       console.log("User logged in successfully");
      // const data = await supabase.from("CustomerQuote").insert(quote.toJson());

      // console.log(data);
      // if (data.status === 201) {
      // console.log(data);
      // toast.success("Quote added successfully");

      // } else {
      // console.log("Error");
      // toast.error("Quote added failed");
      // }
      //   } else {
      //     console.log("Error");
      //   }
      // })
      // .catch((error) => {});
    } else {
      return;
    }
  }

  const LocationIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 60], // size of the icon
  });

  const PinIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 60], // size of the icon
  });

  const handleTakePhotoAnimationDone = (dataUri: any) => {
    console.log("Take Photo");
    console.log(dataUri);
    setDataUri(dataUri);
  };
  var [polyPoints, setPolyPoints] = useState<Array<LatLngExpression>>([]);

  // function to get exact distance between from and to points
  async function getRouteDistance() {
    if (isLoaded) {
      const directionService = new google.maps.DirectionsService();

      var data = await directionService.route(
        {
          origin: new google.maps.LatLng(from.lat, from.lng),
          destination: new google.maps.LatLng(to.lat, to.lng),
          travelMode: google.maps.TravelMode.DRIVING,
        },
      );
      console.log(data);
      var decodedPoly = await polyline.decode(data?.routes[0]?.overview_polyline);
      setPolyString(data?.routes[0]?.overview_polyline);
      quote.polyString = data?.routes[0]?.overview_polyline;
      console.log("polystring", polyString);
      setPolyPoints(decodedPoly);
      setDistance(data?.routes[0]?.legs[0]?.distance?.text ?? "");
      console.log(polyPoints);
      return data?.routes[0]?.legs[0]?.distance?.text;
    }
  }

  const [city, setCity] = useState("Sydney");
  const [vehicleType, setVehicleType] = useState("Two Wheeler");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [pickUpContactName, setPickUpContactName] = useState("");
  const [pickUpContactNumber, setPickUpContactNumber] = useState("");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [pickUpInstructions, setPickUpInstructions] = useState("");
  const [pickUpStairs, setPickUpStairs] = useState(0);
  const [dropOffContactName, setDropOffContactName] = useState("");
  const [dropOffContactNumber, setDropOffContactNumber] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffInstructions, setDropOffInstructions] = useState("");
  const [dropOffStairs, setDropOffStairs] = useState(0);
  const [noOfItems, setNoOfItems] = useState(0);
  const [approxWeight, setApproxWeight] = useState(0);
  const [noOfHaulers, setNoOfHaulers] = useState(0);
  const [parkingSpaceAvailable, setParkingSpaceAvailable] = useState(false);
  const [itemSpecs, setItemSpecs] = useState("");
  const [alternateContactName, setAlternateContactName] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [noExcludedItems, setNoExcludedItems] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Access files safely using optional chaining
    if (!file) return; // Ensure a file is selected
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result);
        setDataUri(reader.result);
      } else {
        // Handle error: FileReader result is not a string
      }
    };
    reader.onerror = () => {
      // Handle error: FileReader encountered an error
    };
  };

  const itemDimensionsArray = ['Small Box', 'Small box - Multiple selection','Large Box','Large Box - Multiple Selection','Heavy/Bulk Items','Maximum no of Heavy Items'];
  const itemDimensionDescArray = ['Can Carry upto 5Kg', 'Can Carry upto 10Kg', 'Can Carry upto 15Kg', 'Can Carry upto 20Kg', 'Can Carry upto 25Kg', 'Can Carry upto 30Kg'];

  return (
    <div>
      <CustomerPortalHeader />
      <div className="newCustomerQuotePage">
        <div className="vehicleBannerCustomStyleMainContainer">
            <div className="vehicleBannerCustomStyle">
            <div className="mainTagLine">
                Making Moving easy for Everyone
            </div>
            </div>
            <div className="vehicleBanner">
                <div className="vehicleCompContainer">
                <div className= {twoWheelerSelected ? "itemDimensionBoxSelected":"itemDimensionBox"} onClick={()=>{
                    settwoWheelerSelected(true);
                    setuteVanSelected(false);
                    setrefrigeratedVanSelected(false);
                    setVehicleType("Two Wheeler");
                }}>
                  <img src={ TwoWheeler} alt="Small Box" />
                  <div>Two Wheeler</div>
                  <div className="itemDimensionConsealedText"> Can carry upto 5Kgs</div>
                </div>
                <div className= {uteVanSelected ? "itemDimensionBoxSelected":"itemDimensionBox"} onClick={()=>{
                    setuteVanSelected(true);
                    settwoWheelerSelected(false);
                    setrefrigeratedVanSelected(false);
                    setVehicleType("UTE / Van");
                }}>
                  <img src={ UteVan} alt="Small Box" />
                  <div>UTE / Van</div>
                  <div className="itemDimensionConsealedText"> Can carry upto 10Kgs</div>
                </div>
                <div className= {refrigeratedVanSelected ? "itemDimensionBoxSelected":"itemDimensionBox"} onClick={()=>{
                    setrefrigeratedVanSelected(true);
                    settwoWheelerSelected(false);
                    setuteVanSelected(false);
                    setVehicleType("Refreigerated Van");
                }}>
                  <img src={ RefrigeratedVan} alt="Small Box" />
                  <div>Refreigerated Van</div>
                  <div className="itemDimensionConsealedText"> Can carry upto 15Kgs</div>
                </div>
                {/* <VehicleComp
                    vehicleName={"Two Wheeler"}
                    vehicleImage={TwoWheeler}
                    vehicleDescription={"Can Carry upto 5Kg"}
                    onClick={() => {
                    settwoWheelerSelected(true);
                    setuteVanSelected(false);
                    setrefrigeratedVanSelected(false);
                    setVehicleType("Two Wheeler");
                    }}
                    selected={twoWheelerSelected}
                />
                <VehicleComp
                    vehicleName={"UTE / Van"}
                    vehicleImage={UteVan}
                    vehicleDescription={"Can Carry upto 5Kg"}
                    onClick={() => {
                    setuteVanSelected(true);
                    settwoWheelerSelected(false);
                    setrefrigeratedVanSelected(false);
                    setVehicleType("UTE / Van");
                    }}
                    selected={uteVanSelected}
                />
                <VehicleComp
                    vehicleName={"Refreigerated Van"}
                    vehicleImage={RefrigeratedVan}
                    vehicleDescription={"Can Carry upto 5Kg"}
                    onClick={() => {
                    setrefrigeratedVanSelected(true);
                    settwoWheelerSelected(false);
                    setuteVanSelected(false);
                    setVehicleType("Refreigerated Van");
                    }}
                    selected={refrigeratedVanSelected}
                />       */}
                </div>

            </div>
        </div>

        
       <br/>
        {/* <div className="dateSelectionSection">
            <Typography.Title
              level={4}>
              Choose a Date and Time:
            </Typography.Title>
        </div> */}
        <div className="pickupAndDropSectionBanner">
          <div className="pickupSection">
            <h3>Pickup Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "89%",
              }}
            >
              <CustomTextField
                placeHolder={"Contact Name"}
                onChanged={(e) => {
                  setPickUpContactName(e.target.value);
                }}
              />
              <Spacer width={20} />
              <CustomTextField
                type="number"
                placeHolder={"Contact Number"}
                onChanged={(e) => {
                  setPickUpContactNumber(e.target.value);
                }}
               
              />
            </div>
            {/* <CustomTextField
              placeHolder={"From Address"}
              onChanged={(e) => {
                setPickUpAddress(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            /> */}
            {isLoaded ? (
              <PlacesInput
                label="From Address"
                setSelected={setFrom}
                setPickUpAddress={setPickUpAddress}
                to={true}
                callBack={() => {
                  console.log("From Address: ", from);
                }}
              />
            ) : (
              <div>Loading...</div>
            )}
            <CustomTextField
              placeHolder={"Instructions for Partner"}
              onChanged={(e) => {
                setPickUpInstructions(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <FlightOfStairsComp
              onAdd={handlePickUpStairsAdd}
              onRemove={handlePickUpStairsRemove}
              count={pickUpStairsCount}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel control={
                <Checkbox
                  // aria-label="Is elevator available"
                  value={pickUpElevator}
                  onChange={(e) => {
                    setPickUpElevator(e.target.checked);
                  }}
                  style={{
                    color: "#FFD700",
                  }}
                />}
                label="Is elevator available?" />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel control={
                <Checkbox
                  // aria-label="Is elevator available"
                  value={pickUpParkingSpace}
                  onChange={(e) => {
                    setPickUpParkingSpace(e.target.checked);
                  }}
                  style={{
                    color: "#FFD700",
                  }}
                />}
                label="Is Parking Space available" />
            </div>

          </div>
          <Divider orientation="vertical" flexItem />
          <div className="pickupSection">
            <h3>Drop Off Details</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "89%",
              }}
            >
              <CustomTextField
                placeHolder={"Contact Name"}
                onChanged={(e) => {
                  setDropOffContactName(e.target.value);
                }}
               
              />
              <Spacer width={20} />
              <CustomTextField
                type="number"
                placeHolder={"Contact Number"}
                onChanged={(e) => {
                  setDropOffContactNumber(e.target.value);
                }}
               
              />
            </div>
            {/* <CustomTextField
              placeHolder={"To Address"}
              onChanged={(e) => {
                setDropOffAddress(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            /> */}
            {isLoaded ? (
              <PlacesInput
                label="To Address"
                setSelected={setTo}
                setDropOffAddress={setDropOffAddress}
                to={false}
                callBack={async () => { }}
              />
            ) : (
              <div>Loading...</div>
            )}
            <CustomTextField
              placeHolder={"Instructions for Partner"}
              onChanged={(e) => {
                setDropOffInstructions(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            />
            <FlightOfStairsComp
              onAdd={handleDropOffStairsAdd}
              onRemove={handleDropOffStairsRemove}
              count={dropOffStairsCount}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel control={<Checkbox
                value={dropOffElevator}
                onChange={(e) => {
                  setDropOffElevator(e.target.checked);
                }}
                style={{
                  color: "#FFD700",
                }}
              />} label="Is elevator available" />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel control={<Checkbox
                value={dropOffParkingSpace}
                onChange={(e) => {
                  setDropOffParkingSpace(e.target.checked);
                }}
                style={{
                  color: "#FFD700",
                }}
              />} label="Is Parking Space available" />
            </div>

          </div>
        </div>
      </div>
      <div className="itemDimensionsBanner">
        <Typography.Title level={4}>
          Package Dimensions
        </Typography.Title>
        <div className="itemDimensionContainer">
          {
            itemDimensionsArray.map((item, index) => {
              return (
                <div className={itemDimensions === item ? "itemDimensionBoxSelected": "itemDimensionBox"} onClick={()=>{
                  setItemDimensions(item);

                }}>
                  <img src={index === 0 ? SmallBox : index === 1 ? SmallBoxMulti : index === 2 ? LargeBox : index === 3 ? LargeBoxMulti : index === 4 ? Heavy : MaximumHeavyItems} alt="Small Box" />
                  <div>{item}</div>
                  <div className="itemDimensionConsealedText">{itemDimensionDescArray[index]}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div
        className="quoteItemSpecSection"
        style={{
          position: "relative",
        }}
      >
        {openCamera && (
          <div className="uploadPicMasterContainer">
            <div className="uploadPicContainer">
              {/* image */}
              <div
              className="uploadPicImageContainer">
                {dataUri && (
                  <img
                    src={dataUri}
                    alt="uploaded image"
                    style={{
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: "2%",
                }}
              >
                <h2>Upload the Image</h2>
                <label
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.8)",
                    borderRadius: "4px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                  }}
                  htmlFor="file-upload"
                >
                  Select an Image
                </label>
                <br />
                <input
                  type="file"
                  name="upload image"
                  onChange={handleImageUpload}
                  style={{
                    display: "none",
                  }}
                  id="file-upload"
                />
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#67C158",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      setOpenCamera(false);
                    }}
                  >
                    Upload
                  </button>
                  <button
                    style={{
                      backgroundColor: "#FF3E3E",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      setOpenCamera(false);
                      setDataUri("");
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="quoteItemSpecSectionMapSection">
          {from.lat && from.lng && to.lat && to.lng ? (
            <MapComp
              polyPoints={polyPoints}
              positionWithIconsArray={[
                {
                  lat: from.lat,
                  lng: from.lng,
                  marker: LocationIcon,
                  popup: "",
                },
                { lat: to.lat, lng: to.lng, marker: PinIcon, popup: "" },
              ]}
            />
          ) : (
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
          )}
        </div>
        <div className="quoteItemSpecSectionRightSection">
          <Typography.Title level={4}>
            Provide Item Specifications
          </Typography.Title>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            
            <div className="quoteItemSpecSectionRightSectionText">
              Select Item Type
            </div>
            <CustomDropDown 
            label={"Select Item Type"} options={['Food','Groceries','Electronics','Furniture','Other']} selectedOption={itemType} buttonId={"itemTypeButton"} menuId={"itemTypeMenu"} onOptionChange={function (option: string): void {
              setItemType(option);
            } } />
          </div>


          <div className="quoteItemSpecSectionRightSectionEntrycontainer">

            <div className="quoteItemSpecSectionRightSectionText">
              Enter Number of Items
            </div>
            <CustomTextField
            type="number"
              placeHolder={"How many items"}
              onChanged={(e) => {
                setNoOfItems(parseInt(e.target.value));
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "94%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              Enter Approx Weight
            </div>
            <CustomTextField
            type="number"
              placeHolder={"Maximum for selected Vehicle"}
              onChanged={(e) => {
                setApproxWeight(e.target.value);
                if (e.target.value > 50){
                  setuteVanSelected(true);
                  settwoWheelerSelected(false);
                  setrefrigeratedVanSelected(false);
                  setVehicleType("UTE / Van");
                  toast.error("Weight exceeds the limit for Two Wheeler, Vehicle changed to UTE/Van");
                }
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "94%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            <div className="quoteItemSpecSectionRightSectionText">
              No. of Haulers
            </div>
            <CustomTextField
            type="number"
            maxLength={1}
            placeHolder={"Maximum 2 Haulers"}
              onChanged={(e) => {
                setNoOfHaulers(parseInt(e.target.value));
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "94%",
                border: "none",
              }}
            />
          </div>
          <div className="quoteItemSpecSectionRightSectionEntrycontainer">
            {/* <div className="quoteItemSpecSectionRightSectionText">
              Select Item Dimensions
            </div>
            <CustomDropDown
              style={{
                width:  "100%",
                borderRadius: "15px",
                backgroundColor: "#FFECC0",
                padding: "8px",
              }}
              label={itemDimensions === "" ? "Select Item Dimensions" : itemDimensions}
              options={['3ftx3ftx3ft', '3ftx3ftx3ft', '3ftx3ftx3ft', '3ftx3ftx3ft']}
              selectedOption={itemDimensions} buttonId={"itemDimensionButton"} menuId={"iteDimensionMenu"}
              onOptionChange={function (option: string): void {
                setItemDimensions(option);
              }} /> */}
            {/* <Spacer width={10} /> */}
            <div className="quoteItemSpecSectionRightSectionEntrycontainer">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#FFECC0",
                  padding: "10px",
                  borderRadius: "15px",
                  width:  "100%",
                  justifyContent: "center",
                  color: "#4A4A4A",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.25)",
                }}
                onClick={() => setOpenCamera(!openCamera)}
              >
                {dataUri ? "Image Uploaded" : "Take a Picture!"}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="customerQuotePage">
        <div
          style={{
            fontSize: "18px",
          }}
        >
          Please provide details regarding the type of package you intend to
          send, including dimensions, weight, and any other relevant
          specifications or instructions?
        </div>
        <TextField
          sx={{
            backgroundColor: "#FFECC0",
            borderRadius: "15px",
            padding: "10px",
            height: "100px",
            boxShadow:"3px 3px 0px rgba(0, 0, 0, 0.25)"
          }}
          multiline={true}
          maxRows={4}
          InputProps={{
            disableUnderline: true,
          }}
          variant="standard"
          placeholder="for example: a 10x10 Sofa"
          onChange={(e) => {
            setItemSpecs(e.target.value);
          }}
        />
        <div
          style={{
            fontSize: "18px",
          }}
        >
          Alternate Contact Information
        </div>
        <div className="alternateContactContainer">
          <CustomTextField
            placeHolder={"Receivers Name"}
            onChanged={(e) => {
              setAlternateContactName(e.target.value);
            }}
            style={{
              backgroundColor: "#FFECC0",
              width: "45%",
              border: "none",
            }}
          />
          <CustomTextField
            placeHolder={"Receivers Contact"}
            onChanged={(e) => {
              setAlternateContactNumber(e.target.value);
            }}
            style={{
              backgroundColor: "#FFECC0",
              width: "45%",
              border: "none",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          No Excluded Items
          <Checkbox
            value={noExcludedItems}
            onChange={(e) => {
              setNoExcludedItems(e.target.checked);
            }}
            style={{
              color: "#FFD700",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#FFECC0",
            padding: "10px",
            borderRadius: "15px",
            width: "20%",
            height: "30px",
            justifyContent: "center",
            color: "#4A4A4A",
            cursor: "pointer",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </div>
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
