import React from "react";
import "./Payment.css";
import { CreditCard } from "lucide-react";

function ConfirmationPopUp(props) {
  const { grandTotal, setconfirmcard } = props;
  return (
    <div className="cccard-div">
      <div className="cofirmcard-card">
        <CreditCard />
        <p className="cofirmcard-cookieHeading">Confirm Payment</p>
        <p className="cofirmcard-cookieDescription">
          Do you want to Continue with Payment of Rs{" "}
          {grandTotal.toLocaleString()}?
        </p>
        <div className="cofirmcard-buttonContainer">
          <button className="cofirmcard-acceptButton" id="btnSubmit">
            Allow
          </button>
          <button
            className="cofirmcard-declineButton"
            onClick={() => {
              setconfirmcard(false);
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopUp;
