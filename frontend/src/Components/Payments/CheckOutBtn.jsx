import React, { useEffect, useState } from "react";
import ConfirmationPopUp from "./ConfirmationPopUp";
import axios from "axios";
import LoadingBar from "../Common Elements/LoadingBar";

const PaymentButton = (props) => {
  const { grandTotal, user } = props;
  const [isLoading, setisLoading] = useState(false);
  const [confirmcard, setconfirmcard] = useState(false);
  const [data, setdata] = useState({});
  const scaleGrandTotal = (grandTotal) => {
    // Define the target range
    const min = 2;
    const max = 9;
    const referenceAmount = 1000000; // 10 lakhs

    // Calculate the percentage of the grand total relative to 10 lakhs
    const percentage = grandTotal / referenceAmount;

    // Scale the percentage to fit within the 2-9 range
    const scaledTotal = percentage * (max - min) + min;

    // Ensure the scaled total is within the 2-9 range
    return Math.min(Math.max(scaledTotal, min), max);
  };

  useEffect(() => {
    console.log(user);
    setdata({
      name: user.name,
      email: user.email,
      productIds: ["PSYIC1", "PSYIC2", "PSYGC1"],
      amount: `${scaleGrandTotal(grandTotal)}`,
    });
  }, [user]);

  const initiate = async () => {
    setisLoading(true);
    const token = localStorage.getItem("psycortexTOKEN");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/transaction/initiate`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactionToken = res.data.token;
      localStorage.setItem("transactionToken", transactionToken);
      localStorage.setItem(
        "transactionPaymentAmount",
        scaleGrandTotal(grandTotal)
      );

      setconfirmcard(true);
    } catch (error) {
      alert("Something Went Wrong!");
    } finally {
      setisLoading(false);
    }
  };

  if (confirmcard) {
    return (
      <ConfirmationPopUp
        grandTotal={grandTotal}
        setconfirmcard={setconfirmcard}
      />
    );
  }
  return (
    <div className="check-out-container" onClick={initiate}>
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
  );
};

export default PaymentButton;
