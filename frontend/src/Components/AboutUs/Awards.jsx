import React, { useEffect } from "react";
import Acheivements from "../Home/Acheivements";

function Awards() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const data = [
    {
      src: "/assets/Images/AboutUs/Awards/certificate1.jpg",
      shortinfo: "Certificate for diploma in Counselling",
    },

    {
      src: "/assets/Images/AboutUs/Awards/certificate2.jpg",
      shortinfo: "Certificate for diploma in Child Counselling",
    },
    {
      src: "/assets/Images/AboutUs/Awards/certificate6.jpeg",
      shortinfo: "Certificate for Master Class in Clinical Sexology",
    },

    {
      src: "/assets/Images/AboutUs/Awards/certificate7.jpeg",
      shortinfo: "Certificate for Phd in Sexology and Psychosexual Counselling",
    },
  ];
  const longdata = [
    {
      src: "/assets/Images/AboutUs/Awards/certificate3.jpg",
      shortinfo: "City Excellence Award'23",
    },

    {
      src: "/assets/Images/AboutUs/Awards/certificate5.jpeg",
      shortinfo: "Indian Star of the Year Award'23",
    },
  ];
  const onecard = (ele) => {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={ele.src} alt="" />
          </div>
          <div className="flip-card-back">
            <p>{ele.shortinfo}</p>
          </div>
        </div>
      </div>
    );
  };
  const onelongcard = (ele) => {
    return (
      <div className="flip-cardlong">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={ele.src} alt="" />
          </div>
          <div className="flip-card-back">
            <p>{ele.shortinfo}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="Awards">
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>
        {" > About Us > Awards"}{" "}
      </div>
      <Acheivements />
      <div className="partnershipcardsdiv">
        {data.map((imgs, index) => onecard(imgs))}
        {longdata.map((imgs, index) => onelongcard(imgs))}
      </div>
    </div>
  );
}

export default Awards;
