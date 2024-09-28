import React, { useEffect } from "react";
import "./Home.css";
import HomeServices from "./Services";
import LandingPage from "./LandingPage";
import TheBrainTake from "./TheBrainTake";
import Stats from "./Stats";
import SkilledIn from "./SkilledIn";
import BrainTakeForWho from "./BrainTakeForWho";
import Testimonial from "./Testimonial";
import Acheivements from "./Acheivements";
import { Helmet } from "react-helmet-async";

function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Psycortex - Comprehensive Mental Health Solutions</title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet>
      <LandingPage />
      <TheBrainTake />
      <HomeServices />
      <Stats />
      <SkilledIn />
      <BrainTakeForWho />
      {/* <Acheivements /> */}
      <Testimonial />
    </>
  );
}

export default Home;
