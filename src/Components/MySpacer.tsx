interface SpacerProps {
    height?: number;
    width?: number;
}
export default function Spacer(SpacerProps: SpacerProps) {
    return <div style={{ height: SpacerProps.height, width: SpacerProps.width }}></div>
}