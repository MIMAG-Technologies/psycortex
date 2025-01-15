import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserDataContext } from "../../context/UserData";

// import { Helmet } from "react-helmet"; // Ensure you have this package installed if used
import "../Payments/Payment.css";
import axios from "axios";
function CheckOut() {
  const merchantKey = process.env.REACT_APP_MERCENT_KEY;
  const { userData, setUserData, cartData } = useContext(UserDataContext);
  const [hash, sethash] = useState("");
  const [txnId, settxnId] = useState("");
  const [productHash, setproductHash] = useState(null);
  const surl = `${process.env.REACT_APP_API_URL}/make-transaction/handle_payments`;
  const furl = `${process.env.REACT_APP_API_URL}/make-transaction/handle_payments`;


  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userData.address) {
      // Update nested address fields
      setUserData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      // Update top-level fields
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to calculate the total for an item
  const calculateTotal = (item) => {
    const cost = parseInt(item.cost.replace(/,/g, ""));
    const total = item.quantity * cost;
    return total.toLocaleString();
  };

  // Calculate grand total
const calculateGrandTotal = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total += parseInt(item.cost.replace(/,/g, "")) * item.quantity;
  });
  return total;
};


  const amount = calculateGrandTotal(cartData);

  const generateHash = async () => {
    if(!productHash){
       const hashArray = [];
       await cartData.forEach((item) => {
         hashArray.push(item.name);
       });
       setproductHash(hashArray.join(","));
    }
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/make-transaction/getHash`,
      {
        amount,
        productInfo: productHash,
        firstName: userData.name,
        email: userData.email,
        phone: userData.email,
        txnId,
        surl,
        furl,
      }
    );
    sethash(res.data.data);
    settxnId(res.data.txnId);
  };

  const isEverythingOk = useMemo(() => {
    return (
      userData.name &&
      userData.email &&
      userData.phoneNo &&
      userData.address.country &&
      userData.address.streetAddress &&
      userData.address.apartment &&
      userData.address.city &&
      userData.address.state &&
      userData.address.pinCode
    );
  }, [userData]);


useEffect(() => {
  const handler = setTimeout(() => {
    if (userData.name && userData.email && userData.phoneNo) {
      generateHash();
    }
  }, 1000);

  return () => {
    clearTimeout(handler);
  };
}, [userData.name, userData.email, userData.phoneNo, isChecked]);


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

        <label id="companyName" htmlFor="companyName">
          Company Name
        </label>
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
          required
          name="country"
          placeholder="Country"
          value={userData.address.country || ""}
          onChange={handleChange}
        />

        <label htmlFor="streetAddress">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          required
          name="streetAddress"
          placeholder="Street Address"
          value={userData.address.streetAddress || ""}
          onChange={handleChange}
        />

        <label htmlFor="apartment">Apartment</label>
        <input
          type="text"
          id="apartment"
          required
          name="apartment"
          placeholder="Apartment"
          value={userData.address.apartment || ""}
          onChange={handleChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          placeholder="City"
          value={userData.address.city || ""}
          onChange={handleChange}
        />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          required
          placeholder="State"
          value={userData.address.state || ""}
          onChange={handleChange}
        />

        <label htmlFor="pinCode">Pin Code</label>
        <input
          type="text"
          id="pinCode"
          name="pinCode"
          required
          placeholder="Pin Code"
          value={userData.address.pinCode || ""}
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
          <p
            style={{
              marginBottom: "10px",
            }}
          >
            Kindly proceed with the payment only after reviewing our terms and
            conditions.
          </p>
        </label>
        <label id="wordline-select">
          <input
            type="checkbox"
            checked={isChecked} // Bind state to checkbox
            onChange={handleCheckboxChange} // Update state on change
          />{" "}
          You agree to all the terms & conditions mentioned on the website.
        </label>
        <label id="wordline-select">
          <input type="radio" checked />
          Pay with PayU
          <img
          style={{
             mixBlendMode: "multiply"
          }}
            src="/assets/Images/Payments/PayU-logo-Green.jpg"
            alt="PayU"
          />
        </label>
        <form action="https://test.payu.in/_payment" method="post">
          <input type="hidden" name="key" value={merchantKey} />
          <input type="hidden" name="txnid" value={txnId} />
          <input type="hidden" name="productinfo" value={productHash} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="email" value={userData.email} />
          <input type="hidden" name="firstname" value={userData.name} />
          <input type="hidden" name="surl" value={surl} />
          <input type="hidden" name="furl" value={furl} />
          <input type="hidden" name="udf1" value="udf1" />
          <input type="hidden" name="udf2" value="udf2" />
          <input type="hidden" name="udf3" value="udf3" />
          <input type="hidden" name="udf4" value="udf4" />
          <input type="hidden" name="udf5" value="udf5" />
          <input type="hidden" name="phone" value={userData.phoneNo} />
          <input type="hidden" name="hash" value={hash} />
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
