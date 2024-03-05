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
    var [editDriver, setEditDriver] = useState(new DriverDetails())
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
            editDriver = record.data[0]
        }
    }
    const [listIndex, setListIndex] = useState(0)
    const firstNameRef = useRef();
    async function updateDriver(){
        if(editDriver.mobileNo === '' || editDriver.subUrb === '' || editDriver.city === '' || editDriver.vehicleMake === '' || editDriver.vehicleModel === '' || editDriver.vehicleYear === '' || editDriver.availability === '' || editDriver.canYouLiftAndGroove === '' || editDriver.flexerTale === '' || editDriver.flexerStyle === '' || editDriver.lastDanceMove === '') {
            console.log(editDriver)
            alert('Please fill all the fields')
            return
        }
        console.log(editDriver.toJson())
        const session = await supabase.auth.getSession()
        var {data, error} = await supabase.from('DriverDetails').update(editDriver.toJson()).eq('userId', session.data.session?.user.id)
        if(error){
            alert(error.message)
            return
        }
        else{
            alert('Updated Successfully')
        }
    
    }

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
                        </div>
                    }
                    {
                        listIndex === 1 &&
                        <div className="dashboard">
                            <div className="dashboard-content">
                                <div className="side">
                                    <h1>John Doe</h1>
                                    <p>ABN Number: 213546</p>
                                </div>
                
                                <div className="status">
                                    {/* <p>Reason for Rejection stated here</p> */}
                                </div>
                                <div className="dash-grid">
                                    <div className="dash-left">
                                        <input type="text" placeholder='Email' disabled defaultValue={driver.email}/>
                                        <input type="text" placeholder='Phone No' defaultValue={driver.mobileNo} onChange={
                                            (e)=>{
                                                editDriver.mobileNo = e.target.value;
                                            }
                                        } />
                                        <input type="text" placeholder='Suburb' defaultValue={driver.subUrb} onChange={
                                            (e)=>{
                                                editDriver.subUrb = e.target.value;
                                            }
                                        } />
                                        <input type="text" placeholder='City' defaultValue={driver.city} onChange={
                                            (e)=>{
                                                editDriver.city = e.target.value;
                                            }
                                        }/>
                                    </div>
                
                                    <div className="dash-right">
                                    <select name="type" defaultValue={driver.vehicleType} onChange={
                                            (e)=>{
                                                editDriver.vehicleType = e.target.value;
                                            }
                                    }>
                                        <option value="2 weeler">2 Wheeler</option>
                                        <option value="4 weeler">4 Wheeler</option>
                                        <option value="ref weeler">Refregirated Van</option>
                                    </select>
                                        {/* <input type="text" placeholder='Vehicle Type' defaultValue={driver.vehicleType} /> */}
                                        <input type="text" placeholder='Vehicle Make' defaultValue={driver.vehicleMake} onChange={
                                            (e)=>{
                                                editDriver.vehicleMake = e.target.value;
                                            }
                                        }/>
                                        <input type="text" placeholder='Vehicle Model' defaultValue={driver.vehicleModel} onChange={
                                            (e)=>{
                                                editDriver.vehicleModel = e.target.value;
                                            }
                                        } />
                                        <input type="text" placeholder='Vehicle Year' defaultValue={driver.vehicleYear} onChange={
                                            (e)=>{
                                                editDriver.vehicleYear = e.target.value;
                                            }
                                        } />
                                    </div>
                                </div>
                
                                <p className='title'>APPLICATION</p>
                                <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.availability} onChange={
                                    (e)=>{
                                        editDriver.availability = e.target.value;
                                    }
                                }/>
                                <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.canYouLiftAndGroove} onChange={
                                    (e)=>{
                                        editDriver.canYouLiftAndGroove = e.target.value;
                                    }
                                }/>
                
                                <p className='title'>PARTY PREFERENCES</p>
                                <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerTale} onChange={
                                    (e)=>{
                                        editDriver.flexerTale = e.target.value;
                                    }
                                } />
                                <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerStyle} onChange={
                                    (e)=>{
                                        editDriver.flexerStyle = e.target.value;
                                    }
                                }/>
                
                                <p className='title'>LAST DANCE MOVE</p>
                                <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.lastDanceMove} onChange={
                                    (e)=>{
                                        editDriver.lastDanceMove = e.target.value;
                                    }
                                }/>
                                <button onClick={
                                    ()=>{
                                        updateDriver()
                                    }
                                }>Update</button>
                                
                            </div>
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