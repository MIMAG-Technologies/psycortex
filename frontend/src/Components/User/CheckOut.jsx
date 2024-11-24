import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../../context/UserData";
// import { Helmet } from "react-helmet"; // Ensure you have this package installed if used
import "../Payments/Payment.css";
function CheckOut() {
  const { userData, setUserData, cartData } = useContext(UserDataContext);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted:", userData);
    // Add your API call logic here
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

  const isEverythingOk =
    userData.name &&
    userData.email &&
    userData.phoneNo &&
    userData.address.country &&
    userData.address.streetAddress &&
    userData.address.apartment &&
    userData.address.city &&
    userData.address.state &&
    userData.address.pinCode;

  return (
    <div className="UserCheckoutView">
      {/* <Helmet>
        <title>Make Payment</title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet> */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Details</button>
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
          <input type="checkbox" checked /> You agree to all the terms &
          conditions mentioned on the website.
        </label>
        <label id="wordline-select">
          <input type="radio" checked />
          Pay with Worldline
          <img
            src="/assets/Images/Payments/worldline-logo.svg"
            alt="Worldline"
          />
        </label>
        <button id={isEverythingOk ? "btnSubmit" : ""}>
          {!isEverythingOk ? "Please Fill Your Details First" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
