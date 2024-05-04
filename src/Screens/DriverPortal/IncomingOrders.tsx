import React, { useEffect, useState } from "react";
import IncommingOrderComp from "./Components/IncommingOrderComp/IncommingOrderComp";
import Spacer from "../../Components/MySpacer";
import MySupClient from "../../SupabaseClient";
import CustomerQuoteModel from "../../Model/CustomerQuoteModel";

const IncomingOrders = () => {
  useEffect(() => {
    fetchOrders();
  }, []);

  const [supabase] = useState(() => MySupClient());
  const [orders, setOrders] = useState<CustomerQuoteModel[]>([]);

  const fetchOrders = async () => {
    console.log("Fetching");
    const { data, error } = await supabase
      .from("CustomerQuote")
      .select("*")
      .eq("orderStatus", "Order Pending");

    console.log(data);
    if (data) {
      console.log("data: ", data);
      setOrders(data);
    }
    console.log("complete");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3vh",
          padding: "0.5vh",
        }}
      >
        <b>Available Deliveries</b>
        {/* <b>Sort By</b> */}
      </div>
      <div>
        {
          orders?.length === 0 && 
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
            <h1>No Orders Available</h1>
          </div>
        }
        {orders?.map((order, index) => (
          <div>
            <IncommingOrderComp order={order} />
            <Spacer height={20} />
          </div>
        ))}
      </div>
    </>
  );
};

export default IncomingOrders;
