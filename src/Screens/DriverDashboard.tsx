import { useState } from "react";
import ButtonComp from "../Components/ButtonComp";
import MySupClient from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
    const [supabase] = useState(() => MySupClient());
    const navigate = useNavigate();
    return (
        <div>
            Driver Dashboard
            <br />
            you have uploaded information
            <br />
            please wait for approval
            <br />
            <ButtonComp text="Logout" onClick={async () => {
                var session = await supabase.auth.signOut()
                console.log(session)
                if (session.error) {
                    alert(session.error.message)
                    return
                }
                else {
                    navigate('/')
                }
            }} />
        </div>
    )
}