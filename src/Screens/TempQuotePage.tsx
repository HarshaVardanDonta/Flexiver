import { useNavigate } from "react-router-dom";
import SendEmail from "../ResendApi";
import "./TempQuotePage.css";

import React, { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import toast from "react-hot-toast";
import CustomDialog from "./CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";
import emailjs from '@emailjs/browser';
import loading from '../Assets/loading.gif';


export default function TempQuotePage() {
    useEffect(() => {
        emailjs.init({
            publicKey: '7k29io_jBeV65raM0'
        });

    }, []);

    interface FieldValues {
        name: string;
        contact: string;
        fromAddress: string;
        toAddress: string;
        description: string;
    }



    let navigate = useNavigate();
    const supabase = MySupClient();
    const [showDialog, setShowDialog] = React.useState(false);
    const [checkInputFileds, setCheckInputFileds] = React.useState(false);
    const [fieldValues, setFieldValues] = React.useState<FieldValues>({
        name: "",
        contact: "",
        fromAddress: "",
        toAddress: "",
        description: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFieldValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const checkIfAnyFieldIsEmpty = (values: FieldValues) => {
        if (Object.values(values).some((value: any) => value.trim() === '') == true) {
            setCheckInputFileds(true);
            return true;
        }
        else {
            setCheckInputFileds(false);
            return false;
        }
    };

    return (
        isLoading ?
            <div className="loadingScreen" >
                <img src={loading} alt="" />
                Loading...
            </div> :
            <div className="tempQuotePage">
                <h1>Get a Quote Now!</h1>
                <div className="tempQuotePageForm">
                    <div className="tempQuotePageFormdiv">
                        <label htmlFor="name">Name:</label>
                        <div style={{ width: "80%", position: "relative" }}>
                            <input type="text" id="name" value={fieldValues.name} onChange={handleInputChange} name="name" required placeholder="Enter your Name" />
                            {checkInputFileds && fieldValues.name.trim() === '' ? <div style={{ fontSize: "12px", color: "red", textAlign: "left", position: "absolute", left: "10px" }}>Please provide your name</div> : ""}
                        </div>
                    </div>

                    <div className="tempQuotePageFormdiv">
                        <label htmlFor="contact">Contact:</label>
                        <div style={{ width: "80%", position: "relative" }}>
                            <input type="text" id="contact" name="contact" required placeholder="Enter Email or Phone" value={fieldValues.contact} onChange={handleInputChange} />
                            {checkInputFileds && fieldValues.contact.trim() === '' ? <div style={{ fontSize: "12px", color: "red", textAlign: "left", position: "absolute", left: "10px" }}>Please provide your email or phone number</div> : ""}
                        </div>
                    </div>
                    <div className="tempQuotePageFormdiv">
                        <label htmlFor="fromAddress">From Address:</label>
                        <div style={{ width: "80%", position: "relative" }}>
                            <input type="text" id="fromAddress" name="fromAddress" required placeholder="Enter From Address" value={fieldValues.fromAddress} onChange={handleInputChange} />
                            {checkInputFileds && fieldValues.fromAddress.trim() === '' ? <div style={{ fontSize: "12px", color: "red", textAlign: "left", position: "absolute", left: "10px" }}>Please provide the source address</div> : ""}
                        </div>
                    </div>
                    <div className="tempQuotePageFormdiv">
                        <label htmlFor="toAddress">To Address:</label>
                        <div style={{ width: "80%", position: "relative" }}>
                            <input type="text" id="toAddress" name="toAddress" required placeholder="Enter To Address" value={fieldValues.toAddress} onChange={handleInputChange} />
                            {checkInputFileds && fieldValues.toAddress.trim() === '' ? <div style={{ fontSize: "12px", color: "red", textAlign: "left", position: "absolute", left: "10px" }}>Please provide the destination address</div> : ""}
                        </div>
                    </div>
                    <div className="tempQuotePageFormdiv">
                        <label htmlFor="description">Item Description:</label>
                        <div style={{ width: "80%", position: "relative" }}>
                            <textarea id="description" name="description" required placeholder="Enter Item Description" value={fieldValues.description} onChange={handleInputChange} />
                            {checkInputFileds && fieldValues.description.trim() === '' ? <div style={{ fontSize: "12px", color: "red", textAlign: "left", position: "absolute", left: "10px" }}>Please provide information describing your item</div> : ""}
                        </div>
                    </div>
                    <button onClick={async () => {
                        const result = checkIfAnyFieldIsEmpty(fieldValues)
                        if (result === false) {
                            setIsLoading(true);
                            const data = await supabase.from("TempQuote").insert({
                                name: fieldValues.name,
                                contact: fieldValues.contact,
                                fromAddress: fieldValues.fromAddress,
                                toAddress: fieldValues.toAddress,
                                itemDesc: fieldValues.description
                            });
                            console.log(data);

                            if (data.status === 201) {
                                await emailjs.send('service_blbfovl', 'template_6qmx1wt', {
                                    name: fieldValues.name,
                                    contact: fieldValues.contact,
                                    fromAddress: fieldValues.fromAddress,
                                    toAddress: fieldValues.toAddress,
                                    itemDescription: fieldValues.description
                                }).then(
                                    (res) => {
                                        console.log('Email res', res);
                                        toast.success("We have received your request. We will get back to you soon!");
                                        setShowDialog(true);
                                        //clear all fields
                                        setFieldValues({
                                            name: "",
                                            contact: "",
                                            fromAddress: "",
                                            toAddress: "",
                                            description: ""
                                        })
                                    },
                                    (error) => {
                                        console.log(error);
                                        toast.error("Something went wrong, please try again later!");

                                    }
                                );
                                setIsLoading(false);

                            }
                            else {
                                toast.error("Error in submitting the form");
                            }
                        }
                    }
                    }>Submit</button>

                </div>
                <CustomDialog htmlComponent={
                    <div>
                        <h1>We have received your request</h1>
                        <p>We will get back to you at the earliest!</p>
                    </div>

                } open={showDialog} title={""} description={""} onClose={function (): void {
                    setShowDialog(false);
                }} />
            </div >
    );
}