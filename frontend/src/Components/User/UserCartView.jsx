// UserCartView.js
import React, { useEffect, useState } from "react";
import "../Payments/Payment.css";

import {
  getProductIds,
  fetchCart,
  updateCart,
  decrementQuantity,
  incrementQuantity,
  calculateGrandTotal,
  calculateTotal,
  initiateTransaction,
  updateUser,
} from "./cartUtils";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function UserCartView(props) {
  const { fetchUser, user } = props;
  const [hereUser, setHereUser] = useState({});
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmCard, setConfirmCard] = useState(false);
  const [data, setData] = useState({});
  const [isEverythingOk, setIsEverythingOk] = useState(false);
  const navigate = useNavigate();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [isAggred, setisAggred] = useState(false);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const status = localStorage.getItem("isTransactionDone");
      if (status) {
        setTransactionStatus(status);
        setChecking(false); // Stop checking once status is found
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount or stop
  }, [checking]);

  useEffect(() => {
    if (transactionStatus === "success") {
      navigate("/user/mypurchaseditems");
      window.location.reload();
      localStorage.removeItem("isTransactionDone");
    } else if (transactionStatus === "failure") {
      window.location.reload();
      localStorage.removeItem("isTransactionDone");
    }
  }, [transactionStatus]);

  const startChecking = () => {
    setChecking(true);
    console.log("Checking started!");
  };

  useEffect(() => {
    setData({
      name: hereUser.name,
      email: hereUser.email,
      productIds: getProductIds(cart),
      amount: `${grandTotal}`,
    });
  }, [hereUser, cart, grandTotal]);

  useEffect(() => {
    setHereUser(user);
  }, [user]);
  useEffect(() => {
    const allFieldsFilled = Object.entries(user)
      .filter(([key]) => key !== "companyName")
      .every(([, value]) => value !== "");
    if (!allFieldsFilled) {
      setIsEverythingOk(false);
    } else {
      setIsEverythingOk(true);
      startChecking();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.entries(hereUser)
      .filter(([key]) => key !== "companyName")
      .every(([, value]) => value !== "");

    if (!allFieldsFilled) {
      setIsEverythingOk(false);
      alert("Please Fill all Fields!");
      return;
    }

    const res = await updateUser(hereUser, fetchUser);
    setIsEverythingOk(res);
    if (res) {
      setChecking();
    }
  };

  useEffect(() => {
    fetchCart(setCart, () => calculateGrandTotal(cart, setGrandTotal));
  }, []);

  useEffect(() => {
    if (grandTotal === 0) {
      calculateGrandTotal(cart, setGrandTotal);
    }
  }, [cart, grandTotal]);

  const allItemsInCart = () => {
    return cart.map((item, index) => (
      <div className="oneCartItem" key={index}>
        <div>
          <h1>{item.name}</h1>
          <p>{item.diffrentby}</p>
          <p>No of Sessions: {item.sessions}</p>
          <p>Cost/item: {item.cost}</p>
        </div>
        <div>
          <div id="Quantifier">
            <span onClick={() => decrementQuantity(cart, setCart, index)}>
              <i className="fa-solid fa-minus"></i>
            </span>
            <span>{item.quantity}</span>
            <span onClick={() => incrementQuantity(cart, setCart, index)}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          <button
            className="editcartbtn"
            onClick={() =>
              updateCart(
                item.productId,
                item.quantity,
                () =>
                  fetchCart(setCart, () =>
                    calculateGrandTotal(cart, setGrandTotal)
                  ),
                fetchUser,
                () => calculateGrandTotal(cart, setGrandTotal)
              )
            }
          >
            <i className="fa-solid fa-cart-arrow-down"></i> Update Cart
          </button>
        </div>
        <div>
          <p style={{ fontWeight: "bolder" }}>Total: {calculateTotal(item)}</p>
        </div>
      </div>
    ));
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="UserCartView">
        <h1>Cart is Empty</h1>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHereUser({
      ...hereUser,
      [name]: value,
    });
  };

  if (confirmCard) {
    return (
      <div className="UserCheckoutView">
        <Helmet>
          <title>Make Payment</title>
          <meta
            name="description"
            content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
          />
        </Helmet>
        <form onSubmit={handleSubmit}>
          <p className="checkoutdetailheading">Billing Details</p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Name"
            value={hereUser.name || ""}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            disabled
            id="email"
            name="email"
            required
            placeholder="Email"
            value={hereUser.email || ""}
            onChange={handleChange}
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            required
            placeholder="Phone Number"
            value={hereUser.phoneNo || ""}
            onChange={handleChange}
          />

          <label htmlFor="companyName" id="companyname">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Company Name"
            value={hereUser.companyName || ""}
            onChange={handleChange}
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            required
            name="country"
            placeholder="Country"
            value={hereUser.country || ""}
            onChange={handleChange}
          />

          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            required
            name="streetAddress"
            placeholder="Street Address"
            value={hereUser.streetAddress || ""}
            onChange={handleChange}
          />

          <label htmlFor="apartment">Apartment</label>
          <input
            type="text"
            id="apartment"
            required
            name="apartment"
            placeholder="Apartment"
            value={hereUser.apartment || ""}
            onChange={handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="City"
            value={hereUser.city || ""}
            onChange={handleChange}
          />

          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            required
            placeholder="State"
            value={hereUser.state || ""}
            onChange={handleChange}
          />

          <label htmlFor="pinCode">Pin Code</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            required
            placeholder="Pin Code"
            value={hereUser.pinCode || ""}
            onChange={handleChange}
          />
          <button type="submit">Update Details</button>
        </form>
        <div className="UserCheckoutViewRHS">
          <p className="checkoutdetailheading">Your Order</p>
          <div className="cartdetails">
            <div style={{ backgroundColor: "#f3f4f6" }}>Items</div>
            <div style={{ backgroundColor: "#f3f4f6" }}>Subtotal</div>
            {cart.map((item, index) => (
              <React.Fragment key={index}>
                <div>
                  {item.name}-{item.diffrentby}{" "}
                  {`(${item.sessions} sessions) x ${item.quantity}`}
                </div>
                <div style={{ color: "#501a77" }}>
                  Rs {calculateTotal(item)}
                </div>
              </React.Fragment>
            ))}
            <div style={{ backgroundColor: "#f3f4f6" }}>Total</div>
            <div style={{ color: "#501a77", fontWeight: "bold" }}>
              Rs {grandTotal}
            </div>
          </div>
          <label id="wordline-select-tc">
            <p>
              Please read all the terms and conditions carefully before making
              your payment:
            </p>
            <ul>
              <li>
                You are eligible to apply for a refund within 7 days of
                purchase.
              </li>
              <li>
                No chargeback requests will be accepted after 7 days from the
                date of purchase.
              </li>
            </ul>
            <p
              style={{
                marginBottom: "10px",
              }}
            >
              Kindly proceed with the payment only after reviewing our
              terms and conditions.
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
              alt="Wordline"
            />
          </label>
          <button id={isEverythingOk ? "btnSubmit" : ""}>
            {!isEverythingOk ? "Please Fill Your Details First" : "Pay Now"}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="UserCartView">
      <Helmet>
        <title>Your Cart</title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet>
      {allItemsInCart()}
      <span>
        <h1>Grand Total: Rs {grandTotal.toLocaleString()}</h1>
        <div
          className="check-out-container"
          onClick={() =>
            initiateTransaction(data, setIsLoading, setConfirmCard, grandTotal)
          }
        >
          <div className="check-out-left-side">
            <div className="check-out-card">
              <div className="check-out-card-line"></div>
              <div className="check-out-buttons"></div>
            </div>
            <div className="check-out-post">
              <div className="check-out-post-line"></div>
              <div className="check-out-screen">
                <div className="check-out-dollar">$</div>
              </div>
              <div className="check-out-numbers"></div>
              <div className="check-out-numbers-line2"></div>
            </div>
          </div>
          <div className="check-out-right-side">
            <div className="check-out-new">Checkout</div>
          </div>
        </div>
      </span>
    </div>
  );
}

export default UserCartView;
