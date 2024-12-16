import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <section id="landing-upper">
        <p>10,000+ Lives Transformed—Yours Could Be Next!</p>
        <p className="landing_upper_p">Contact: 8767027078</p>
        <p className="landing_upper_p">Email: psycortex24@gmail.com</p>
      </section>
      <div className="MrkLanding">
        <div>
          <h1>
            A Better
            <span> Tomorrow </span>
            Starts with the Right Support
            <span> Today.</span>
          </h1>
          <p>
            Affordable, Accessible, and Life-Changing Therapy – Now Starting at
            <span style={{
              color:"green"
            }}> ₹1499 </span> (Save <span style={{
              color:"red"
            }}> ₹4000 </span> Today) Let’s work
            together to overcome your challenges.
          </p>
          <Link to={"/contactus"}> Book Appoinment Now</Link>
        </div>
        <img src="/assets/Images/Marketing/landing.jpg" alt="" />
      </div>
    </>
  );
}
