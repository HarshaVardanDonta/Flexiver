import { TextField } from "@mui/material";
import { useLoadScript } from '@react-google-maps/api';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useEffect } from "react";
import { NumericFormat } from 'react-number-format';
interface MyQuoteTextFieldProps {
    height?: string,
    width?: string,
    lable?: string,
    backgroundColor?: string,
    color?: string,
    onChanged?: (value: string) => void,
    isMapAutoComplete?: boolean,
    getCoordinates?: (value: any) => void,
    fieldValue?: string,
}
export default function MyQuoteTextField(props: MyQuoteTextFieldProps) {

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAAeFL_uHBQbPvaGCt1QhCalA6SCEhiEWU",
        libraries: ["places"],
    });
    useEffect(() => {
        if (isLoaded) {
            console.log('Loaded', ready)
        }
    }, [isLoaded, ready])
    return (
        props.isMapAutoComplete ?

            <Combobox
                onSelect={async (address) => {
                    props.onChanged?.(address)
                    setValue(address, false);
                    clearSuggestions();
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    props.getCoordinates?.({ lat: lat, lng: lng });
                }}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        props.onChanged?.(e.target.value)
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder={ready ? "Enter your address*" : "Loading..."}
                    style={{
                        backgroundColor: props.backgroundColor ?? "#E2BC69",
                        width: props.width ?? '95%',
                        height: props.height ?? '40px',
                        border: 'none',
                        padding: '0px',
                        paddingLeft: '15px',
                        margin: '0px',
                        borderStyle: 'none',
                        borderWidth: '0px',
                        outline: 'none',
                        fontSize: '15px',
                        color: props.color ?? 'black',
                    }}
                />

                <ComboboxPopover
                    style={{
                        width: props.width ?? '20vw',
                        padding: '0px',
                        margin: '0px',
                        borderStyle: 'none',
                        borderWidth: '0px',
                        zIndex: 100,
                    }}>
                    <ComboboxList
                        style={{
                            padding: '0px',
                            margin: '0px',
                        }}>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption style={{
                                    backgroundColor: props.backgroundColor ?? "#E2BC69",
                                    // borderRadius: '10px',
                                    zIndex: 100,
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    color: props.color ?? 'black',
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                    borderBottom: '1px solid black',
                                }} key={place_id} value={description} onClick={() => {
                                }} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            :
            props.lable === "Enter Mobile" ?
                <NumericFormat
                    inputProps={{
                        maxLength: 10
                    }}
                    maxLength={10}
                    customInput={TextField}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        props.onChanged?.(e.target.value)
                    }}
                    placeholder={props.lable ?? 'Sample Text '}
                    style={{
                        backgroundColor: props.backgroundColor ?? "#E2BC69",
                        borderRadius: '10px',
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            height: props.height ?? '40px',
                            width: props.width ?? '20vw',
                        },
                        '& ::placeholder': {
                            color: 'black',
                            opacity: '0.9',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                            '&:hover fieldset': {
                            },
                            '&.Mui-focused fieldset': {
                            },
                        },
                    }}
                >

                </ NumericFormat >
                :
                <TextField
                    value={props.fieldValue}
                    onChange={(e) => {
                        setValue(e.target.value)
                        props.onChanged?.(e.target.value)
                    }}
                    placeholder={props.lable ?? 'Sample Text '}
                    inputProps={{
                        style: {
                            color: props.color ?? 'black',
                        }
                    }}
                    style={{
                        backgroundColor: props.backgroundColor ?? "#E2BC69",
                        borderRadius: '10px',
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            height: props.height ?? '40px',
                            width: props.width ?? '20vw',
                        },
                        '& ::placeholder': {
                            color: 'black',
                            opacity: '0.9',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                            '&:hover fieldset': {
                            },
                            '&.Mui-focused fieldset': {
                            },
                        },
                    }} />


    )
}