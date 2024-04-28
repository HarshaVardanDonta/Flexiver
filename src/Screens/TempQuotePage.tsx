import { useNavigate } from "react-router-dom";
import SendEmail from "../ResendApi";
import "./TempQuotePage.css";

import React from "react";
import MySupClient from "../SupabaseClient";
import toast from "react-hot-toast";
import CustomDialog from "./CustomerPortal/Components/SuccessPaymentComp/SuccessPaymentComp";


export default function TempQuotePage() {
    let navigate = useNavigate();
    const supabase = MySupClient();
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <div className="tempQuotePage">
            <h1>Get a Quote Now!</h1>
            <div className="tempQuotePageForm">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter your Name" />
                </div>
                <div>
                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" required placeholder="Enter Email or Phone" />
                </div>
                <div>
                    <label htmlFor="fromAddress">From Address:</label>
                    <input type="text" id="fromAddress" name="fromAddress" required placeholder="Enter From Address" />
                </div>
                <div>
                    <label htmlFor="toAddress">To Address:</label>
                    <input type="text" id="toAddress" name="toAddress" required placeholder="Enter To Address" />
                </div>
                <div>
                    <label htmlFor="description">Item Description:</label>
                    <textarea id="description" name="description" required placeholder="Enter Item Description" />
                </div>
                <button onClick={async () => {
                    const data = await supabase.from("TempQuote").insert({
                        name: (document.getElementById("name") as HTMLInputElement).value,
                        contact: (document.getElementById("contact") as HTMLInputElement).value,
                        fromAddress: (document.getElementById("fromAddress") as HTMLInputElement).value,
                        toAddress: (document.getElementById("toAddress") as HTMLInputElement).value,
                        itemDesc: (document.getElementById("description") as HTMLInputElement).value
                    });
                    console.log(data);
                    if (data.status === 201) {
                        toast.success("We have received your request. We will get back to you soon!");
                        setShowDialog(true);
                        //clear all fields
                        (document.getElementById("name") as HTMLInputElement).value = "";
                        (document.getElementById("contact") as HTMLInputElement).value = "";
                        (document.getElementById("fromAddress") as HTMLInputElement).value = "";
                        (document.getElementById("toAddress") as HTMLInputElement).value = "";
                        (document.getElementById("description") as HTMLInputElement).value = "";

                    }
                    else {
                        toast.error("Error in submitting the form");
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