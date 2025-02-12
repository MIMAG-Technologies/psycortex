import React, { useEffect, useRef, useState } from "react";

import "./Contact.css";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

function Contact() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
    const whatsAppLink = "https://wa.me/+918767027078?text=";
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactNumber: "",
    city: "",
    state: "",
    country: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
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
              entry.target.style.opacity = "1";
            } else {
              entry.target.style.transform = "scale(0.85)";
              entry.target.style.opacity = "0";
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

  const handleSubmit = async (e) => {
    // Check if any field is empty
    if (Object.values(formData).some((value) => value === "")) {
      window.alert("Please fill in all fields before submitting.");
      return;
    }
    try {
      // Check if local storage contains submission time
      const lastContactSubmitTime = localStorage.getItem(
        "lastContactSubmitTime"
      );
      if (lastContactSubmitTime) {
        const currentTime = new Date().getTime();
        const timeDifference =
          (currentTime - parseInt(lastContactSubmitTime)) / (1000 * 60); 
        if (timeDifference < 1) {
          setmessage(
            "You recently submitted a message. Please try again after sometime."
          );
          setismessageVisible(true);
          return;
        }
      }
      setisButtonDisabled(true);
      const responce = await axios.post( `${process.env.REACT_APP_API_URL}/contactUs`,formData)



      if (responce.data.success) {
        console.log("Message sent successfully");
        // Store current time in local storage
        localStorage.setItem(
          "lastContactSubmitTime",
          new Date().getTime().toString()
        );
        setmessage("Your message has been sent successfully!");
        setismessageVisible(true);
        setisButtonDisabled(false);
      } else {
        console.error("Failed to send message");
        setmessage("Failed to send message! Try Again Later");
        setismessageVisible(true);
        setisButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [message, setmessage] = useState("");
  const [ismessageVisible, setismessageVisible] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact Psycortex - We're Here to Help</title>
        <meta
          name="description"
          content="Get in touch with Psycortex. Whether you have questions or need support, our team is ready to assist you with your mental health needs."
        />
      </Helmet>
      {ismessageVisible ? (
        <div id="messageBox">
          <div>
            <span
              onClick={() => {
                setismessageVisible(false);
              }}
            >
              x
            </span>
            {message}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="Contact">
        <h1 ref={(el) => observedElements.current.push(el)}>
          {loc.pathname === "/contactus" ? "CONTACT US" : "Get in Touch"}
        </h1>
        <div>
          <div
            className="adress"
            ref={(el) => observedElements.current.push(el)}
          >
            <h1> {loc.pathname === "/contactus" ? "Get in Touch" : ""}</h1>
            <h2 ref={(el) => observedElements.current.push(el)}>Head Office</h2>
            <h2
              ref={(el) => observedElements.current.push(el)}
              className="cityname"
            >
              Nagpur
            </h2>
            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Address :{" "}
              </span>
              Block no. 101/102, 2nd floor, Shriram Tower, Sadar, Nagpur-
              440001, Maharashtra
            </p>
            <h2 ref={(el) => observedElements.current.push(el)}>
              Branch Office
            </h2>
            <h2
              ref={(el) => observedElements.current.push(el)}
              className="cityname"
            >
              Pune
            </h2>
            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Address :{" "}
              </span>
              Block no. 214 2nd Floor, 93 Avenue Mall,Bhagwan Tatyasaheb Kawade
              Rd, Fatima Nagar, RSPF, Wanowrie, Pune, Maharashtra 411022
            </p>

            <h2
              ref={(el) => observedElements.current.push(el)}
              className="cityname"
            >
              Indore
            </h2>
            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Address :{" "}
              </span>
              114, AB Road, Near PATEL MOTORS, Part II, Scheme No 114, Indore,
              Madhya Pradesh 452010
            </p>

            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Customer Care No.:{" "}
              </span>
              <a href="tel:8767027078">8767027078</a>
            </p>
            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Email:{" "}
              </span>
              <a href="mailto:info@psycortex.in">info@psycortex.in</a>
            </p>
            <p ref={(el) => observedElements.current.push(el)}>
              <span ref={(el) => observedElements.current.push(el)}>
                Customer Support Email:{" "}
              </span>
              <a href="mailto:care@psycortex.in">care@psycortex.in</a>
            </p>

            <Link className="all-contact-Link" to="all">
              View All Branches
            </Link>
          </div>
          <div className="form" ref={(el) => observedElements.current.push(el)}>
            <div>
              <label htmlFor="">First Name</label>
              <input
                type="text"
                value={formData.firstname}
                onChange={handleChange}
                name="firstname"
              />
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                name="lastname"
              />
            </div>

            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div>
              <label htmlFor="">Contact No.</label>
              <input
                type="number"
                value={formData.contactNumber}
                onChange={handleChange}
                name="contactNumber"
              />
            </div>
            <div>
              <label htmlFor="">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={handleChange}
                name="city"
              />
            </div>
            <div>
              <label htmlFor="">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={handleChange}
                name="state"
              />
            </div>

            <div>
              <label htmlFor="">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={handleChange}
                name="country"
              />
            </div>

            <div id="message">
              <label htmlFor="">Message</label>
              <textarea
                cols="30"
                rows="10"
                value={formData.message}
                onChange={handleChange}
                name="message"
              ></textarea>
            </div>
            <button
              disabled={isButtonDisabled}
              style={{
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="map" ref={(el) => observedElements.current.push(el)}>
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
      </div>
      <a
        href={whatsAppLink}
        id="whatsapp-logo"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}

export default Contact;
