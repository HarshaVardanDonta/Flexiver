import "./MapComp.css";
import React, { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Bounds, Icon, LatLngExpression, Point, divIcon, point } from "leaflet";

interface positionWithIcon { lat: number; lng: number; marker: Icon; popup?: string }

interface MapProps {
  positionWithIconsArray: Array<positionWithIcon>
}
const MapComp = (props: MapProps) => {


  const { positionWithIconsArray } = props;
  interface LatLngExpression {
    lat: number;
    lng: number;
  }

  function smoothCurveBetweenPoints(startPoint: LatLngExpression, endPoint: LatLngExpression, tension: number): LatLngExpression[] {
    // Calculate midpoint
    const midPoint: LatLngExpression = {
      lat: (startPoint.lat + endPoint.lat) / 2,
      lng: (startPoint.lng + endPoint.lng) / 2
    };

    // Calculate perpendicular bisector slope
    const perpendicularSlope = -1 / ((endPoint.lat - startPoint.lat) / (endPoint.lng - startPoint.lng));

    // Calculate control points at a fixed distance from the midpoint along the perpendicular bisector
    const distance = Math.sqrt((startPoint.lat - midPoint.lat) ** 2 + (startPoint.lng - midPoint.lng) ** 2) * tension;
    console.log("distance", distance);
    const controlPoint1: LatLngExpression = {
      lat: midPoint.lat + distance / Math.sqrt(1 + perpendicularSlope ** 2),
      lng: midPoint.lng + perpendicularSlope * distance / Math.sqrt(1 + perpendicularSlope ** 2)
    };
    const controlPoint2: LatLngExpression = {
      lat: midPoint.lat - distance / Math.sqrt(1 + perpendicularSlope ** 2),
      lng: midPoint.lng - perpendicularSlope * distance / Math.sqrt(1 + perpendicularSlope ** 2)
    };

    // Number of segments in the curve
    const segments = 500;

    // Calculate points on the curve
    const points: LatLngExpression[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const lat = cubicBezier(t, startPoint.lat, controlPoint1.lat, controlPoint2.lat, endPoint.lat);
      const lng = cubicBezier(t, startPoint.lng, controlPoint1.lng, controlPoint2.lng, endPoint.lng);
      points.push({ lat, lng });
    }

    return points;
  }

  function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
    return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
  }


  const startPoint: LatLngExpression = { lat: props.positionWithIconsArray[0].lat, lng: props.positionWithIconsArray[0].lng };
  const endPoint: LatLngExpression = { lat: props.positionWithIconsArray[1].lat, lng: props.positionWithIconsArray[1].lng };
  const tension = 0.5;

  const centerLat = (startPoint.lat + endPoint.lat) / 2;
  const centerLng = (startPoint.lng + endPoint.lng) / 2;

  const [bounds, setBounds] = useState<Bounds >(new Bounds([new Point(startPoint.lat, startPoint.lng), new Point(endPoint.lat, endPoint.lng)]));

  useEffect(() => {
    //  auto update map when coordinates change
    setBounds(new Bounds([new Point(startPoint.lat, startPoint.lng), new Point(endPoint.lat, endPoint.lng)]));
  }, [props]);
  
  return (<>
    <MapContainer
      center={[centerLat, centerLng]}
      // zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      bounds={bounds as any}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        positionWithIconsArray.map((positionWithIcon, index) => {
          return (
            <Marker
              key={index}
              position={[positionWithIcon.lat, positionWithIcon.lng]}
              icon={positionWithIcon.marker}>
              <Popup>{positionWithIcon.popup}</Popup>
            </Marker>
          )
        })
      }

      <Polyline pathOptions={{ color: 'black' }} positions={smoothCurveBetweenPoints(startPoint, endPoint, tension)} />
    </MapContainer>
  </>
  )
}

export default MapComp

function cubicBezier(t: number, x: any, x1: any, x2: any, x3: any) {
  throw new Error("Function not implemented.");
}
