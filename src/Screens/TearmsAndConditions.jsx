import React from 'react'
import "./termsAndPolicy.css"

import logo from "../Assets/logo.png";

const TearmsAndConditions = () => {
  return (
    <div className='policyPage'>
      <div className="policyNav">
      <Link to = '/'> 
            <div>
              <img src = {logo} alt='Logo' className='Logo'/>
            </div>
          </Link>
      </div>
      
      <div className='policyBox'>
        <h1>Delivery Partner Terms and Conditions</h1>
          <h2>Introduction:</h2>
          <p>These Delivery Partner Terms and Conditions govern the relationship between Flexiver and individuals or businesses ("Delivery Partners") who provide delivery services through our on-demand delivery service web application. By accessing or using our platform as a Delivery Partner, you agree to comply with these terms and conditions.</p>

          <h2>Eligibility:</h2>
          <ul>
              <li>Be at least 18 years old.</li>
              <li>Possess a valid driver's license and have access to a reliable mode of transportation (e.g., car, motorcycle, truck).</li>
              <li>Have the legal right to work in the jurisdiction where you will be providing delivery services.</li>
              <li>Meet any additional requirements or qualifications specified by Flexiver.</li>
          </ul>

          <h2>Partner Responsibilities:</h2>
          <p>You agree to fulfill delivery requests promptly and professionally, following all applicable laws and regulations. You are responsible for maintaining the cleanliness and proper maintenance of your vehicle (if applicable) and ensuring that it meets all safety requirements. You agree to handle packages with care to prevent damage during transportation.</p>

          <h2>Service Availability:</h2>
          <p>You acknowledge that your availability to fulfill delivery requests may vary based on factors such as location, time of day, and personal schedule. You are not obligated to accept any specific delivery request and may decline requests based on your availability or other factors.</p>

          <h2>Compensation:</h2>
          <p>You may receive compensation for completed deliveries as agreed upon with Flexiver. The amount of compensation may vary based on factors such as distance traveled, delivery volume, and any applicable incentives or bonuses.</p>

          <h2>Independent Contractor Status:</h2>
          <p>You acknowledge that you are an independent contractor and not an employee, agent, or partner of Flexiver. As an independent contractor, you are responsible for your own taxes, insurance, and other expenses incurred in connection with providing delivery services.</p>

          <h2>Compliance with Laws:</h2>
          <p>You agree to comply with all applicable laws, regulations, and licensing requirements while providing delivery services. You are solely responsible for obtaining any necessary permits, licenses, or insurance required to operate as a delivery service provider in your jurisdiction.</p>

          <h2>Termination:</h2>
          <p>Flexiver reserves the right to terminate your access to the platform at any time, with or without cause. You may terminate your partnership with Flexiver at any time by providing notice in writing.</p>

          <h2>Confidentiality:</h2>
          <p>You agree to maintain the confidentiality of any proprietary or confidential information provided by Flexiver, including but not limited to customer information and business processes.</p>

          <h2>Changes to Terms:</h2>
          <p>Flexiver reserves the right to modify or update these Delivery Partner Terms and Conditions at any time. Any changes to these terms will be communicated to you, and your continued use of the platform after such changes constitutes your acceptance of the revised terms.</p>

          <h2>Contact Information:</h2>
          <p>If you have any questions or concerns about these Delivery Partner Terms and Conditions, please contact us at <a href="mailto:contact@example.com">contact@example.com</a>.</p>

          <p>By becoming a Delivery Partner and using our on-demand delivery service web application, you acknowledge that you have read, understood, and agree to comply with these terms and conditions.</p>

      </div>
    </div>
  )
}

export default TearmsAndConditions