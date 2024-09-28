import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Franchise() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

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

  return (
    <div className="One-Blog">
      <Helmet>
        <title> Franchise Opportunity for Thriving Business Growth</title>
        <meta
          name="description"
          content="Join our successful franchise network. Unlock the best business opportunities and start thriving today."
        />
      </Helmet>
      <div
        className="frachisebg"
        style={{
          background: `url(/assets/Images/franchisebg.png) center/contain no-repeat`,
        }}
      ></div>
      <h1
        className="franchiseeheading"
        ref={(el) => el && observedElements.current.push(el)}
      >
        {" "}
        OUR FRANCHISE
      </h1>
      <h2 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Investment Opportunity Overview
      </h2>
      <p ref={(el) => el && observedElements.current.push(el)}>
        We are pleased to present an exciting investment opportunity with a
        potential for lucrative returns. With an initial investment of Rs.
        3,00,000/-, you can secure a 10 km monopoly in the scanning software and
        scanner industry. This investment includes access to cutting-edge
        technology and support services to help you maximize your profits.
      </p>
      <h2 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Key Features of the Investment:
      </h2>
      <h3 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Scanning Software and Scanner:
      </h3>
      <p ref={(el) => el && observedElements.current.push(el)}>
        A comprehensive scanning software and scanner package will be provided
        to you, enabling you to offer high-quality scanning services to your
        clients. This investment comes with a minimal initial investment of 20
        below, ensuring accessibility for aspiring entrepreneurs.
      </p>
      <h3 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Report Selling Price and Reload Amount:
      </h3>
      <p ref={(el) => el && observedElements.current.push(el)}>
        You can sell reports generated through the scanning software at a
        competitive price of Rs. 4000 + ST. Additionally, for the first 10 cases
        of the month, you will receive Rs. 1100 per report. Subsequent cases
        will yield Rs. 900 per report.
      </p>
      <h3 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Marketing Support:
      </h3>
      <p ref={(el) => el && observedElements.current.push(el)}>
        To help you establish your business, we provide marketing materials
        featuring your company logo and name, both in soft copy (including
        brochures, standees, banners) and 100 hard copy brochures. Our
        comprehensive marketing support includes online and offline initiatives,
        ensuring PAN India visibility for your business.
      </p>
      <h3 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Associate Placement:
      </h3>
      <p ref={(el) => el && observedElements.current.push(el)}>
        Upon successful operation for 6 months, you will have the opportunity to
        place 2 associates to further expand your business and reach.
      </p>
      <h3 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Access to Other Products:
      </h3>
      <p ref={(el) => el && observedElements.current.push(el)}>
        In addition to scanning software and scanner services, your investment
        grants you access to a range of complementary products, including:
      </p>
      <ul ref={(el) => el && observedElements.current.push(el)}>
        <li ref={(el) => el && observedElements.current.push(el)}>
          {" "}
          Intelligence Building Program
        </li>
        <li ref={(el) => el && observedElements.current.push(el)}>
          {" "}
          Soft Skill Development
        </li>
        <li ref={(el) => el && observedElements.current.push(el)}>
          {" "}
          Child Development Program
        </li>
        <li ref={(el) => el && observedElements.current.push(el)}>
          Brain Synchronization Program
        </li>
        <li ref={(el) => el && observedElements.current.push(el)}>
          {" "}
          Counselling Services
        </li>
        <li ref={(el) => el && observedElements.current.push(el)}> IQ Test</li>
        <li ref={(el) => el && observedElements.current.push(el)}>
          {" "}
          Aptitude Test
        </li>
      </ul>
      <h2 ref={(el) => el && observedElements.current.push(el)}>
        {" "}
        Training and Support:
      </h2>
      <p ref={(el) => el && observedElements.current.push(el)}>
        We offer complete Counselling training and support until your staff
        becomes proficient in delivering exceptional service. Our reports boast
        an impressive accuracy rate of over 90% and are available in English,
        Hindi, Marathi, and other local languages as per your requirements.
        Furthermore, you will receive onsite training for 2 days, supplemented
        by online training modules for your convenience.
      </p>
      <h2 ref={(el) => el && observedElements.current.push(el)}> Conclusion</h2>
      <p ref={(el) => el && observedElements.current.push(el)}>
        This investment opportunity promises not only financial rewards but also
        the chance to make a meaningful impact in various sectors, including
        education, personal development, and Counselling. With our robust
        support system and innovative products, you can embark on a successful
        entrepreneurial journey with confidence. Don't miss out on this
        opportunity to join our network of successful investors and make a
        difference in people's lives.
      </p>
    </div>
  );
}

export default Franchise;
