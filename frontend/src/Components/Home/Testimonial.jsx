import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function Testimonial() {
  const observedElements = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "scale(0.95)";
            entry.target.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.current.forEach((el) => {
      if (el) {
        // Ensure element is valid before observing
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  const testimonialData = [
    {
      name: "Anamika Debnath",
      job: "Client",
      message:
        "He not only helps me to focus on my health but also she encouraged me to go on solo trip to explore the beautiful places. Thank you Sir for being extremely supportive and understanding. It’s only because of your guidance I am able to help myself thank you so much sirji you are the best",
    },
    {
      name: "Vijayshree Joshi",
      job: "Client",
      message:
        "We highly recommend the counseling services of Psycortex Pvt. Ltd. In spite of his extensive background knowledge, his astute mind continues to expand his understanding. I've found him to be really helpful for my health. Thank you from the bottom of my heart. also, the medical staff at the clinic. Greetings, and it's great to have you join us. excellentcounsleor.",
    },
    {
      name: "Ramesh Babu",
      job: "Client",
      message:
        "The way I have seen positive changes in myself and the way the sessions have transformed me makes me feel so satisfied and happy especially about my marital life. I would highly recommend Dr. Kumar sir .It has given me a new life! Thanks Psycortex Pvt. Ltd.",
    },
    {
      name: "Neha Nimran",
      job: "Client",
      message:
        "Dr. Kumar is really a good listener, he shows empathy. There is sense of security and you feel you are in right hands.I wish them all the best and will recommend this clinic to everyone who needs help. Getting appointments is hassle free and online call makes the process smooth.",
    },
    {
      name: "Urvashi Soni",
      job: "Client",
      message:
        "The service that I receive from beautiful mind clinic is excellent. Dr. Kumar and the staff are friendly and very much understanding about problem that I have. very helpful I would have no qualms in recommending them to family and friends.",
    },
    {
      name: "Piyush Dethe",
      job: "Client",
      message:
        "Dr.kumar is incredible.not only has he taken great care of my mental health, but also he is lovely to speak with at every appointment. It's rare to find a doctor like him, I highly recommend becoming his patient",
    },
    {
      name: "Deoki Nandan",
      job: "Client",
      message:
        "Dr Kumar and Dr Fatima are very good counsellor and their behaviour is excellant. . They try to extend help to patient in all possible way . The other staff working there is very polite and helpful.",
    },
    {
      name: "Sheetal Ahuja",
      job: "Client",
      message:
        "During Covid time was son was addicted to pub g .I was really worried as his mental state was not good.Then I came across Psycortex Pvt. Ltd .Thrn there was No looking back .Sir and the team did a wonderful job to overcome this problem.",
    },
    {
      name: "Misty Johnson",
      job: "Client",
      message:
        "In particular, my marriage has flourished as a result of all the excellent things that have occurred to me and the ways in which the sessions have transformed me. I would highly suggest Dr. Kumar sir due to the outstanding care I got from him. For me, it's like being given a second chance at life. Psycortex Pvt. Ltd, You Have Been Greatly Valued.",
    },
    {
      name: "Megha",
      job: "Client",
      message:
        "Psycortex Pvt. Ltd is the ideal place where my family has allowed me to pursue my job and my aspirations. Sir, thank you very much for this wonderful family counseling session. I am fortunate to have this kind of personality in this world that is just interested in understanding you. Thank you very much, sir. Excellent advisor.",
    },
  ];

  const CardLoaders = () => {
    return testimonialData.map((onecard, index) => (
      <SwiperSlide>
        <div
          className="one-testimonial"
          key={index}
          ref={(el) => el && observedElements.current.push(el)}
        >
          <i
            className="fa-solid fa-quote-right"
            style={{ color: "#ffffff" }}
          ></i>
          <p>{onecard.message}</p>
          <div className="whowrotethat">
            <span>
              <h3>{onecard.name}</h3>
              <p>{onecard.job}</p>
            </span>
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="Testimonial">
      <h1
        className="heading"
        ref={(el) => el && observedElements.current.push(el)}
      >
        Testimonials
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {CardLoaders()}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <div className="swiper-button-next slider-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Testimonial;
