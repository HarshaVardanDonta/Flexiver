import { useNavigate } from "react-router-dom";
import SendEmail from "../ResendApi";
import "./TempQuotePage.css";

import React from "react";


export default function TempQuotePage() {
    let navigate = useNavigate();

    return (
        <div className="tempQuotePage">
            <h1>Get a Quote Now!</h1>
            <form>
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
                <button type="submit" onClick={async () => {
                    await SendEmail({
                        fromName: document.getElementById("name")?.textContent,
                        Contact: document.getElementById("contact")?.textContent,
                        fromAddress: document.getElementById("fromAddress")?.textContent,
                        toAddress: document.getElementById("toAddress")?.textContent,
                        description: document.getElementById("description")?.textContent
                    });
                    navigate("/");
                }}>Submit</button>

            </form>
        </div >
    );
}