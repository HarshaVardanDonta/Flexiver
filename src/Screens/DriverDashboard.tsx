import { useEffect, useRef, useState } from "react";
import ButtonComp from "../Components/ButtonComp";
import MySupClient from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
import './DriverDashboard.css';
import logo from "../Assets/logo.png";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DriverDetails from "../Model/DriverDetailsModel";
import { Logout } from "@mui/icons-material";
import { Button, ListItemIcon, TextField } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";

export default function DriverDashboard() {
    const [supabase] = useState(() => MySupClient());
    const navigate = useNavigate();

    const drawerWidth = 240;
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
        open?: boolean;
    }>(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));
    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            boxShadow: 'none',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));
    const [open, setOpen] = React.useState(true);
    var [driver, setDriver] = useState(new DriverDetails())
    // reg edit form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [aBNNo, setABNNo] = useState('');
    const [subUrb, setSubUrb] = useState('');
    const [city, setCity] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [availability, setAvailability] = useState('');
    const [canYouLiftAndGroove, setCanYouLiftAndGroove] = useState('');
    const [flexerTale, setFlexerTale] = useState('');
    const [flexerStyle, setFlexerStyle] = useState('');
    const [lastDanceMove, setLastDanceMove] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');

    async function getDriverRecord() {
        const session = await supabase.auth.getSession()

        const record = await supabase.from('DriverDetails').select('*').eq('userId', session.data.session?.user.id)

        if (record && record.data && record.data[0]) {
            setDriver(record.data[0])
            setFirstName(driver.firstName)
            setLastName(driver.lastName)
            setMobileNo(driver.mobileNo)
            setABNNo(driver.aBNNo)
            setSubUrb(driver.subUrb)
            setCity(driver.city)
            setIsVerified(driver.isVerified)
            setAvailability(driver.availability)
            setCanYouLiftAndGroove(driver.canYouLiftAndGroove)
            setFlexerTale(driver.flexerTale)
            setFlexerStyle(driver.flexerStyle)
            setLastDanceMove(driver.lastDanceMove)
            setVehicleType(driver.vehicleType)
            setVehicleMake(driver.vehicleMake)
            setVehicleModel(driver.vehicleModel)
            setVehicleYear(driver.vehicleYear)
        }
    }
    const [listIndex, setListIndex] = useState(0)
    const firstNameRef = useRef();


    useEffect(() => {
        getDriverRecord()
    }, [listIndex])
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    sx={
                        {
                            backgroundColor: 'white',
                            color: 'black'
                        }
                    }
                    position="fixed" open={open}>
                    <Toolbar>
                        {/* <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        > */}
                        {/* <MenuIcon /> */}
                        {/* </IconButton> */}
                        <Typography variant="h5" >
                            Driver Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                    open={open}>
                    <DrawerHeader><img src={logo} alt="logo" />
                        {/* <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton> */}
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['Profile', 'Edit Your Details', 'History', 'Settings'].map((text, index) => (
                            <ListItem
                                onClick={() => {
                                    setListIndex(index)
                                }}
                                key={text} disablePadding>
                                <ListItemButton>
                                    {/* <ListItemIcon>
                                        <Person />
                                    </ListItemIcon> */}
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider />
                        <ListItem onClick={async () => {
                            var session = await supabase.auth.signOut()
                            console.log(session)
                            if (session.error) {
                                alert(session.error.message)
                                return
                            }
                            else {
                                navigate('/')
                            }
                        }} key='Logout' disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {
                        listIndex === 0 &&
                        <div>
                            <h1>Profile</h1>
                            <h2>{driver.firstName} {driver.lastName}</h2>
                            <h2>{driver.email}</h2>
                            <h2>{driver.mobileNo}</h2>
                            <h2>{driver.vehicleType}</h2>
                            <h2>{driver.vehicleModel}</h2>
                            <h2>{driver.vehicleMake}</h2>
                            <h2>{driver.vehicleModel}</h2>
                        </div>
                    }
                    {
                        listIndex === 1 &&
                        <div>
                            <div className='normalSideHeading'>
                                Edit your details
                            </div>
                            <div id='personalDetails' className='normalSideHeading'>
                                PERSONAL DETAILS
                            </div>
                            <br />
                            <div className='horizontal'>
                                <CustomTextField value={firstName} onChanged={(e: any) => {
                                    setFirstName(e.target.value)

                                }} placeHolder='First Name' />
                                <div className='hspacer' />
                                <CustomTextField onChanged={(e: any) => setLastName(e.target.value)} placeHolder='Last Name' />
                            </div>

                            <div className='horizontal'>
                                <CustomTextField type='tel' maxLength={10} onChanged={(e: any) => setMobileNo(e.target.value)} placeHolder='Mobile No' />
                                <div className='hspacer' />
                                <CustomTextField type='tel' maxLength={11} onChanged={(e: any) => setABNNo(e.target.value)} placeHolder='ABN No' />
                            </div>
                            <div className='horizontal'>
                                <CustomTextField onChanged={(e: any) => setSubUrb(e.target.value)} placeHolder='SubUrb' />
                                <div className='hspacer' />
                                <CustomTextField onChanged={(e: any) => setCity(e.target.value)} placeHolder='City' />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='vehicleDetails' className='normalSideHeading'>
                                VEHICLE DETAILS
                            </div>
                            <div className="PersonalDetails">
                                <CustomTextField onChanged={(e: any) => setVehicleType(e.target.value)} placeHolder='Vehicle Type' />
                                <div className='vspacer' />
                                <CustomTextField onChanged={(e: any) => setVehicleMake(e.target.value)} placeHolder='Vehicle Make' />
                                <div className='vspacer' />
                                <CustomTextField onChanged={(e: any) => setVehicleModel(e.target.value)} placeHolder='Vehicle Model' />
                                <div className='vspacer' />
                                <CustomTextField type='number' maxLength={4} onChanged={(e: any) => setVehicleYear(e.target.value)} placeHolder='Vehicle Year' />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div id='applicationDetails' className='normalSideHeading'>
                                APPLICATION
                            </div>
                            <div className='normalSideContent'>
                                Can You Lift and Groove? (Yes or No – we need to know if you can dance with that fridge)
                            </div>
                            <br />
                            <div className='answerTextFieldContainer'>
                                <TextField
                                    multiline={true}
                                    maxRows={3}
                                    className='textField'
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    variant="standard" placeholder="Answer" onChange={(e) => {
                                        setCanYouLiftAndGroove(e.target.value)
                                    }} />
                            </div>
                            <div className='normalSideContent'>
                                Pitch Your flexer Tale: Why are you the next PicUp sensation?
                            </div>
                            <br />
                            <div className='answerTextFieldContainer'>
                                <TextField
                                    multiline={true}
                                    maxRows={3}
                                    className='textField'
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    variant="standard" placeholder="Answer" onChange={(e) => {
                                        setFlexerTale(e.target.value)
                                    }} />
                            </div>
                            <br />
                            <br />
                            <div id='partyDetails' className='normalSideHeading'>
                                PARTY REFERENCES
                            </div>
                            <div className='normalSideContent'>
                                Availability (Days, Hours, When the stars align, etc.)
                            </div>
                            <br />
                            <CustomTextField onChanged={(e: any) => setAvailability(e.target.value)} placeHolder='Answer' />
                            <br />
                            <div className='normalSideContent'>
                                Flexer Style: Are you a solo superstar or do you prefer a duo act? Or are you the Beyoncé of flexing and can do both?
                            </div>
                            <br />
                            <CustomTextField onChanged={(e: any) => setFlexerStyle(e.target.value)} placeHolder='Answer' />
                            <br />
                            <div id='LastDetails' className='normalSideHeading'>
                                LAST DANCE MOVE
                            </div>
                            <div className='normalSideContent'>
                                Insurance Mastery: You know the drill – public liability, CTP car insurance. We need to see your superhero cape (insurance papers) before you officially join the flexer dance floor.
                            </div>
                            <br />
                            <div className='answerTextFieldContainer'>
                                <TextField
                                    multiline={true}
                                    maxRows={3}
                                    className='textField'
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    variant="standard" placeholder="Answer" onChange={(e) => {
                                        setLastDanceMove(e.target.value)
                                    }} />
                            </div>
                            <br />
                            <br />
                            <div className="submit">
                                <Button
                                    sx={{
                                        width: "250px",
                                        justifyContent: "center",
                                        borderRadius: 50,
                                        backgroundColor: "#D69F29",
                                        color: "white",
                                        fontSize: 20,
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        transition: "0.5s",
                                        animation: "ease",
                                        "&:hover": {
                                            backgroundColor: "#D69F29",
                                            color: "white",
                                            fontWeight: "regular",
                                            boxShadow: "0px 0px 10px 0px #D69F29",
                                        },
                                    }}
                                    onClick={
                                        () => {
                                            if (firstName === '' || lastName === '' || mobileNo === '' || aBNNo === '' || subUrb === '' || city === '' || availability === '' || canYouLiftAndGroove === '' || flexerTale === '' || lastDanceMove === '' || vehicleType === '' || vehicleMake === '' || vehicleModel === '' || vehicleYear === '') {
                                                if (firstName === '' || lastName === '' || mobileNo === '' || aBNNo === '' || subUrb === '' || city === '') {
                                                    var element = document.getElementById('personalDetails');
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                else if (vehicleType === '' || vehicleMake === '' || vehicleModel === '' || vehicleYear === '') {
                                                    var element = document.getElementById('vehicleDetails');
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                else if (canYouLiftAndGroove === '' || flexerTale === '') {
                                                    var element = document.getElementById('applicationDetails');
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                else if (availability === '' || flexerStyle === '') {
                                                    var element = document.getElementById('partyDetails');
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                else {
                                                    var element = document.getElementById('LastDetails');
                                                    element?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                alert('Please fill all the details')
                                                return
                                            }
                                            driver.firstName = firstName
                                            driver.lastName = lastName
                                            driver.mobileNo = mobileNo
                                            driver.aBNNo = aBNNo
                                            driver.subUrb = subUrb
                                            driver.city = city
                                            driver.isVerified = isVerified
                                            driver.availability = availability
                                            driver.canYouLiftAndGroove = canYouLiftAndGroove
                                            driver.flexerTale = flexerTale
                                            driver.flexerStyle = flexerStyle
                                            driver.lastDanceMove = lastDanceMove
                                            driver.vehicleType = vehicleType
                                            driver.vehicleMake = vehicleMake
                                            driver.vehicleModel = vehicleModel
                                            driver.vehicleYear = vehicleYear
                                        }
                                    } >Submit</Button>
                            </div>
                            <br />
                            <br />
                        </div>
                    }
                    {
                        listIndex === 2 &&
                        <div>

                        </div>
                    }
                    {
                        listIndex === 3 &&
                        <div>

                        </div>
                    }


                </Main>
            </Box>
            {/* <div className="dashHeader">
                <img src={logo} alt="logo" />
            </div>
            <div className="dashMainContainer">

            </div> */}

        </div >
    )
}