import React, { useState, useEffect } from 'react';
import "./CustomerPortalHeader.css";
import Logo from "../../../../Assets/logo.png";
import Person from "../../../../Assets/CustomerPortal/Person.png";
import { Typography } from 'antd';
import Spacer from '../../../../Components/MySpacer';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MySupClient from '../../../../SupabaseClient';
import { FaBars } from 'react-icons/fa6';

interface CustomerPortalHeaderProps {
    driverSide?: boolean
    onMenuClick?: () => void
}
export default function CustomerPortalHeader(props: CustomerPortalHeaderProps) {
    let navigate = useNavigate();
    const [supabase] = useState(() => MySupClient());
    const [session, setSession] = useState<any>(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [anchorHeaderButton, setAnchorHeaderButton] = React.useState<null | HTMLElement>(null);
    const openHeaderButton = Boolean(anchorHeaderButton);
    const handleAnchorHeaderButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorHeaderButton(event.currentTarget);
    };
    const handleAnchorHeaderButtonClose = () => {
        setAnchorHeaderButton(null);
    };
    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            console.log("session", session);
            setSession(session);
            if (session.data.session) {
                setIsUserLoggedIn(true);
            }
        });
    }, []);

    return (
        <div className='CustomerPortalHeader'>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: 10,
            }}>  {
                    props.onMenuClick &&
                    <IconButton onClick={props.onMenuClick}>
                        <FaBars fontSize={24} color='black' />
                    </IconButton>
                }

                <img src={Logo} alt='Logo' className='CustomerPortalHeaderLogo' onClick={() => {
                    navigate('/home');
                }}
                    style={{
                        cursor: 'pointer',
                    }}
                />
            </div>
            <Button
                style={{
                    backgroundColor: "#FFECC0",
                    borderRadius: 0,
                }}
                id='header-button'
                className='CustomerPortalHeaderRightButton'
                aria-controls={
                    openHeaderButton ? 'header-menu' : undefined
                }
                aria-haspopup='true'
                aria-expanded={openHeaderButton ? 'true' : undefined}
                onClick={handleAnchorHeaderButtonClick}>
                <img src={Person} alt='Person' />
                <Spacer width={10} />
                <Typography.Text style={{
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }}>{isUserLoggedIn ? session?.data.session.user?.user_metadata.fullName : "Login"}
                </Typography.Text>
            </Button>
            <Menu
                sx={{
                    borderRadius: 15,
                }}
                id='header-menu'
                anchorEl={anchorHeaderButton}
                open={openHeaderButton}
                onClose={handleAnchorHeaderButtonClose}
                MenuListProps={{
                    'aria-labelledby': 'header-button',
                }}>
                {
                    isUserLoggedIn && (
                        <>{
                            !props.driverSide &&
                            <div>
                                <MenuItem sx={{
                                    borderRadius: "15px",
                                    backgroundColor: "#FFECC0",
                                    height: 50,
                                    width: 200,
                                    margin: 1,
                                }} onClick={() => {
                                    handleAnchorHeaderButtonClose();
                                }}>
                                    <Typography.Text style={{
                                        fontSize: '1.2rem',
                                    }}>
                                        Profile
                                    </Typography.Text>
                                </MenuItem>
                                <MenuItem sx={{
                                    borderRadius: "15px",
                                    backgroundColor: "#FFECC0",
                                    height: 50,
                                    width: 200,
                                    margin: 1,
                                }} onClick={() => {
                                    handleAnchorHeaderButtonClose();
                                }}>
                                    <Typography.Text style={{
                                        fontSize: '1.2rem',
                                    }} onClick={() => {
                                        navigate('/orderHistoryPage');
                                    }}>
                                        Order History
                                    </Typography.Text>
                                </MenuItem>
                            </div>
                        }

                            <MenuItem sx={{
                                borderRadius: "15px",
                                backgroundColor: "#FFECC0",
                                height: 50,
                                width: 200,
                                margin: 1,
                            }} onClick={async () => {
                                await supabase.auth.signOut();
                                setIsUserLoggedIn(false);
                                navigate('/home');
                                handleAnchorHeaderButtonClose();
                            }}>
                                <Typography.Text style={{
                                    fontSize: '1.2rem',
                                }}>
                                    Log Out
                                </Typography.Text>
                            </MenuItem></>
                    )
                }
                {
                    !isUserLoggedIn && (
                        <>
                            <MenuItem sx={{
                                borderRadius: "15px",
                                backgroundColor: "#FFECC0",
                                height: 50,
                                width: 200,
                                margin: 1,
                            }} onClick={() => {
                                navigate('/login');
                                handleAnchorHeaderButtonClose();
                            }}>
                                <Typography.Text style={{
                                    fontSize: '1.2rem',
                                }}>
                                    Sign In
                                </Typography.Text>
                            </MenuItem>
                            <MenuItem sx={{
                                borderRadius: "15px",
                                backgroundColor: "#FFECC0",
                                height: 50,
                                width: 200,
                                margin: 1,
                            }} onClick={() => {
                                navigate('/createAccount');
                                handleAnchorHeaderButtonClose();
                            }}>
                                <Typography.Text style={{
                                    fontSize: '1.2rem',
                                }}>
                                    Sign Up
                                </Typography.Text>
                            </MenuItem></>
                    )
                }

            </Menu>
        </div >
    )
}