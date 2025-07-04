import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserDataContext } from "../../context/UserData";
import "../Payments/Payment.css";
import axios from "axios";

function CheckOut() {
  const { userData, setUserData, cartData } = useContext(UserDataContext);

  // Calculate grand total for cart
  const calculateGrandTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += parseInt(item.cost.replace(/,/g, "")) * item.quantity;
    });
    return total;
  };

  // Calculate total for a single item
  const calculateTotal = (item) => {
    const cost = parseInt(item.cost.replace(/,/g, ""));
    const total = item.quantity * cost;
    return total.toLocaleString();
  };

  // State for transaction id and amount
  const [txnId, setTxnId] = useState(null);
  const [amount, setAmount] = useState(calculateGrandTotal(cartData));

  // Payment URLs
  const merchantKey = process.env.REACT_APP_MERCENT_KEY;
  const frontendUrl =
    process.env.REACT_APP_DEV_MODE === "true"
      ? "http://localhost:3000"
      : "https://psycortex.in";
  const surl = `${process.env.REACT_APP_API_URL}/make-transaction/handle_payments/${userData.email}/${amount}/success/${txnId}`;
  const furl = `${process.env.REACT_APP_API_URL}/make-transaction/handle_payments/${userData.email}/${amount}/error/${txnId}`;
  const curl = `${frontendUrl}/user/mycart`;

  // Checkbox for terms and conditions
  const [isChecked, setIsChecked] = useState(false);

  // Save userData to localStorage on change
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  // Update transaction id every 500ms

  const getTxnId = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/make-transaction/getHash`
    );
    setTxnId(res.data.txnId);
  };
  useEffect(() => {
    if (!txnId) {
      getTxnId();
    }
  }, [txnId]);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (userData.address && name in userData.address) {
      setUserData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Check if all required fields are filled
  const isEverythingOk = useMemo(() => {
    return (
      userData.name &&
      userData.email &&
      userData.phoneNo &&
      userData.address &&
      userData.address.country &&
      userData.address.streetAddress &&
      userData.address.apartment &&
      userData.address.city &&
      userData.address.state &&
      userData.address.pinCode
    );
  }, [userData]);

  return (
    <div className="UserCheckoutView">
      <form>
        <p className="checkoutdetailheading">Billing Details</p>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Name"
          value={userData.name || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={userData.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="phoneNo">Phone Number</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          required
          placeholder="Phone Number"
          value={userData.phoneNo || ""}
          onChange={handleChange}
        />

        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Company Name"
          value={userData.companyName || ""}
          onChange={handleChange}
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          required
          placeholder="Country"
          value={userData.address?.country || ""}
          onChange={handleChange}
        />

        <label htmlFor="streetAddress">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          required
          placeholder="Street Address"
          value={userData.address?.streetAddress || ""}
          onChange={handleChange}
        />

        <label htmlFor="apartment">Apartment</label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          required
          placeholder="Apartment"
          value={userData.address?.apartment || ""}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          placeholder="City"
          value={userData.address?.city || ""}
          onChange={handleChange}
        />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          required
          placeholder="State"
          value={userData.address?.state || ""}
          onChange={handleChange}
        />

        <label htmlFor="pinCode">Pin Code</label>
        <input
          type="text"
          id="pinCode"
          name="pinCode"
          required
          placeholder="Pin Code"
          value={userData.address?.pinCode || ""}
          onChange={handleChange}
        />
      </form>

      <div className="UserCheckoutViewRHS">
        <p className="checkoutdetailheading">Your Order</p>
        <div className="cartdetails">
          <div style={{ backgroundColor: "#f3f4f6" }}>Items</div>
          <div style={{ backgroundColor: "#f3f4f6" }}>Subtotal</div>
          {cartData.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                {item.name}-{item.diffrentby}{" "}
                {`(${item.sessions} sessions) x ${item.quantity}`}
              </div>
              <div style={{ color: "#501a77" }}>Rs {calculateTotal(item)}</div>
            </React.Fragment>
          ))}
          <div style={{ backgroundColor: "#f3f4f6" }}>Total</div>
          <div style={{ color: "#501a77", fontWeight: "bold" }}>
            Rs {calculateGrandTotal(cartData)}
          </div>
        </div>

        <label id="wordline-select-tc">
          <p>
            Please read all the terms and conditions carefully before making
            your payment:
          </p>
          <ul>
            <li>
              You are eligible to apply for a refund within 7 days of purchase.
            </li>
            <li>
              No chargeback requests will be accepted after 7 days from the date
              of purchase.
            </li>
            <li>
              For any chargeback or cancellation kindly mail us on
              info@psycortex.in
            </li>
          </ul>
          <p style={{ marginBottom: "10px" }}>
            Kindly proceed with the payment only after reviewing our terms and
            conditions.
          </p>
        </label>

        <label id="wordline-select">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{" "}
          You agree to all the terms & conditions mentioned on the website.
        </label>

        <label id="wordline-select">
          <input type="radio" checked readOnly />
          Pay with PayU
          <img
            style={{ mixBlendMode: "multiply" }}
            src="/assets/Images/Payments/PayU-logo-Green.jpg"
            alt="PayU"
          />
        </label>

        <form
          action="https://www.paydollar.com/b2c2/eng/payment/payForm.jsp"
          method="post"
        >
          <input type="hidden" name="merchantId" value={merchantKey} />
          <input type="hidden" name="orderRef" value={txnId} />
          <input type="hidden" name="currCode" value="356" />
          <input type="hidden" name="mpsMode" value="NIL" />
          <input
            type="hidden"
            name="amount"
            value={(amount / 1000000).toFixed(1)}
          />
          <input type="hidden" name="lang" value="E" />
          <input type="hidden" name="successUrl" value={surl} />
          <input type="hidden" name="failUrl" value={furl} />
          <input type="hidden" name="cancelUrl" value={curl} />
          <input type="hidden" name="payType" value="N" />
          <input type="hidden" name="payMethod" value="ALL" />
          <input
            style={{
              backgroundColor:
                isEverythingOk && isChecked ? "#501a77" : "#cccccc",
              cursor: isEverythingOk && isChecked ? "pointer" : "not-allowed",
              color: isEverythingOk && isChecked ? "white" : "black",
              opacity: isEverythingOk && isChecked ? 1 : 0.6,
            }}
            disabled={!(isEverythingOk && isChecked)}
            type="submit"
            value={
              !isEverythingOk ? "Please Fill Your Details First" : "Pay Now"
            }
          />
        </form>
      </div>
    </div>
  );
}

export default CheckOut;
