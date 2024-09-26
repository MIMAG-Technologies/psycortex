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

function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
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
