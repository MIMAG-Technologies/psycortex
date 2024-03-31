import React, { useEffect, useRef } from "react";

import "./Contact.css";
import { useLocation } from "react-router-dom";

function Contact() {
  const observedElements = useRef([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const loc = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entries) {
            if (entry.isIntersecting) {
              entry.target.style.transform = "scale(1)";
            } else {
              entry.target.style.transform = "scale(0.95)";
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.current.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <>
      <div className="Contact">
        <h1 ref={(el) => observedElements.current.push(el)}>
          {loc.pathname === "/contactus" ? "CONTACT US" : "Get in Touch"}
        </h1>
        <div>
          <div
            className="adress"
            ref={(el) => observedElements.current.push(el)}
          >
            <h2> {loc.pathname === "/contactus" ? "Get in Touch" : ""}</h2>
            <h2>Nagpur</h2>
            <p>
              <span>Address : </span>
              Block no. 101/102, 2nd floor, Shriram Tower, Sadar, Nagpur-
              440001, Maharashtra
            </p>
            <h2>Pune</h2>
            <p>
              <span>Address : </span>
              Block no. 214 2nd Floor , 93 Avenue Mall,Bhagwan Tatyasaheb Kawade
              Rd, Fatima Nagar , RSPF , Wanowrie , Pune , Maharashtra 411022
            </p>
            <p>
              <h2>Indore</h2>
              <p>
                <span>Address : </span>
                114 , AB Road , Near PATEL MOTORS , Part II , Scheme No 114,
                Indore , Madhya Pradesh 452010
              </p>
            </p>
            <p>
              {" "}
              <span>Phone no : </span>9270034937
            </p>
            <p>
              {" "}
              <span>Email : </span>
              psycortex01@gmail.com
            </p>

            <div
              className="map"
              ref={(el) => observedElements.current.push(el)}
            >
              <iframe
                title="ouraddress"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.902706260872!2d79.07839517592043!3d21.156269883385526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e5fefa9a71%3A0xe4fd81e2aed84508!2sShriram%20Tower%20Sadar!5e0!3m2!1sen!2sin!4v1711206445711!5m2!1sen!2sin"
                width={600}
                height={450}
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="form" ref={(el) => observedElements.current.push(el)}>
            <div>
              <label htmlFor="">Country</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">State</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">City</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">First Name</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Contact No.</label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>

            <div id="message">
              <label htmlFor="">Message</label>
              <textarea name="" cols="30" rows="10"></textarea>
            </div>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
