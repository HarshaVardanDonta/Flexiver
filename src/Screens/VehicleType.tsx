import React, { useState } from 'react'
import LoginPageHeader from './LoginPageHeader'
import style from './vehicleType.module.css'
import bike from '../Assets/twoWheeler.svg'

const VehicleType = () => {

    const [selected, setSelected] = useState("1")
  return (
    <LoginPageHeader>
        <div className={style.LoginSection}>
        <div style={{ fontSize: "28px", marginBottom: "6%", textAlign: "center" }}>
          <b>
          Choose your vehicle type
          </b>
        </div>
        <section style={{display:"flex", gap:"3%", alignItems:"center"}}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} onClick={()=>{setSelected("1")}}>
        <img src={bike} alt="bike" style={{width:`${selected==="1"?"160px":"130px"}`}}/>
        <b style={{fontSize:`${selected==="1"?"20px":"16px"}`}}>Two Wheeler</b>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} onClick={()=>{setSelected("2")}}>
        <img src={bike} alt="bike" style={{width:`${selected==="2"?"160px":"130px"}`}}/>
        <b style={{fontSize:`${selected==="2"?"20px":"16px"}`}}>UTE / Van</b>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} onClick={()=>{setSelected("3")}}>
        <img src={bike} alt="bike" style={{width:`${selected==="3"?"160px":"130px"}`}}/>
        <b style={{fontSize:`${selected==="3"?"20px":"16px"}`}}>Refrigerated Van</b>
        </div>
        </section>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",marginTop:"3%"}}>
        <button
            className={style.loginButton}
            style={{
              backgroundColor: "#D69F29",
              color: "white",
              padding: "5px 50px",
              border: "none",
              borderRadius: "4px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            className={style.loginButton}
            style={{
              backgroundColor: "#D69F29",
              color: "white",
              padding: "5px 50px",
              border: "none",
              borderRadius: "4px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Next
          </button>

        </div>

        </div>
    </LoginPageHeader>
  )
}

export default VehicleType