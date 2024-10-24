import ButtonComp from "../../../Components/ButtonComp";
import Spacer from "../../../Components/MySpacer";
import CustomDropDown from "../../CustomerPortal/Components/CustomDropDown/CustomDropDown";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
import "./ActiveDeliveryScreen.css";
import MapComp from "../../../Components/MapComp";
import { Icon, LatLngExpression } from "leaflet";
import mark from "../../../Assets/Location.png";
import pin from "../../../Assets/MapPin.png";
import { ChangeEvent, useEffect, useState } from "react";
import ImagePreview from "../../../Components/ImagePreview";
import Camera from "react-html5-camera-photo";
import { useLocation, useNavigate } from "react-router-dom";
import MySupClient from "../../../SupabaseClient";
import toast from "react-hot-toast";
import polyline from "@mapbox/polyline";
import { LatLng } from "use-places-autocomplete";

const LocationIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 60], // size of the icon
});

const PinIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 60], // size of the icon
});

export default function ActiveDeliveryScreen() {
    const navigate = useNavigate();
    const [showCameraButton, setShowCameraButton] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const [dataUri, setDataUri] = useState("");
    const [loading, setLoading] = useState(false); // New loading state

    const { state } = useLocation();
    console.log(state);
    const [supabase] = useState(() => MySupClient());
    const [status, setStatus] = useState("Delivery Partner Assigned");

    var [polyPoints, setPolyPoints] = useState<LatLng[]>([]);

    async function getPolyLine() {
        var decodedPoly = polyline.decode(state.polyString!);
        var points: LatLng[] = [];
        decodedPoly.forEach((point) => {
            points.push({ lat: point[0], lng: point[1] });
        });
        setPolyPoints(points);
        console.log("polyPoints", polyPoints);
    }

    const handleDropDownChange = async (option: string) => {
        setLoading(true); // Set loading to true
        setStatus(option);

        const { error } = await supabase
            .from("CustomerQuote")
            .update({ orderStatus: option })
            .eq("id", state.id);

        if (error) {
            alert(error.message);
        } else {
            toast.success("Status updated successfully");
        }

        setLoading(false); // Set loading to false after operation completes

        if (option === "Package Picked Up" || option === "Package Delivered") {
            setOpenCamera(true); // Show camera
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            if (typeof reader.result === "string") {
                setDataUri(reader.result);
            }
        };
        reader.onerror = () => {
            // Handle error: FileReader encountered an error
        };
    };

    async function uploadImageToSupabase() {
        setLoading(true);
        if (status === "Package Picked Up") {
            var data = await supabase.from("CustomerQuote").update({ deliveryPartnerPickUpImage: dataUri }).eq("id", state.id);
            if (data.status === 204) {
                setOpenCamera(false);
                setDataUri("");
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Image not uploaded");
            }
            setLoading(false);
        }

        if (status === "Package Delivered") {
            var data = await supabase.from("CustomerQuote").update({ deliveryPartnerDropOffImage: dataUri }).eq("id", state.id);
            if (data.status === 204) {
                setOpenCamera(false);
                setDataUri("");
                toast.success("Image uploaded successfully");
                await supabase.from("CustomerQuote").update({ deliveryDate: Date().toString() }).eq("id", state.id);
                navigate("/driverProfile");
            } else {
                toast.error("Image not uploaded");
            }
        }
    }

    useEffect(() => {
        getPolyLine();
    }, []);

    return (
        <div>
            {openCamera && (
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        zIndex: "10000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "600px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            backgroundColor: "#FFF8EC",
                            borderRadius: "20px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: "92%",
                                height: "92%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#d4d4d4",
                                borderRadius: "20px",
                                margin: "4%",
                            }}
                        >
                            {dataUri && (
                                <img
                                    src={dataUri}
                                    alt="uploaded image"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "20px",
                                        objectFit: "contain",
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
                                    onClick={async () => {
                                        await uploadImageToSupabase();
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
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CustomerPortalHeader driverSide={true} />
            <div className="activeDeliveryPage">
                <h3>Delivery ID : DID-12-12-12-1212</h3>
                <div className="activeDeliveryMapComp">
                    <MapComp
                        polyPoints={polyPoints}
                        positionWithIconsArray={[
                            {
                                lat: state.pickUpLat,
                                lng: state.pickUpLng,
                                marker: LocationIcon,
                                popup: "",
                            },
                            {
                                lat: state.dropOffLat,
                                lng: state.dropOffLng,
                                marker: PinIcon,
                                popup: "POP-UP",
                            },
                        ]}
                    />
                </div>
                <div className="buttonContainer">
                    <div className="buttonContainer1">
                        <div className="buttonStyle" onClick={() => {
                            window.open(`https://www.google.com/maps/dir/?api=1&origin=${state.pickUpLat},${state.pickUpLng}&destination=${state.dropOffLat},${state.dropOffLng}`);
                        }}>
                            Get Directions
                        </div>
                        <Spacer width={20} />
                        <div className="buttonStyle" onClick={() => {
                            window.open(`tel:${state.receiverPhoneNumber}`);
                        }}>
                            Call Receiver
                        </div>
                    </div>
                    {loading ? (
                        <div className="loadingIndicator">Loading...</div> // Show loading indicator
                    ) : (
                        <CustomDropDown
                            style={{
                                backgroundColor: "#323232",
                                color: "white",
                                borderRadius: "5px",
                            }}
                            textStyle={{
                                color: "white",
                            }}
                            label={status}
                            options={[
                                "Delivery Partner Assigned",
                                "Package Picked Up",
                                "Package En Route",
                                "Package Delivered",
                            ]}
                            selectedOption={status}
                            buttonId={"statusDropId"}
                            menuId={"StatusDropMenuId"}
                            onOptionChange={handleDropDownChange} // Always pass handleDropDownChange
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
