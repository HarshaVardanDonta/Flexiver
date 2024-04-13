import { Button, Menu } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import Spacer from "../../../../Components/MySpacer";
import { FaArrowDown, FaArrowDown91, FaArrowDownAZ, FaArrowDownShortWide, FaDroplet } from "react-icons/fa6";
import { FaArrowAltCircleDown, FaArrowCircleDown, FaCompressArrowsAlt } from "react-icons/fa";

interface CustomDropDownProps {
    label: string;
    options: string[];
    selectedOption: string;
    buttonId: string;
    menuId: string;
    style?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    onOptionChange: (option: string) => void;
}

export default function CustomDropDown(props: CustomDropDownProps) {
    const [anchorDropButton, setAnchorDropButton] = React.useState<null | HTMLElement>(null);
    const openDropButton = Boolean(anchorDropButton);
    const handleAnchorDropButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorDropButton(event.currentTarget);
    };
    const handleAnchorDropButtonClose = () => {
        setAnchorDropButton(null);
    };
    return (
        <div style={{
            display: 'flex',
            width: '100%',
        }}>
            <Button
                style={
                    props.style
                        ? props.style
                        :
                        {
                            backgroundColor: "#FFECC0",
                            borderRadius: 15,
                            padding: 10,
                        }}
                id={props.buttonId}
                className='CustomerPortalHeaderRightButton'
                aria-controls={
                    openDropButton ? props.menuId : undefined
                }
                aria-haspopup='true'
                aria-expanded={openDropButton ? 'true' : undefined}
                onClick={handleAnchorDropButtonClick}>
                <Typography.Text style={
                    props.textStyle
                        ? props.textStyle
                        :
                        {
                            color: 'black',

                        }}>
                    {props.label} <FaArrowDown />
                </Typography.Text>
            </Button>
            <Menu
                sx={{
                    borderRadius: 15,
                }}
                id={props.menuId}
                anchorEl={anchorDropButton}
                open={openDropButton}
                onClose={handleAnchorDropButtonClose}
                MenuListProps={{
                    'aria-labelledby': props.buttonId,
                }}>
                {props.options.map((option, index) => (
                    <div key={index}>
                        <Button
                            onClick={() => {
                                props.onOptionChange(option);
                                handleAnchorDropButtonClose();
                            }}>
                            <Typography.Text style={{ color: 'black' }}>
                                {option}
                            </Typography.Text>
                        </Button>
                        <Spacer height={5} />
                    </div>
                ))}

            </Menu>
        </div>
    );
}