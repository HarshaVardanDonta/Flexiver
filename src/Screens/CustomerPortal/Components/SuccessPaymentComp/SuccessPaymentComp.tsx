import { Alert, Button, Dialog } from "@mui/material"
import { PropaneSharp } from "@mui/icons-material"
import { Url } from "url"
import { FaCross, FaDeleteLeft } from "react-icons/fa6"
import { FaTimes } from "react-icons/fa"

interface CustomDialogProps {
    open: boolean
    title: string
    description: string
    image?: string
    onClose: () => void
}

export default function CustomDialog(props: CustomDialogProps) {
    return (
        <Dialog open={props.open} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "300px",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "20px",
                gap: "20px",
            }}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                }} onClick={props.onClose}>
                    <FaTimes />
                </div>
                {
                    props.image &&
                    <img src={props.image} style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                    }} alt="Success" />
                }
                <div>
                    {props.title}
                </div>
                <div>
                    {props.description}
                </div>
                <Button sx={{
                    width: "70%",
                    height: "50px",
                    borderRadius: "15px",
                    backgroundColor: "#FFECC1",
                    color: "black",
                    fontWeight: "bold",
                }} onClick={props.onClose}>Yay!</Button>
            </div>
        </Dialog>
    )
}
