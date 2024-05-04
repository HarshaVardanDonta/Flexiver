import "./MapComp.css";
import React, { useEffect, useRef } from 'react'
import { Bounds, Icon, LatLngExpression, divIcon, point } from "leaflet";
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import { LatLng } from "use-places-autocomplete";

interface positionWithIcon { lat: number; lng: number; marker: Icon; popup?: string }

interface MapProps {
  positionWithIconsArray: Array<positionWithIcon>
  polyPoints?: LatLng[]
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
    const controlPoint1: LatLngExpression = {
      lat: midPoint.lat + distance / Math.sqrt(1 + perpendicularSlope ** 2),
      lng: midPoint.lng + perpendicularSlope * distance / Math.sqrt(1 + perpendicularSlope ** 2)
    };
    const controlPoint2: LatLngExpression = {
      lat: midPoint.lat - distance / Math.sqrt(1 + perpendicularSlope ** 2),
      lng: midPoint.lng - perpendicularSlope * distance / Math.sqrt(1 + perpendicularSlope ** 2)
    };

    // Number of segments in the curve
    const segments = 10000;

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
  const mapRef = useRef<GoogleMap | null>(null);

  const tension = 0.5;

  const centerLat = (startPoint.lat + endPoint.lat) / 2;
  const centerLng = (startPoint.lng + endPoint.lng) / 2;

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      positionWithIconsArray.forEach((positionWithIcon) => {
        bounds.extend(positionWithIcon);
      });
      if (mapRef.current.state.map!)
        mapRef.current.state.map.fitBounds(bounds);
    }
  }, [props.positionWithIconsArray])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAeFL_uHBQbPvaGCt1QhCalA6SCEhiEWU",
    libraries: ["places"],
  });

  return (<>
    {isLoaded ?
      <GoogleMap
        ref={mapRef}
        id="map"
        mapContainerStyle={{
          height: "100%",
          width: "100%",
          borderRadius: "10px"
        }}
        zoom={13}
        center={{ lat: centerLat, lng: centerLng }}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
        }}
      >
        {
          positionWithIconsArray.map((positionWithIcon, index) => {
            return (
              <Marker
                key={index}
                position={{ lat: positionWithIcon.lat, lng: positionWithIcon.lng }}
                icon={"https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}>
              </Marker>
            )
          })
        }
        <Polyline
          path={props.polyPoints ? props.polyPoints : smoothCurveBetweenPoints(startPoint, endPoint, tension)}
          options={{
            strokeColor: 'grey',
            strokeOpacity: 1,
            strokeWeight: 4,
          }}
        />
      </GoogleMap>
      : <div>Loading...</div>}
    {/* <MapContainer
      bounds={[[startPoint.lat, startPoint.lng], [endPoint.lat, endPoint.lng]]}
      //center={[centerLat, centerLng]}
      //zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius:"10px" }}>
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

      <Polyline pathOptions={{ color: 'black' }} positions={props.polyPoints ?? smoothCurveBetweenPoints(startPoint, endPoint, tension)} />
    </MapContainer> */}
  </>
  )
}

export default MapComp

function cubicBezier(t: number, x: any, x1: any, x2: any, x3: any) {
  throw new Error("Function not implemented.");
}
