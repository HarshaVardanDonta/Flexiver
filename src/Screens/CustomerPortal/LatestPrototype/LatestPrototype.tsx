import React, { useEffect, useRef, useState } from 'react';
import "./LatestPrototype.css"
import CustomerPortalHeader from '../Components/CustomerPortalHeader/CustomerPortalHeader';
import CustomerPortalFooter from '../Components/CustomerPortalFooter/CustomerPortalFooter';
import landingVideo from "../../../Assets/lVideo.mp4";
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Fa0, FaChevronRight } from 'react-icons/fa6';
import MyQuoteTextField from './MyQuoteTextField';
import Checkbox from '@mui/material/Checkbox';
import { useSwiper } from 'swiper/react';
import SwiperNextButton from './SwiperNextButton';
import Testimonial from './Testimonial';
import TestimonialSwiper from './TestimonialSwiper';
import { FaChevronLeft } from 'react-icons/fa';
import useWindowDimensions from '../../../Model/WindowDimensions';
import { useLoadScript } from '@react-google-maps/api';
import CustomerQuoteModel from '../../../Model/CustomerQuoteModel';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import polyline from '@mapbox/polyline';
import { LatLng } from 'use-places-autocomplete';
import TwoImage from '../../../Assets/CustomerPortal/twoWheeler1.png';
import refVan from '../../../Assets/CustomerPortal/refVan1.png';
import uteVan from '../../../Assets/CustomerPortal/uteVan1.png';
import PlacesInput from '../../../Components/Abcd';
import customerImage from '../../../Assets/customer.jpeg';
import customerImage1 from '../../../Assets/customer1.jpeg';
import customerImage2 from '../../../Assets/customer2.jpg';
import customerImage3 from '../../../Assets/customer3.jpeg';
import customerImage4 from '../../../Assets/customer4.webp';



export default function LatestPrototype() {

    const [activeSlide, setActiveSlide] = useState(0)
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const { height, width } = useWindowDimensions();
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            message: "This service has transformed our logistics operations. The team is professional, and the platform is incredibly user-friendly. I can't imagine going back to our old system after using this!",
            imageUrl: customerImage // Replace with actual image path
        },
        {
            id: 2,
            name: "Jane Smith",
            message: "Absolutely thrilled with the performance! Our delivery times have improved significantly, and the tracking features are top-notch. Highly recommend this service to anyone in the logistics industry!",
            imageUrl: customerImage1 // Replace with actual image path
        },
        {
            id: 3,
            name: "Alice Johnson",
            message: "A fantastic experience from start to finish. The customer support is outstanding, and the platform offers everything we need to manage our fleet efficiently. It has made our day-to-day operations so much smoother.",
            imageUrl: customerImage2 // Replace with actual image path
        },
        {
            id: 4,
            name: "Bob Brown",
            message: "A great experience overall! From the moment I engaged with the service, I was impressed by the professionalism and attention to detail.",
            imageUrl: customerImage3 // Replace with actual image path
        },
        {
            id: 5,
            name: "Michael Scott",
            message: "Joining this logistics network was one of the best decisions we've made. The user interface is intuitive, and the real-time updates have allowed us to better serve our customers. Thank you for such a great service!",
            imageUrl: customerImage4 // Replace with actual image path
        },
    ];


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAAeFL_uHBQbPvaGCt1QhCalA6SCEhiEWU",
        libraries: ["places"],
    });

    const [pickUpAddress, setPickUpAddress] = useState('')
    const [pickUpContactName, setPickUpContactName] = useState('')
    const [pickUpContactNumber, setPickUpContactNumber] = useState('')
    const [dropOffAddress, setDropOffAddress] = useState('')
    const [dropOffContactName, setDropOffContactName] = useState('')
    const [dropOffContactNumber, setDropOffContactNumber] = useState('')
    const [pickUpLiftAvailable, setPickUpLiftAvailable] = useState(false)
    const [dropOffLiftAvailable, setDropOffLiftAvailable] = useState(false)
    const [pickUpFloors, setPickUpFloors] = useState(1)
    const [dropOffFloors, setDropOffFloors] = useState(1)
    const [vehicleType, setVehicleType] = useState('Two Wheeler')
    const [from, setFrom] = useState({ lat: 0, lng: 0 });
    const [to, setTo] = useState({ lat: 0, lng: 0 });
    const [sameAsPickup, setSameAsPickup] = useState(false);

    var floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const quote = new CustomerQuoteModel();
    useEffect(() => {
        getRouteDistance();
        console.log(dropOffLiftAvailable)
    }, [to, from, sameAsPickup]);

    const navigate = useNavigate();
    var [distance, setDistance] = useState("");
    var [polyString, setPolyString] = useState("");
    var [polyPoints, setPolyPoints] = useState<LatLng[]>([]);

    const [showAddressError, setShowAddressError] = useState(false);
    const [errorText, setErrorText] = useState("");
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
            var points: LatLng[] = [];
            decodedPoly.forEach((point) => {
                points.push({ lat: point[0], lng: point[1] });
            });
            setPolyPoints(points);
            setDistance(data?.routes[0]?.legs[0]?.distance?.text ?? "");
            console.log(polyPoints);
            return data?.routes[0]?.legs[0]?.distance?.text;
        }
    }

    async function handleSubmit() {
        if (width > 600) {
            if (pickUpAddress === "" || dropOffAddress === "") {
                setShowAddressError(true);
                setErrorText("Please fill address");
                // toast.error("Please fill address")
                setActiveSlide(0);
                return;
            } else if (pickUpContactName === "" || dropOffContactName === "") {
                setShowAddressError(true);
                setErrorText("Please fill contact name");
                setActiveSlide(0);
                return;
            } else if (pickUpContactNumber === "" || dropOffContactNumber === "") {
                setShowAddressError(true);
                setErrorText("Please fill contact number");
                setActiveSlide(0);
                return;
            }
        } else if (width < 600) {
            console.log("test")
            console.log(pickUpAddress)
            console.log(pickUpContactName)
            console.log(pickUpContactNumber)
            if (pickUpAddress === "") {
                setShowAddressError(true);
                setErrorText("Please fill pickup address");
                setActiveSlide(0);
                return;
            } else if (pickUpContactName === "") {
                setShowAddressError(true);
                setErrorText("Please fill pickup contact name");
                setActiveSlide(0);
                return;
            } else if (pickUpContactNumber === "") {
                setShowAddressError(true);
                setErrorText("Please fill pickup contact number");
                setActiveSlide(0);
                return;
            } else if (dropOffAddress === "") {
                setShowAddressError(true);
                setErrorText("Please fill drop address");
                setActiveSlide(1);
                return;
            } else if (dropOffContactName === "") {
                setShowAddressError(true);
                setErrorText("Please fill drop contact name");
                setActiveSlide(1);
                return;
            } else if (dropOffContactNumber === "") {
                setShowAddressError(true);
                setErrorText("Please fill drop contact number");
                setActiveSlide(1);
                return;
            }
        }
        setShowAddressError(false)
        quote.pickUpAddress = pickUpAddress
        quote.dropOffAddress = dropOffAddress
        quote.pickUpContactName = pickUpContactName
        quote.pickUpContactNumber = pickUpContactNumber
        quote.dropOffContactName = dropOffContactName
        quote.dropOffContactNumber = dropOffContactNumber
        quote.pickUpStairs = pickUpFloors
        quote.dropOffStairs = dropOffFloors
        quote.pickUpElevator = pickUpLiftAvailable
        quote.dropOffElevator = dropOffLiftAvailable
        quote.vehicleType = vehicleType
        quote.pickUpLat = from.lat
        quote.pickUpLng = from.lng
        quote.dropOffLat = to.lat
        quote.dropOffLng = to.lng
        quote.distance = distance
        quote.approxWeight = 1
        quote.polyString = polyString
        quote.dateAndTime = new Date().getTime()
        navigate("/billingPage", { state: { quote } });
    }
    const handleNavigation = () => {
        navigate('/driverLogin');
    };
    return (
        <div>
            <CustomerPortalHeader />
            <div className='section1'>
                <video src={landingVideo} autoPlay loop muted />
                <div className='section1FadeOut'>
                    <div className='getEstimateButton' onClick={() => {
                        document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Get an estimate
                    </div>
                </div>
            </div>
            <div id='section2' className='section2'>
                {width > 600 ?
                    <div style={{
                        fontSize: width < 600 ? '2em' : '3em',
                        fontWeight: 'bold',
                        marginLeft: width < 600 ? '10vw' : '0px',
                        marginRight: width < 600 ? '10vw' : '0px',
                    }}>
                        {activeSlide == 0 ? "Enter item pick up and drop off details" : "Select required vehicle type"}
                    </div> :
                    <div style={{
                        fontSize: width < 600 ? '2em' : '3em',
                        fontWeight: 'bold',
                        marginLeft: width < 600 ? '10vw' : '0px',
                        marginRight: width < 600 ? '10vw' : '0px',
                    }}>
                        {(activeSlide == 0 || activeSlide == 1) ? "Enter item pick up and drop off details" : "Select required vehicle type"}
                    </div>}
                {
                    showAddressError ?
                        <div style={{
                            color: 'red'
                        }}>
                            {errorText}
                        </div> :
                        <></>
                }

                {
                    width < 600 ?
                        // mobile version
                        <Swiper
                            initialSlide={activeSlide}
                            style={{
                                height: '50%',
                            }}
                            allowTouchMove={false}
                            effect={'coverflow'}
                            centeredSlides={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Autoplay]}>
                            <SwiperSlide>
                                <div className='section2Carousal'>
                                    {
                                        isLoaded ?
                                            <div className='section2Address'>
                                                <h2>Pickup</h2>
                                                <MyQuoteTextField
                                                    isMapAutoComplete={true}
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        setPickUpAddress(value)
                                                    }} lable='Enter Address*' />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <Checkbox
                                                        value={pickUpLiftAvailable}
                                                        style={{
                                                            padding: 0
                                                        }}
                                                        onChange={(value) => {
                                                            setPickUpLiftAvailable(value.target.checked)
                                                        }}
                                                        sx={{
                                                            color: '#D2A127',
                                                            '&.Mui-checked': {
                                                                color: '#D2A127',
                                                            },
                                                        }} />
                                                    Service lift available?
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    No.of floors/flights
                                                    <Select
                                                        disabled={pickUpLiftAvailable ? true : false}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={pickUpFloors}
                                                        onChange={(value) => {
                                                            setPickUpFloors(value.target.value as number)
                                                        }}
                                                        disableUnderline={true}
                                                        sx={{
                                                            '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                                        }}
                                                    >
                                                        {
                                                            floors.map((floor) => {
                                                                return (
                                                                    <MenuItem value={floor}>{floor}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem> */}
                                                    </Select>
                                                </div>
                                                <MyQuoteTextField
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setPickUpContactName(value)
                                                    }} lable='Enter Name*' />
                                                <MyQuoteTextField
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setPickUpContactNumber(value)
                                                    }} lable='Enter Mobile*' />
                                            </div>
                                            :
                                            <div>
                                                Loading...
                                            </div>
                                    }

                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='section2Carousal'>
                                    {
                                        isLoaded ?
                                            <div className='section2Address'>
                                                <h2>Dropoff</h2>
                                                <MyQuoteTextField
                                                    isMapAutoComplete={true}
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        setDropOffAddress(value)
                                                    }} lable='Enter Address*' />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <Checkbox
                                                        value={dropOffLiftAvailable}
                                                        style={{
                                                            padding: 0
                                                        }}
                                                        onChange={(value) => {
                                                            setDropOffLiftAvailable(value.target.checked)
                                                        }}
                                                        sx={{
                                                            color: '#D2A127',
                                                            '&.Mui-checked': {
                                                                color: '#D2A127',
                                                            },
                                                        }} />
                                                    Service lift available?
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    No.of floors/flights
                                                    <Select
                                                        disabled={dropOffLiftAvailable ? true : false}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={dropOffFloors}
                                                        onChange={(value) => {
                                                            setDropOffFloors(value.target.value as number)
                                                        }}
                                                        disableUnderline={true}
                                                        sx={{
                                                            '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                                        }}
                                                    >
                                                        {
                                                            floors.map((floor) => {
                                                                return (
                                                                    <MenuItem value={floor}>{floor}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem> */}
                                                    </Select>
                                                </div>
                                                <MyQuoteTextField
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setDropOffContactName(value)
                                                    }} lable='Enter Name*' />
                                                <MyQuoteTextField
                                                    width='80vw'
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setDropOffContactNumber(value)
                                                    }} lable='Enter Mobile*' />
                                            </div> :
                                            <div>
                                                Loading...
                                            </div>
                                    }

                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='section2Carousal'>
                                    <div className='section2VehicleDetailsContainer'>
                                        <div className='section2VehicleSelectionRow'>
                                            <div className={
                                                vehicleType === "Two Wheeler" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'}
                                                onClick={() => {
                                                    setVehicleType('Two Wheeler')
                                                }}>
                                                <img src={TwoImage} alt="Two Wheeler" />
                                                Two Wheeler
                                            </div>
                                            <div className={vehicleType === "UTE / Van" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'} onClick={() => {
                                                setVehicleType('UTE / Van')
                                            }}>
                                                <img src={uteVan} alt="UTE Van" />
                                                UTE / Van
                                            </div>
                                            <div
                                                className={
                                                    vehicleType === "Refreigerated Van" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'}

                                                onClick={() => {
                                                    setVehicleType('Refreigerated Van')
                                                }}>
                                                <img src={refVan} alt="Ref Van" />
                                                Refreigerated Van
                                            </div>
                                        </div>
                                        {/* <div className='section2VehicleDescriptionSection'>
                                            Can fit 1-2 boxes weighing upto 50kgs<br />
                                            Can fit 1-2 boxes weighing upto 50kgs
                                        </div> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperNextButton activeSlide={activeSlide} />
                        </Swiper>
                        :
                        // desktop version
                        <Swiper
                            initialSlide={activeSlide}
                            style={{
                                height: '50%',
                            }}
                            allowTouchMove={false}
                            effect={'coverflow'}
                            centeredSlides={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Autoplay]}>
                            <SwiperSlide>
                                <div className='section2Carousal'>
                                    {
                                        isLoaded ?
                                            <div className='section2Address'>
                                                <h2>Pickup</h2>
                                                <MyQuoteTextField
                                                    onChanged={(value) => {
                                                        setPickUpAddress(value)
                                                    }} lable='Enter Address*'
                                                    isMapAutoComplete={true}
                                                    getCoordinates={(coordinates) => {
                                                        setFrom(coordinates)
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <Checkbox
                                                        value={pickUpLiftAvailable}
                                                        style={{
                                                            padding: 0
                                                        }}
                                                        onChange={(value) => {
                                                            setPickUpLiftAvailable(value.target.checked)
                                                        }}
                                                        sx={{
                                                            color: '#D2A127',
                                                            '&.Mui-checked': {
                                                                color: '#D2A127',
                                                            },
                                                        }} />
                                                    Service lift available?
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    No.of floors/flights
                                                    <Select
                                                        disabled={pickUpLiftAvailable ? true : false}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={pickUpFloors}
                                                        onChange={(value) => {
                                                            setPickUpFloors(value.target.value as number)
                                                        }}
                                                        disableUnderline={true}
                                                        sx={{
                                                            '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                                        }}
                                                    >
                                                        {
                                                            floors.map((floor) => {
                                                                return (
                                                                    <MenuItem value={floor}>{floor}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem> */}
                                                    </Select>
                                                </div>
                                                <MyQuoteTextField
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setPickUpContactName(value)
                                                    }} lable='Enter Name*' />
                                                <MyQuoteTextField
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setPickUpContactNumber(value)
                                                    }} lable='Enter Mobile*' />
                                            </div> :
                                            <div>
                                                Loading...
                                            </div>
                                    }

                                    {
                                        isLoaded ?
                                            <div className='section2Address'>
                                                <h2>Dropoff</h2>
                                                <MyQuoteTextField
                                                    fieldValue={dropOffAddress}
                                                    isMapAutoComplete={true}
                                                    getCoordinates={(coordinates) => {
                                                        setTo(coordinates)
                                                    }}
                                                    onChanged={(value) => {
                                                        setDropOffAddress(value)
                                                    }} lable='Enter Address*' />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <Checkbox
                                                        value={dropOffLiftAvailable}
                                                        style={{
                                                            padding: 0
                                                        }}
                                                        onChange={(value) => {
                                                            setDropOffLiftAvailable(value.target.checked)
                                                        }}
                                                        sx={{
                                                            color: '#D2A127',
                                                            '&.Mui-checked': {
                                                                color: '#D2A127',
                                                            },
                                                        }} />
                                                    Service lift available?
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    No.of floors/flights
                                                    <Select
                                                        disabled={dropOffLiftAvailable ? true : false}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={dropOffFloors}
                                                        onChange={(value) => {
                                                            setDropOffFloors(value.target.value as number)
                                                        }}
                                                        disableUnderline={true}
                                                        sx={{
                                                            '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                                        }}
                                                    >
                                                        {
                                                            floors.map((floor) => {
                                                                return (
                                                                    <MenuItem value={floor}>{floor}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem> */}
                                                    </Select>
                                                </div>
                                                <MyQuoteTextField
                                                    fieldValue={dropOffContactName}
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setDropOffContactName(value)
                                                    }} lable='Enter Name*' />
                                                <MyQuoteTextField
                                                    fieldValue={dropOffContactNumber}
                                                    onChanged={(value) => {
                                                        console.log(value)
                                                        setDropOffContactNumber(value)
                                                    }} lable='Enter Mobile*' />
                                                {/* <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '10px'
                                                }}><Checkbox
                                                        value={sameAsPickup}
                                                        style={{
                                                            padding: 0
                                                        }}
                                                        onChange={(value) => {
                                                            if (value) {
                                                                setSameAsPickup(value.target.checked)
                                                                setDropOffAddress(pickUpAddress)
                                                                setTo(from)
                                                                setDropOffLiftAvailable(pickUpLiftAvailable)
                                                                setDropOffFloors(pickUpFloors)
                                                                setDropOffContactName(pickUpContactName)
                                                                setDropOffContactNumber(pickUpContactNumber)
                                                                console.log(dropOffAddress)
                                                                console.log(dropOffContactName)
                                                                console.log(dropOffContactNumber)
                                                                console.log(dropOffLiftAvailable)
                                                                console.log(dropOffFloors)
                                                                console.log(to)
                                                            }

                                                        }}
                                                        sx={{
                                                            color: '#D2A127',
                                                            '&.Mui-checked': {
                                                                color: '#D2A127',
                                                            },
                                                        }} />
                                                    Same as pickup
                                                </div> */}

                                            </div> :
                                            <div>
                                                Loading...
                                            </div>
                                    }

                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='section2Carousal'>
                                    <div className='section2VehicleDetailsContainer'>
                                        <div className='section2VehicleSelectionRow'>
                                            <div className={
                                                vehicleType === "Two Wheeler" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'}
                                                onClick={() => {
                                                    setVehicleType('Two Wheeler')
                                                }}>
                                                <img src={TwoImage} alt="Two Wheeler" />
                                                <div>
                                                    Two Wheeler
                                                </div>
                                            </div>
                                            <div className={vehicleType === "UTE / Van" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'} onClick={() => {
                                                setVehicleType('UTE / Van')
                                            }}>
                                                <img src={uteVan} alt="UTE Van" />
                                                <div>
                                                    UTE / Van
                                                </div>
                                            </div>
                                            <div className=
                                                {
                                                    vehicleType === "Refreigerated Van" ? 'section2VehicleBoxSelected' : 'section2VehicleBox'
                                                }
                                                onClick={() => {
                                                    setVehicleType('Refreigerated Van')
                                                }}>
                                                <img src={refVan} alt="Ref Van" />
                                                <div>
                                                    Refrigerated Van
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='section2VehicleDescriptionSection'>
                                            description about the vehicle and dimensions on the right side<br />
                                            and the image representing vehicle dimensions on the left side
                                        </div> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperNextButton activeSlide={activeSlide} />
                        </Swiper>
                }
                {/* actual swiper buttons */}
                {width < 600 ?
                    // mobile version
                    <div style={
                        {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px'
                        }
                    }>
                        {activeSlide == 0 &&
                            <div className='section2NextButton' onClick={() => {
                                setActiveSlide(1)
                            }}>
                                Next
                            </div>
                        }
                        {activeSlide == 1 &&
                            <div style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}>
                                <div className='section2NextButton' onClick={() => {
                                    setActiveSlide(0)
                                }}>
                                    Previous
                                </div><div className='section2NextButton' onClick={() => {
                                    setActiveSlide(2)
                                }}>
                                    Next
                                </div>
                            </div>
                        }
                        {activeSlide == 2 &&
                            <div style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}>
                                <div className='section2NextButton' onClick={() => {
                                    setActiveSlide(1)
                                }}>
                                    Previous
                                </div><div className='section2NextButton' onClick={() => {
                                    handleSubmit()
                                }}>
                                    Submit
                                </div>
                            </div>
                        }
                    </div>
                    :
                    // desktop version
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '20px'
                    }}>
                        {activeSlide == 0 ?
                            <div className='section2NextButton' onClick={() => {
                                setActiveSlide(1)
                            }}>
                                Next
                            </div> :
                            <div style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}>
                                <div className='section2NextButton' onClick={() => {
                                    setActiveSlide(0)
                                }}>
                                    Previous
                                </div><div className='section2NextButton' onClick={() => {
                                    handleSubmit()
                                }}>
                                    Submit
                                </div>
                            </div>
                        }
                    </div>}
                <br />
            </div>
            <div className='section3'>
                <div className='latestHeading'>
                    We have got you covered!
                </div>
                <div className='gotYouCoveredBoxRow'>
                    <div className='gotYouCoveredBox'>
                        Forgot your <br />keys?
                    </div>
                    <div className='gotYouCoveredBox'>
                        Shifting<br />
                        places?
                    </div>
                    <div className='gotYouCoveredBox'>
                        Hunger<br />
                        pangs?
                    </div>
                    <div className='gotYouCoveredBox'>
                        Buying new<br />
                        furniture?
                    </div>
                </div>
                <br />
                <br />
                <div className='latestHeading'>
                    Want to earn more?
                </div>
                <div className='joinUsButton'
                     onClick={handleNavigation} >
                    Join our logistics network
                </div>
                <br />
                <br />
                <div className='latestHeading'>
                    Our happy customers!
                </div>
                <div className='testimonialCarousel'>
                    {width < 600 ?
                        // Mobile version
                        <Swiper allowTouchMove={false} style={{ height: '250px' }}>
                            {testimonials.map((testimonial) => (
                                <SwiperSlide key={testimonial.id}>
                                    <div className='testimonialContainer'>
                                        <Testimonial testimonial={testimonial} /> {/* This now includes imageUrl */}
                                    </div>
                                </SwiperSlide>
                            ))}
                            <TestimonialSwiper activeTestimonial={activeTestimonial} />
                        </Swiper>
                        :
                        // Desktop version
                        <Swiper allowTouchMove={false} style={{ height: '250px' }}>
                            {testimonials.map((testimonial, index) => (
                                index % 2 === 0 ? (
                                    <SwiperSlide key={testimonial.id}>
                                        <div className='testimonialContainer'>
                                            <Testimonial testimonial={testimonial} /> {/* This now includes imageUrl */}
                                            {testimonials[index + 1] && (
                                                <Testimonial testimonial={testimonials[index + 1]} />
                                                )}
                                        </div>
                                    </SwiperSlide>
                                ) : null
                            ))}
                            <TestimonialSwiper activeTestimonial={activeTestimonial} />
                        </Swiper>
                    }


                </div>
                <div className='testimonialSwiperButtonContainer'>
                    <div className='testimonialSwiperButton' onClick={() => {
                        if (activeTestimonial === 0) return;
                        setActiveTestimonial(activeTestimonial - 1);
                    }}>
                        <FaChevronLeft/>
                    </div>
                    <div className='testimonialSwiperButton' onClick={() => {
                        if (width < 600) {
                            if (activeTestimonial === testimonials.length - 1) return;
                            setActiveTestimonial(activeTestimonial + 1);
                            return;
                        }
                        if (activeTestimonial === Math.ceil(testimonials.length / 2) - 1) return;
                        setActiveTestimonial(activeTestimonial + 1);
                    }}>
                        <FaChevronRight/>
                    </div>
                </div>
            </div>
            <CustomerPortalFooter/>
        </div>
    )
}
