import { FaMinus, FaPlus } from "react-icons/fa6";
import "./FlightOfStairsComp.css"
import { Typography } from "antd";


interface FlightOfStairsCompProps {
    onAdd: () => void;
    onRemove: () => void;
    count: number;
}

export default function FlightOfStairsComp(props: FlightOfStairsCompProps) {
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
            }
        }>
            <Typography.Text style={{
                fontSize: "20px",
            }}>Flight of Stairs</Typography.Text>
            <div className="mainStairsContainer">
                <div className="addContainer" onClick={
                    props.onRemove
                }><FaMinus />
                </div>
                <div className="countContainer">
                    {props.count}
                </div>
                <div className="addContainer" onClick={
                    props.onAdd
                }>
                    <FaPlus />
                </div>
            </div>
        </div>


    );
}