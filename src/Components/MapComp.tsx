import "./MapComp.css";
import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import mark from "../Assets/Location.png"
import pin from '../Assets/MapPin.png';

interface positionWithIcon {  lat: number; lng: number; marker:Icon; popup?:string   }

interface MapProps {
    centerLat:number;
    centerLng:number;
    positionWithIconsArray: Array<positionWithIcon>
}
const MapComp = (props:MapProps) => {


    const {centerLat,centerLng,positionWithIconsArray} = props;

    // const position = [lat,lng];
  
  return (<>
    <MapContainer center={[centerLat,centerLng]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {positionWithIconsArray.map((item:positionWithIcon, index)=>{
        return(
            <Marker key={index} position={[item.lat,item.lng]} icon={item.marker}>
            <Popup>
              {item.popup}
            </Popup>
          </Marker>
        )
    })

    }
  </MapContainer>
    </>
  )
}

export default MapComp