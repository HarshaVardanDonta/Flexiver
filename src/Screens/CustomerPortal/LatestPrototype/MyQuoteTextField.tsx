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
import { useEffect, useState } from "react";
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
    const [validationError, setValidationError] = useState<string | null>(null); // Error state for validation
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_API_KEY_HERE",
        libraries: ["places"],
    });

    useEffect(() => {
        if (isLoaded) {
            console.log('Loaded', ready);
        }
    }, [isLoaded, ready]);

    const validateMobile = (mobile: string) => {
        // Regular expression for Australian mobile numbers
        const australianMobileRegex = /^(\+?61|0)4\d{8}$/;

        if (!australianMobileRegex.test(mobile)) {
            setValidationError(
                "Invalid mobile number."
            );
        } else {
            setValidationError(null);
        }
    };

    return (
        props.isMapAutoComplete ? (
            <Combobox
                onSelect={async (address) => {
                    props.onChanged?.(address);
                    setValue(address, false);
                    clearSuggestions();
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    props.getCoordinates?.({ lat: lat, lng: lng });
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        props.onChanged?.(e.target.value);
                        setValue(e.target.value);
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
                    }}
                >
                    <ComboboxList
                        style={{
                            padding: '0px',
                            margin: '0px',
                        }}
                    >
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    style={{
                                        backgroundColor: props.backgroundColor ?? "#E2BC69",
                                        zIndex: 100,
                                        alignItems: 'center',
                                        fontSize: '15px',
                                        color: props.color ?? 'black',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        borderBottom: '1px solid black',
                                    }}
                                    key={place_id}
                                    value={description}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        ) : props.lable === "Enter Mobile*" ? (
            <>
                <TextField
                    value={value}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        // Allow only numbers and `+`
                        const sanitizedValue = inputValue.replace(/[^0-9+]/g, '');
                        setValue(sanitizedValue);
                        props.onChanged?.(sanitizedValue);
                        validateMobile(sanitizedValue);
                    }}
                    placeholder={props.lable ?? 'Sample Text '}
                    inputProps={{
                        maxLength: 12, // Allow space for international numbers
                        style: { color: props.color ?? 'black' },
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
                        },
                    }}
                />

                {validationError && (
                    <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                        {validationError}
                    </p>
                )}
            </>
        ) : (
            <TextField
                value={props.fieldValue}
                onChange={(e) => {
                    setValue(e.target.value);
                    props.onChanged?.(e.target.value);
                }}
                placeholder={props.lable ?? 'Sample Text '}
                inputProps={{
                    style: {
                        color: props.color ?? 'black',
                    },
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
                    },
                }}
            />
        )
    );
}
