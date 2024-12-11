import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <section id="landing-upper">
        <p>10,000+ Lives Transformed—Yours Could Be Next!</p>
        <p>Contact: 8767027078</p>
        <p>Email: psycortex24@gmail.com</p>
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
          ₹1499 (Save ₹4000 Today) Let’s work together to overcome your
          challenges.
        </p>
        <Link>Book Now</Link>
      </div>
      <img src="/assets/Images/Marketing/landing.svg" alt="" />
    </div>
    </>
  );
}
