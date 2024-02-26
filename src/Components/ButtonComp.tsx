import './ButtonComp.css';
interface ButtonProps {
    text: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export default function ButtonComp(props: ButtonProps) {
    return (
        <div style={
            {
                ...props.style
            }
        } className="button" onClick={props.onClick} > {props.text}</div >
    );
}

