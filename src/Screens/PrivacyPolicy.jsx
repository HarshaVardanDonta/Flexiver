import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <div className="policyPage">
      <div className="policyNav">
      <Link to = '/'> 
            <div>
              <img src = {logo} alt='Logo' className='Logo'/>
            </div>
          </Link>
      </div>

      <div className="policyBox">
        <h1>Legal Policy</h1>
        <h2>Introduction:</h2>
        <p>
          This Legal Policy governs the terms and conditions for the use of the
          on-demand delivery service web application provided by Flexiver. By
          accessing or using our web application, you agree to comply with the
          terms outlined in this policy. Please read these terms carefully
          before using our services.
        </p>

        <h2>Acceptance of Terms:</h2>
        <p>
          By accessing or using our on-demand delivery service web application,
          you acknowledge that you have read, understood, and agree to be bound
          by the terms and conditions outlined in this Legal Policy. If you do
          not agree with any part of these terms, you may not use our services.
        </p>

        <h2>Service Description:</h2>
        <p>
          Our web application provides a platform that connects users in need of
          delivery services ("Customers") with independent delivery partners
          ("Delivery Partners") who are available to fulfill delivery requests.
          The web application facilitates the scheduling, tracking, and payment
          for delivery services.
        </p>

        <h2>User Eligibility:</h2>
        <p>
          You must be at least 18 years old and have the legal capacity to enter
          into contracts in order to use our on-demand delivery service web
          application. By using our services, you represent and warrant that you
          meet these eligibility requirements.
        </p>

        <h2>User Responsibilities:</h2>
        <ul>
          <li>
            Customers are responsible for providing accurate delivery
            instructions, including pick-up and drop-off locations, delivery
            times, and any special handling requirements.
          </li>
          <li>
            Delivery Partners are responsible for fulfilling delivery requests
            in a timely and professional manner, following all applicable laws
            and regulations.
          </li>
          <li>
            All users are responsible for maintaining the confidentiality of
            their account credentials and for any activity that occurs under
            their account.
          </li>
        </ul>

        <h2>Service Limitations:</h2>
        <p>
          While we strive to provide reliable and efficient delivery services,
          we cannot guarantee the availability of Delivery Partners or the
          timely completion of delivery requests. Factors such as weather
          conditions, traffic congestion, and other unforeseen circumstances may
          impact service availability and delivery times.
        </p>

        <h2>Intellectual Property Rights:</h2>
        <p>
          All content and materials available on our on-demand delivery service
          web application, including but not limited to text, graphics, logos,
          images, and software, are the property of Flexiver or its licensors
          and are protected by copyright, trademark, and other intellectual
          property laws.
        </p>

        <h2>Limitation of Liability:</h2>
        <p>
          In no event shall Flexiver or its affiliates, directors, officers,
          employees, agents, or licensors be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or in any
          way connected with the use of our on-demand delivery service web
          application, whether based on contract, tort, strict liability, or any
          other legal theory, even if advised of the possibility of such
          damages.
        </p>

        <h2>Indemnification:</h2>
        <p>
          You agree to indemnify and hold harmless Flexiver and its affiliates,
          directors, officers, employees, agents, and licensors from and against
          any and all claims, liabilities, damages, losses, costs, or expenses,
          including reasonable attorneys' fees, arising out of or in any way
          connected with your use of our on-demand delivery service web
          application or your violation of these terms.
        </p>

        <h2>Governing Law and Jurisdiction:</h2>
        <p>
          This Legal Policy shall be governed by and construed in accordance
          with the laws of Australia, without regard to its conflict of law
          principles. Any legal action or proceeding arising out of or in any
          way connected with this Legal Policy shall be brought exclusively in
          the courts of Australia.
        </p>

        <h2>Changes to Terms:</h2>
        <p>
          Flexiver reserves the right to modify or amend this Legal Policy at
          any time without prior notice. Any changes to this policy will be
          effective immediately upon posting on our on-demand delivery service
          web application. Your continued use of our services after any such
          changes constitutes your acceptance of the revised terms.
        </p>

        <h2>Contact Information:</h2>
        <p>
          If you have any questions or concerns about this Legal Policy, please
          contact us at{" "}
          <a href="mailto:contact@example.com">contact@example.com</a>.
        </p>

        <p>
          By using our on-demand delivery service web application, you
          acknowledge that you have read, understood, and agree to be bound by
          this Legal Policy.
        </p>

        <br />
        <br />

        <h1>Data Protection Policy</h1>
        <h2>Introduction:</h2>
        <p>
          At Flexiver, we are committed to protecting the privacy and security
          of the personal data collected through our on-demand delivery service
          web application. This Data Protection Policy outlines our practices
          for collecting, using, storing, and protecting user data in compliance
          with applicable data protection laws and regulations.
        </p>

        <h2>Information Collected:</h2>
        <p>
          We may collect the following types of personal data from users of our
          web application:
        </p>
        <ul>
          <li>
            Contact information (such as name, email address, phone number).
          </li>
          <li>
            Delivery details (such as pick-up and drop-off locations, delivery
            instructions).
          </li>
          <li>
            Payment information (such as credit card details, billing address).
          </li>
        </ul>

        <h2>Purpose of Data Collection:</h2>
        <p>We collect personal data from users for the following purposes:</p>
        <ul>
          <li>
            Facilitating the provision of delivery services requested by users.
          </li>
          <li>Processing payments for delivery services.</li>
          <li>
            Communicating with users regarding delivery requests, updates, and
            support inquiries.
          </li>
          <li>
            Improving the functionality and user experience of our web
            application.
          </li>
        </ul>

        <h2>Data Use and Sharing:</h2>
        <p>
          We use personal data collected from users solely for the purposes
          stated in this policy and do not sell or share it with third parties
          for marketing purposes. Personal data may be shared with Delivery
          Partners to facilitate the fulfillment of delivery requests. We may
          disclose personal data if required by law or legal process, or if
          necessary to protect our rights or the safety of our users.
        </p>

        <h2>Data Security Measures:</h2>
        <p>
          We implement technical and organizational measures to protect the
          security and confidentiality of user data. Access to personal data is
          restricted to authorized personnel who require access for legitimate
          business purposes. We use encryption and secure socket layer (SSL)
          technology to transmit sensitive data over the internet.
        </p>

        <h2>Data Retention:</h2>
        <p>
          We retain personal data for as long as necessary to fulfill the
          purposes for which it was collected, unless a longer retention period
          is required or permitted by law. Users may request the deletion of
          their personal data by contacting us using the contact information
          provided in this policy.
        </p>

        <h2>User Rights:</h2>
        <p>
          Users have the right to access, update, or correct their personal data
          stored by us. Users may request the deletion of their personal data,
          subject to any legal obligations or legitimate business interests that
          require us to retain the data. Users may opt out of receiving
          promotional communications from us by following the unsubscribe
          instructions included in the communications.
        </p>

        <h2>Children's Privacy:</h2>
        <p>
          Our on-demand delivery service web application is not intended for use
          by children under the age of _____, and we do not knowingly collect
          personal data from children.
        </p>

        <h2>Changes to Policy:</h2>
        <p>
          We reserve the right to modify or update this Data Protection Policy
          at any time. Any changes to this policy will be posted on our web
          application, and users will be notified of any material changes.
        </p>

        <h2>Contact Information:</h2>
        <p>
          If you have any questions or concerns about this Data Protection
          Policy or our data practices, please contact us at{" "}
          <a href="mailto:contact@example.com">contact@example.com</a>.
        </p>

        <p>
          By using our on-demand delivery service web application, you
          acknowledge that you have read, understood, and agree to the terms of
          this Data Protection Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
