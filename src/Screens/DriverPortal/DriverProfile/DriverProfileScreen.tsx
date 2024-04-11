import "./DriverProfileScreen.css";
import catprofile from "../../../Assets/CatProfile.png";
import mappin from "../../../Assets/MapPin.png";
import locationpin from "../../../Assets/Location.png";
import { useEffect, useState } from "react";
import CustomTextField from "../../../Components/CustomTextField";
import { Box, CSSObject, CssBaseline, IconButton, List, ListItem, ListItemButton, ListItemText, Theme, Toolbar, styled, useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import React from "react";
import { FaArrowLeft, FaBars, FaBreadSlice } from "react-icons/fa6";
import Logo from "../../../Assets/whiteLogo.png";
import Spacer from "../../../Components/MySpacer";
import IncommingOrderComp from "../Components/IncommingOrderComp/IncommingOrderComp";
import OrderHistoryComp from "../Components/OrderHistoryComp/OrderHistoryComp";
import MySupClient from "../../../SupabaseClient";
import DriverDetails from "../../../Model/DriverDetailsModel";
import ButtonComp from "../../../Components/ButtonComp";
import "../../DriverDashboard.css"
import CustomDropDown from "../../CustomerPortal/Components/CustomDropDown/CustomDropDown";
import CustomerPortalHeader from "../../CustomerPortal/Components/CustomerPortalHeader/CustomerPortalHeader";
const drawerWidth = 260;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '0px',
  [theme.breakpoints.up('sm')]: {
    width: '0px',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function DriverProfileScreen() {
  const [selectedId, setSelectedId] = useState(1);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [supabase] = useState(() => MySupClient());
  var [driver, setDriver] = useState(new DriverDetails())
  var [editDriver, setEditDriver] = useState(new DriverDetails())
  var [isVerified, setIsVerified] = useState(false)
  var [isRejected, setIsRejected] = useState(false)
  var [underReview, setUnderReview] = useState(false)

  async function getDriverRecord() {
    const session = await supabase.auth.getSession()

    const record = await supabase.from('DriverDetails').select('*').eq('userId', session.data.session?.user?.id)

    if (record && record.data && record.data[0]) {
      setDriver(record.data[0])
      editDriver = record.data[0]
      if (record.data[0].rejectionReason === null || record.data[0].rejectionReason === '') {
        setIsRejected(false)
      } else {
        setIsRejected(true)
      }
      if (record.data[0].isVerified) {
        setIsVerified(true)
      }
    }
  }

  async function updateDriver() {
    if (editDriver.mobileNo === '' || editDriver.subUrb === '' || editDriver.city === '' || editDriver.vehicleMake === '' || editDriver.vehicleModel === '' || editDriver.vehicleYear === '' || editDriver.availability === '' || editDriver.canYouLiftAndGroove === '' || editDriver.flexerTale === '' || editDriver.flexerStyle === '' || editDriver.lastDanceMove === '') {
      console.log(editDriver)
      alert('Please fill all the fields')
      return
    }
    console.log(editDriver.toJson())
    const session = await supabase.auth.getSession()
    var { data, error } = await supabase.from('DriverDetails').update(editDriver.toJson()).eq('userId', session.data.session?.user.id)
    if (error) {
      alert(error.message)
      return
    }
    else {
      alert('Updated Successfully')
    }

    getDriverRecord();

  }
  useEffect(() => {
    getDriverRecord()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <CustomerPortalHeader driverSide={true} onMenuClick={() => {
          handleDrawerOpen()
        }} />
        {/* <Toolbar sx={{
          backgroundColor: "#323232",
          width: "100%",
        }}>
          <div>
            <FaBars style={{ color: "white", fontSize: "24px", cursor: "pointer" }} onClick={handleDrawerOpen} />
          </div>
          <Spacer width={20} />
          <img src={Logo} alt="logo" height="30px" width="auto" />
          <div style={{
            marginLeft: "auto",
            backgroundColor: "#FFECC1",
          }}>
            <CustomDropDown label={""} options={[]} selectedOption={""} buttonId={""} menuId={""} onOptionChange={function (option: string): void {
              throw new Error("Function not implemented.");
            }} />
          </div>
        </Toolbar> */}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <FaArrowLeft color="black" />
          </IconButton>
        </DrawerHeader>
        <List>
          {['Dashboard', 'Incomming Orders', 'Order History', 'Profile'].map((text, index) => (
            <ListItem onClick={() => {
              setSelectedId(index + 1);
            }} key={text} disablePadding sx={{ display: 'block', backgroundColor: selectedId == index + 1 ? '#323232' : 'white', borderRadius: '15px', margin: '6px', width: '240px', color: selectedId == index + 1 ? "white" : "black" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Dashboard */}
              {selectedId == 1 && <>
                <div>
                  <div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}
                    >
                      <img
                        src={catprofile}
                        alt="profilePic"
                        height="45px"
                        width="45px"
                      />
                      <div style={{ width: "100%" }}>
                        <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                          User Name
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Driver ID: # FV-26032024-0004</div>
                          <div>Current Earnings: $300</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "7vh",
                      padding: "0.5vh",
                    }}
                  >
                    <div>Ongoing Delivery</div>
                    <div>Status: Order Confirmed</div>
                  </div>
                  <IncommingOrderComp />
                </div>

                <div>
                  <div style={{ marginBottom: "2vh" }}>
                    Number of Successful Deliveries: 30
                  </div>
                  <div style={{ marginBottom: "4vh" }}>No Of Complains: 0</div>

                  <a href="" style={{ color: "#0085FF" }}>
                    Request Vehicle Change
                  </a>
                </div>
              </>}
              {/* Incomming Orders */}
              {selectedId == 2 && <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "3vh",
                    padding: "0.5vh",
                  }}
                >
                  <b>Available Deliveries</b>
                  <b>Sort By</b>
                </div>
                <IncommingOrderComp />
                <Spacer height={20} />
                <IncommingOrderComp />
                <Spacer height={20} />
                <IncommingOrderComp />
                <Spacer height={20} />
                <IncommingOrderComp />
                <Spacer height={20} />
                <IncommingOrderComp />
              </>
              }
              {/* Order History */}
              {selectedId == 3 && <>
                <div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "3vh",
                      padding: "0.5vh",
                    }}
                  >
                    <b>Order History</b>
                    <b>Sort By</b>
                  </div>

                  <OrderHistoryComp />
                  <Spacer height={20} />
                  <OrderHistoryComp />
                  <Spacer height={20} />
                  <OrderHistoryComp />


                </div>
              </>}
              {/* Profile */}
              {
                selectedId == 4 && <>
                  <div className="dashboard">
                    <div className="dashboard-content">
                      <h2>{driver.firstName} {driver.lastName}</h2>
                      <p style={{
                        color: 'grey',
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}>ABN Number: {driver.aBNNo}</p>
                      <div className="status">
                        {
                          !isVerified &&
                          <p>Your profile is not verified yet!</p>
                        }
                        {
                          isVerified &&
                          <p style={{
                            color: 'green'
                          }}>Verified Profile</p>
                        }
                        {isRejected &&
                          <>
                            <h3 style={{
                              color: 'red',
                              fontWeight: 'bold'
                            }}>Reason for Rejection: {driver.rejectionReason}</h3>
                          </>
                        }
                      </div>
                      <div className="dash-grid">
                        <div className="dash-left">
                          Driver Id : {driver.driverId}
                          <input name="test" type="text" placeholder='Email' disabled={isRejected} defaultValue={driver.email} />
                          <input type="text" placeholder='Phone No' defaultValue={driver.mobileNo} onChange={
                            (e) => {
                              editDriver.mobileNo = e.target.value;
                            }
                          } />
                          <input type="text" placeholder='Suburb' defaultValue={driver.subUrb} onChange={
                            (e) => {
                              editDriver.subUrb = e.target.value;
                            }
                          } />
                          <input type="text" placeholder='City' defaultValue={driver.city} onChange={
                            (e) => {
                              editDriver.city = e.target.value;
                            }
                          } />
                        </div>
                        <br />
                        <br />
                        <div className="dash-right">
                          <select name="type" defaultValue={driver.vehicleType} onChange={
                            (e) => {
                              editDriver.vehicleType = e.target.value;
                            }
                          }>
                            <option value="Select Vehicle">Select Vehicle</option>
                            <option value="2 Wheeler">2 Wheeler</option>
                            <option value="UTE / Van">UTE / Van</option>
                            <option value="Refregerated Van">Refregerated Van</option>
                          </select>
                          {/* <input type="text" placeholder='Vehicle Type' defaultValue={driver.vehicleType} /> */}
                          <input type="text" placeholder='Vehicle Make' defaultValue={driver.vehicleMake} onChange={
                            (e) => {
                              editDriver.vehicleMake = e.target.value;
                            }
                          } />
                          <input type="text" placeholder='Vehicle Model' defaultValue={driver.vehicleModel} onChange={
                            (e) => {
                              editDriver.vehicleModel = e.target.value;
                            }
                          } />
                          <input type="text" placeholder='Vehicle Year' defaultValue={driver.vehicleYear} onChange={
                            (e) => {
                              editDriver.vehicleYear = e.target.value;
                            }
                          } />
                        </div>
                      </div>

                      <p className='title'>APPLICATION</p>
                      <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.availability} onChange={
                        (e) => {
                          editDriver.availability = e.target.value;
                        }
                      } />
                      <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.canYouLiftAndGroove} onChange={
                        (e) => {
                          editDriver.canYouLiftAndGroove = e.target.value;
                        }
                      } />

                      <p className='title'>PARTY PREFERENCES</p>
                      <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerTale} onChange={
                        (e) => {
                          editDriver.flexerTale = e.target.value;
                        }
                      } />
                      <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.flexerStyle} onChange={
                        (e) => {
                          editDriver.flexerStyle = e.target.value;
                        }
                      } />

                      <p className='title'>LAST DANCE MOVE</p>
                      <textarea name="" rows={10} placeholder='Answer' defaultValue={driver.lastDanceMove} onChange={
                        (e) => {
                          editDriver.lastDanceMove = e.target.value;
                        }
                      } />
                      <br />
                      <br />
                      <br />
                      <ButtonComp style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#D69F29",
                        color: "white",
                        width: "50%",
                        fontWeight: "bold",
                        fontSize: "20px",
                        borderRadius: "10px",
                        height: "40px",
                      }} text="Update" onClick={async () => {
                        editDriver.isVerified = false
                        await updateDriver()
                      }} />
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
