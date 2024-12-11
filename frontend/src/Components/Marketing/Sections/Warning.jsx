import React from "react";
import { Link } from "react-router-dom";

export default function Warning() {
  return (
    <>
      <div className="Warning1">
        <h1>Don’t Miss Out – Limited Slots Available!</h1>
        <ul>
          <div>● Special pricing is valid only for this month.</div>
          <div>● 
            Slots are filling fast – act now to secure your first session at
            <span>
            ₹1499.
            </span>
          </div>
        </ul>
      </div>
      <div className="Warning2">
        <h1>
          Take charge of your
          <span> mental health </span>
          today. Your journey to a better you
          <span> starts here! </span>
        </h1>
        <Link>Get Started Now – Secure Your Slot</Link>
      </div>
    </>
  );
}
