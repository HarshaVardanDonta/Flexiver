// import { useState, useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// export default function Places() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyAAeFL_uHBQbPvaGCt1QhCalA6SCEhiEWU',
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState({lat: null, lng: null});

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>
//         {selected && <div>{selected.lat} , {selected.lng}</div>}
//     </>
//   );
// }

// const PlacesAutocomplete = ({ setSelected }: { setSelected: any }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address:any) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat:lat, lng:lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

import React from "react";
import CustomTextField from "./CustomTextField";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesInput = (props: any) => {
  const { label, setSelected, setPickUpAddress, setDropOffAddress, to, callBack } = props;

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat: lat, lng: lng });

    if (to) {
      setPickUpAddress(address);
    } else {
      setDropOffAddress(address);
      callBack();
    }
  };

  return (
    <>
      <Combobox onSelect={handleSelect} style={{
        width: "100%",
      }}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder={label}
          style={{
            margin: "0px",
            border: "none",
            padding: "0px",
            paddingLeft: "10px",
            borderRadius: "15px",
            backgroundColor: "#FFECC0",
            width: "100%",
            height: "50px",
            boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.25)",
            maxWidth: "100%",
            outline: "none",
            fontSize: "15px",
            boxSizing: "border-box",
            // color: "grey",
            // backgroundColor: "#FFECC0",
            // width: "inherit",
            // height: "30px",
            // // padding: "10px",
            // border: "none",
            // borderRadius: "15px",
            // display: "flex",
            // margin: "0px",
            // marginLeft: "0px",
            // // justifyContent: "left",
            // boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.25)",
            // color: "grey",
            // outline: "none",
          }}
        />
        <ComboboxPopover
          style={{
            padding: '0px',
            margin: '0px',
            borderStyle: 'none',
            borderWidth: '0px',
            zIndex: 100,
            borderRadius: '10px',
          }}>
          <ComboboxList
            style={{
              padding: '0px',
              margin: '0px',
            }}>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  style={{
                    minHeight: '30px',
                    // height: '30px',
                    backgroundColor: props.backgroundColor ?? "#FFECC0",
                    borderRadius: '10px',
                    zIndex: 100,
                    fontSize: '15px',
                    color: 'black',
                    cursor: 'pointer',
                    marginTop: '10px',
                    // borderBottom: '1px solid black',
                  }}
                  key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox >

      {/*     
                <CustomTextField
              placeHolder={label}
              onChanged={(e) => {
                setPickUpAddress(e.target.value);
              }}
              style={{
                backgroundColor: "#FFECC0",
                width: "85%",
                border: "none",
              }}
            /> */}
    </>
  );
};

export default PlacesInput;
