import { Divider } from "@mui/material";
import CustomerPortalFooter from "../Components/CustomerPortalFooter/CustomerPortalFooter";
import CustomerPortalHeader from "../Components/CustomerPortalHeader/CustomerPortalHeader";
import OrderComponent from "../Components/OrderComponent/OrderComponent";
import "./OrderHistoryPage.css";
import Spacer from "../../../Components/MySpacer";
import { useEffect, useState } from "react";
import MySupClient from "../../../SupabaseClient";
import CustomerQuoteModel from "../../../Model/CustomerQuoteModel";

export default function OrderHistoryPage() {
  const [supabase] = useState(() => MySupClient());
  const [records, setRecords] = useState<CustomerQuoteModel[]>([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      const { data, error } = await supabase
        .from("CustomerQuote")
        .select("*")
        .eq("customerId", session.data.session?.user.id);

      console.log(session.data.session.user.id);

      console.log(data);
      console.log(typeof data);

      if (data) {
        setRecords(Object.values(data));
        console.log("records: ", records);
      }
    }
  };

  return (
    <div>
      <CustomerPortalHeader />
      <div className="orderHistoryPage">
        <h2>Order History</h2>
        <h3>Older Entries</h3>
        <Divider
          sx={{
            width: "85%",
            backgroundColor: "#D99F26",
          }}
        />
        <Spacer height={10} />
        {records?.map((item, index) => {
          return (
            <OrderComponent key={index} data={item} />
          );
        })}
      </div>
      <CustomerPortalFooter />
    </div>
  );
}
