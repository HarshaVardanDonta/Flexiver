import "./DriverProfileScreen.css";
import logo2 from "../../Assets/logo2.png";
import person from "../../Assets/Person.png";
import catprofile from "../../Assets/CatProfile.png";
import mappin from "../../Assets/MapPin.png";
import locationpin from "../../Assets/Location.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomTextField from "../../Components/CustomTextField";

export default function DriverProfileScreen() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        className="dashHeader"
        style={{
          height: "7vh",
          backgroundColor: "#323232",
          position: "static",
          boxShadow: "none",
        }}
      >
        <Link to="/">
          <div style={{ marginLeft: "2vw" }}>
            <img src={logo2} alt="Logo" className="Logo" />
          </div>
        </Link>
        <div
          style={{
            backgroundColor: "#FFECC1",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            gap: "2vw",
            paddingLeft: "1.5vw",
            paddingRight: "1.5vw",
          }}
        >
          <img src={person} alt="Person" className="Person" />
          <div style={{ fontSize: "24px" }}>User Name</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="navBar"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: "2vh",
          }}
        >
          <div>
            <div
              className="navButton"
              style={{
                color: selectedId === 1 ? "white" : "#323232",
                backgroundColor: selectedId === 1 ? "#323232" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedId(1);
              }}
            >
              Dashboard
            </div>

            <div
              className="navButton"
              style={{
                color: selectedId === 2 ? "white" : "#323232",
                backgroundColor: selectedId === 2 ? "#323232" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedId(2);
              }}
            >
              Incoming Orders
            </div>

            <div
              className="navButton"
              style={{
                color: selectedId === 3 ? "white" : "#323232",
                backgroundColor: selectedId === 3 ? "#323232" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedId(3);
              }}
            >
              Order History
            </div>

            <div
              className="navButton"
              style={{
                color: selectedId === 4 ? "white" : "#323232",
                backgroundColor: selectedId === 4 ? "#323232" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedId(4);
              }}
            >
              Profile
            </div>
          </div>
          <div
            className="navButton"
            style={{
              color: selectedId === 5 ? "white" : "#323232",
              backgroundColor: selectedId === 5 ? "#323232" : "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedId(5);
            }}
          >
            LogOut
          </div>
        </div>
        <div
          style={{
            width: "80vw",
            padding: "2vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
        {selectedId==1 && <>
          <div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}
              >
                <img
                  src={catprofile}
                  alt="profilePic"
                  height="45px"
                  width="45px"
                />
                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bolder" }}>
                    User Name
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Driver ID: # FV-26032024-0004</div>
                    <div>Current Earnings: $300</div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "7vh",
                padding: "0.5vh",
              }}
            >
              <div>Ongoing Delivery</div>
              <div>Status: Order Confirmed</div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                display: "flex",
                padding: "1vw",
              }}
            >
              <div>
                <div style={{ margin: "2vh" }}>Customer Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Receiver Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Delivery Id: #DID-001-2024</div>
              </div>
              <hr className="dotted" />
              <div>
                <div style={{ margin: "2vh" }}>
                  Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div style={{ margin: "2vh" }}>Item Weight: 4Kg</div>
                <div style={{ margin: "2vh" }}>Quantity: 1Nos</div>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex", marginBottom: "3vh" }}>
                  <img src={mappin} alt="mappin" height="20px" width="20px" />
                  <div>
                    <b style={{ fontSize: "16px" }}>Pick up Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <img
                    src={locationpin}
                    alt="mappin"
                    height="20px"
                    width="20px"
                  />
                  <div>
                    <b style={{ fontSize: "16px" }}>Drop Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "2vh" }}>
              Number of Successful Deliveries: 30
            </div>
            <div style={{ marginBottom: "4vh" }}>No Of Complains: 0</div>

            <a href="" style={{ color: "#0085FF" }}>
              Request Vehicle Change
            </a>
          </div>
          </>}
          {selectedId==2 && <>
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
              <b>Sort By</b>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                display: "flex",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
              <div>
                <div style={{ margin: "2vh" }}>Customer Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Receiver Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Delivery Id: #DID-001-2024</div>
              </div>
              <hr className="dotted" />
              <div>
                <div style={{ margin: "2vh" }}>
                  Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div style={{ margin: "2vh" }}>Item Weight: 4Kg</div>
                <div style={{ margin: "2vh" }}>Quantity: 1Nos</div>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex", marginBottom: "3vh" }}>
                  <img src={mappin} alt="mappin" height="20px" width="20px" />
                  <div>
                    <b style={{ fontSize: "16px" }}>Pick up Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <img
                    src={locationpin}
                    alt="mappin"
                    height="20px"
                    width="20px"
                  />
                  <div>
                    <b style={{ fontSize: "16px" }}>Drop Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                display: "flex",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
              <div>
                <div style={{ margin: "2vh" }}>Customer Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Receiver Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Delivery Id: #DID-001-2024</div>
              </div>
              <hr className="dotted" />
              <div>
                <div style={{ margin: "2vh" }}>
                  Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div style={{ margin: "2vh" }}>Item Weight: 4Kg</div>
                <div style={{ margin: "2vh" }}>Quantity: 1Nos</div>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex", marginBottom: "3vh" }}>
                  <img src={mappin} alt="mappin" height="20px" width="20px" />
                  <div>
                    <b style={{ fontSize: "16px" }}>Pick up Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <img
                    src={locationpin}
                    alt="mappin"
                    height="20px"
                    width="20px"
                  />
                  <div>
                    <b style={{ fontSize: "16px" }}>Drop Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                display: "flex",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
              <div>
                <div style={{ margin: "2vh" }}>Customer Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Receiver Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Delivery Id: #DID-001-2024</div>
              </div>
              <hr className="dotted" />
              <div>
                <div style={{ margin: "2vh" }}>
                  Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div style={{ margin: "2vh" }}>Item Weight: 4Kg</div>
                <div style={{ margin: "2vh" }}>Quantity: 1Nos</div>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex", marginBottom: "3vh" }}>
                  <img src={mappin} alt="mappin" height="20px" width="20px" />
                  <div>
                    <b style={{ fontSize: "16px" }}>Pick up Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <img
                    src={locationpin}
                    alt="mappin"
                    height="20px"
                    width="20px"
                  />
                  <div>
                    <b style={{ fontSize: "16px" }}>Drop Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                display: "flex",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
              <div>
                <div style={{ margin: "2vh" }}>Customer Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Receiver Name: Some Name</div>
                <div style={{ margin: "2vh" }}>Delivery Id: #DID-001-2024</div>
              </div>
              <hr className="dotted" />
              <div>
                <div style={{ margin: "2vh" }}>
                  Item Dimensions: 3ft x 3ft x 3ft
                </div>
                <div style={{ margin: "2vh" }}>Item Weight: 4Kg</div>
                <div style={{ margin: "2vh" }}>Quantity: 1Nos</div>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex", marginBottom: "3vh" }}>
                  <img src={mappin} alt="mappin" height="20px" width="20px" />
                  <div>
                    <b style={{ fontSize: "16px" }}>Pick up Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <img
                    src={locationpin}
                    alt="mappin"
                    height="20px"
                    width="20px"
                  />
                  <div>
                    <b style={{ fontSize: "16px" }}>Drop Address</b>
                    <br />
                    jasdkjksdhfjkhjkdas askdj alsdjkh aslkdjksda
                  </div>
                </div>
              </div>
            </div>
          </>
          }

          {selectedId==3 && <> 
          <div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3vh",
                padding: "0.5vh",
              }}
            >
              <b>Order History</b>
              <b>Sort By</b>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <b>Delivery ID: #123-223-6657</b>
                <div>Delivery Date: 22-03-2024</div>
            </div>

            <div style={{display:"flex",justifyContent:"end"}}><b>$200.00</b></div>

            <div style={{display:"flex"}}>
                <div>Item Description: &nbsp; </div>
                <div>afsljkasdklafgn’ldksfng dsfklj<br/> lafds;dasfpoodsf poopo</div>
            </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <b>Delivery ID: #123-223-6657</b>
                <div>Delivery Date: 22-03-2024</div>
            </div>

            <div style={{display:"flex",justifyContent:"end"}}><b>$200.00</b></div>

            <div style={{display:"flex"}}>
                <div>Item Description: &nbsp; </div>
                <div>afsljkasdklafgn’ldksfng dsfklj<br/> lafds;dasfpoodsf poopo</div>
            </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <b>Delivery ID: #123-223-6657</b>
                <div>Delivery Date: 22-03-2024</div>
            </div>

            <div style={{display:"flex",justifyContent:"end"}}><b>$200.00</b></div>

            <div style={{display:"flex"}}>
                <div>Item Description: &nbsp; </div>
                <div>afsljkasdklafgn’ldksfng dsfklj<br/> lafds;dasfpoodsf poopo</div>
            </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <b>Delivery ID: #123-223-6657</b>
                <div>Delivery Date: 22-03-2024</div>
            </div>

            <div style={{display:"flex",justifyContent:"end"}}><b>$200.00</b></div>

            <div style={{display:"flex"}}>
                <div>Item Description: &nbsp; </div>
                <div>afsljkasdklafgn’ldksfng dsfklj<br/> lafds;dasfpoodsf poopo</div>
            </div>
            </div>

            <div
              style={{
                borderRadius: "5px",
                backgroundColor: "#FFECC1",
                padding: "1vw",
                marginBottom: "2vh",
              }}
            >
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <b>Delivery ID: #123-223-6657</b>
                <div>Delivery Date: 22-03-2024</div>
            </div>

            <div style={{display:"flex",justifyContent:"end"}}><b>$200.00</b></div>

            <div style={{display:"flex"}}>
                <div>Item Description: &nbsp; </div>
                <div>afsljkasdklafgn’ldksfng dsfklj<br/> lafds;dasfpoodsf poopo</div>
            </div>
            </div>

            
            </div>
          </>}

          {
            selectedId==4 && <>
            <div>
            <div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginBottom:"2vh"}}>
            <img src={catprofile} alt="profilePic" height="150px" width="150px" />
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px",marginBottom:"2vh"}}>Profile Status: Approved</div>
            </div>

            <div style={{margin:"auto 3vw"}}>
                <div style={{fontSize:"20px",marginBottom:"2vh"}}>PERSONAL DETAILS</div>
                <div style={{display:"flex",gap:"2vw",marginBottom:"1vh"}}>
                    <CustomTextField placeHolder="First Name" onChanged={()=>{}}/>
                    <CustomTextField placeHolder="Last Name" onChanged={()=>{}}/>
                </div>
                <div style={{marginBottom:"1vh"}}>
                    <CustomTextField placeHolder="Email" onChanged={()=>{}}/>
                </div>
                <div style={{display:"flex",gap:"2vw",marginBottom:"1vh"}}>
                    <CustomTextField placeHolder="Mobile Number" onChanged={()=>{}}/>
                    <CustomTextField placeHolder="ABN Number" onChanged={()=>{}}/>
                </div>
                <div style={{display:"flex",gap:"2vw",marginBottom:"1vh"}}>
                    <CustomTextField placeHolder="Your Suburb" onChanged={()=>{}}/>
                    <CustomTextField placeHolder="Your City" onChanged={()=>{}}/>
                </div>
                <div style={{marginBottom:"1vh"}}>
                <CustomTextField placeHolder="Choose a Password" onChanged={()=>{}}/>
                </div>
            </div>
            </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}
