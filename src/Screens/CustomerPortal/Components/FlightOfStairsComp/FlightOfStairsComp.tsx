import { FaMinus, FaPlus } from "react-icons/fa6";
import "./FlightOfStairsComp.css"


interface FlightOfStairsCompProps {
    onAdd: () => void;
    onRemove: () => void;
    count: number;
}

export default function FlightOfStairsComp(props: FlightOfStairsCompProps) {
    return (
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

    );
}