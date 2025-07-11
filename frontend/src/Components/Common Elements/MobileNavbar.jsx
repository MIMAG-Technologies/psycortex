import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserCard from "../User/UserCard";
import { UserDataContext } from "../../context/UserData";
function MobileNavbar(props) {
  const [isBurgerActive, setisBurgerActive] = useState(false);
  const [isLevel2Active, setisLevel2Active] = useState(false);
  const [dropdownContent, setDropdownContent] = useState(null);
  const [isUserCardVisible, setisUserCardVisible] = useState(false);

  const [isSearchBoxOpen, setisSearchBoxOpen] = useState(false);
  const [searchkey, setsearchkey] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cartData, isLoggedIn } = useContext(UserDataContext);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setisBurgerActive(false);
  }, [location.pathname]);
  const handleAccordionClick = (event) => {
    const accordionButton = event.target;
    const content = accordionButton.nextElementSibling;

    // Close all accordions
    const allAccordionContents =
      document.querySelectorAll(".accordion-content");
    allAccordionContents.forEach((accordionContent) => {
      if (accordionContent !== content) {
        accordionContent.style.maxHeight = null;
        accordionContent.previousElementSibling.classList.remove("is-open");
      }
    });

    // Toggle the clicked accordion
    accordionButton.classList.toggle("is-open");

    if (content.style.maxHeight) {
      content.style.maxHeight = null; // Close the accordion
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // Open the accordion
    }
  };

  const ServicesDropdown = () => {
    return (
      <>
        <span className="accordion" onClick={handleAccordionClick}>
          Counselling Services
        </span>
        <div className="accordion-content">
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/maritalcounselling"
          >
            Marital Counselling
          </Link> */}
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/premaritalcounselling"
          >
            Pre-Marital Counselling
          </Link> */}
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/postmaritalcounselling"
          >
            Post-Marital Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/anxietycounselling"
          >
            Anxiety Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/depressioncounselling"
          >
            Depression Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/traumacounselling"
          >
            Trauma Counselling
          </Link> */}
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/substanceabuseoraddictioncounselling"
          >
            Substance Abuse or Addiction Counselling
          </Link> */}
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/griefcounselling"
          >
            Grief Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/motivationalcounselling"
          >
            Motivational Counselling
          </Link> */}
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/stressmanagementcounselling"
          >
            Stress Management Counselling
          </Link> */}
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/mentalhealthcounselling"
          >
            Mental Health Counselling
          </Link>
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/counsellingservices/sleepcounselling"
          >
            Sleep Counselling
          </Link> */}
        </div>

        <span className="accordion" onClick={handleAccordionClick}>
          Psychotherapy Approaches
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychotherapyapproaches/interpersonalpsychotherapy"
          >
            Interpersonal Psychotherapy
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychotherapyapproaches/psychologicalcounselling"
          >
            Psychological Counselling
          </Link>
        </div>

        <span className="accordion" onClick={handleAccordionClick}>
          Assessment and Testing
        </span>
        <div className="accordion-content">
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/assessmentandtesting/psychologicaltesting"
          >
            Psychological Testing
          </Link> */}
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/assessmentandtesting/psychometricassessment"
          >
            Psychometric Assessment
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/assessmentandtesting/careersuitabilitytest"
          >
            Career Suitability Test
          </Link>
        </div>

        <span className="accordion" onClick={handleAccordionClick}>
          Career and Skills Development
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/careerandskillsdevelopment/careercounselling"
          >
            Career Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/careerandskillsdevelopment/softskillsdevelopment"
          >
            Soft Skills Development
          </Link>
        </div>

        <span className="accordion" onClick={handleAccordionClick}>
          Unique Features
        </span>
        <div className="accordion-content">
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/comprehensivementalwellnesssupport"
          >
            Comprehensive Mental Wellness Support
          </Link> */}
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/personalizedtherapyplans"
          >
            Personalized Therapy Plans
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/evidencebasedtherapeutictechniques"
          >
            Evidence-Based Therapeutic Techniques
          </Link>
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/specializedsupport"
          >
            Specialized Support
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/careerandprofessionaldevelopment"
          >
            Career and Professional Development
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/familyandrelationshipcounselling"
          >
            Family and Relationship Counselling
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/stressandsleepmanagement"
          >
            Stress and Sleep Management
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/empatheticandsupportiveenvironment"
          >
            Empathetic and Supportive Environment
          </Link> */}
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/commitmenttoconfidentiality"
          >
            Commitment to Confidentiality
          </Link>
          {/* <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/ethicalandprofessionalstandards"
          >
            Ethical and Professional Standards
          </Link> */}
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/uniquefeatures/educationalresourcesandsupport"
          >
            Educational Resources and Support
          </Link>
        </div>
      </>
    );
  };

  //Dropdown Contents

  const AboutUsDropdown = () => {
    return (
      <>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);

            setisLevel2Active(false);
          }}
          to="/aboutus/about"
        >
          About Us{" "}
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);

            setisLevel2Active(false);
          }}
          to="/aboutus/missionvisionandvalues"
        >
          Mission Values and Vision
        </Link>

        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);

            setisLevel2Active(false);
          }}
          to="/aboutus/gallery"
        >
          Gallery
        </Link>

        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);

            setisLevel2Active(false);
          }}
          to="/aboutus/awards"
        >
          Awards
        </Link>
      </>
    );
  };

  // Level 1 Handing Function

  const handleNavHover = (index) => {
    // Set dropdown content based on the hovered index
    switch (index) {
      case 1:
        setDropdownContent(<AboutUsDropdown />);
        setisLevel2Active(true);
        break;
      case 2:
        setDropdownContent(<ServicesDropdown />);
        setisLevel2Active(true);

        break;
      default:
        setDropdownContent(null);
    }
  };

  return (
    <>
      {isUserCardVisible ? (
        <UserCard setisUserCardVisible={setisUserCardVisible} />
      ) : (
        <></>
      )}
      <div id="MobileNavbar">
        <div id="mobNav">
          <Link clasName="level1navLink" to="/">
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/assets/Images/thebraintakeLogo.png`}
              alt=""
            />{" "}
          </Link>
          <div id="search-box-div">
            <input
              value={searchkey}
              onChange={(e) => setsearchkey(e.target.value)}
              type="text"
              style={{
                display: isSearchBoxOpen ? "inline" : "none",
              }}
            />
            <i
              onClick={() => {
                if (isSearchBoxOpen && searchkey !== "") {
                  setisSearchBoxOpen(false);
                  navigate(`/search/${searchkey}`);
                } else {
                  setisSearchBoxOpen(true);
                }
              }}
              style={{
                borderRight: isSearchBoxOpen ? "none" : "2px solid black",
              }}
              className="fa-solid fa-magnifying-glass"
            ></i>{" "}
            <i
              onClick={() => setisSearchBoxOpen(false)}
              style={{
                display: isSearchBoxOpen ? "inline" : "none",
              }}
              className="fa-solid fa-xmark"
            ></i>
          </div>
          <Link
            to={"/user/mycart"}
            className="cart-container"
            style={{
              display: isSearchBoxOpen ? "none" : "flex",
            }}
          >
            <i className="fa-solid fa-cart-shopping" id={cartData.length}></i>
          </Link>
          <a
            className={`button ${isHovered ? "appbutton" : ""}`}
            style={{
              fontSize: "14px",
              height: "fit-content",
              width: "fit-content",
              textDecoration: "none",
              textAlign: "center",
              display: isSearchBoxOpen ? "none" : "flex",
            }}
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
            }}
            href="https://client.psycortex.in/"
            target="_blank"
            rel="noreferrer"
          >
            Book Appointment
          </a>
          <div
            className="burger"
            onClick={() => {
              setisBurgerActive(!isBurgerActive);

              setisLevel2Active(false);
            }}
          >
            <div
              className="top"
              style={
                isBurgerActive
                  ? { transform: "rotate(45deg) translateY(8px)" }
                  : { transform: "rotate(0deg) translateY(0%)" }
              }
            ></div>
            <div
              className="middle"
              style={
                isBurgerActive
                  ? { transform: "translateX(500%)" }
                  : { transform: "translateX(0%)" }
              }
            ></div>
            <div
              className="bottom"
              style={
                isBurgerActive
                  ? { transform: "rotate(-45deg) translateY(-8px)" }
                  : { transform: "rotate(0deg) translateY(0%)" }
              }
            ></div>
          </div>
        </div>
        <div
          id="mobNavL1"
          style={isBurgerActive ? { right: "0%" } : { right: "-101%" }}
        >
          <span
            onClick={() => {
              setisLevel2Active(true);
              handleNavHover(1);
            }}
          >
            About Us
          </span>

          <span
            onClick={() => {
              setisLevel2Active(true);
              handleNavHover(2);
            }}
          >
            Services
          </span>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
            }}
            to="/franchise"
          >
            Franchise
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
            }}
            to="/blogs"
          >
            Blogs
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
            }}
            to="/contactus"
          >
            Contact Us
          </Link>
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
            }}
            to="/shop"
          >
            Shop
          </Link>
          <Link
            to={!isLoggedIn ? "/user/login" : location.pathname}
            onClick={
              !isLoggedIn
                ? () => {
                    setisBurgerActive(!isBurgerActive);
                  }
                : () => {
                    setisUserCardVisible(!isUserCardVisible);
                  }
            }
          >
            {!isLoggedIn ? "Login" : "My Account"}
          </Link>
        </div>
        <div
          id="mobNavL2"
          style={isLevel2Active ? { right: "0%" } : { right: "-101%" }}
        >
          <div
            id="back-btn"
            onClick={() => {
              setisLevel2Active(false);
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
            Back
          </div>

          {dropdownContent}
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
