import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BottomtoTopBtn from "./BottomtoTopBtn";
import UserCard from "../User/UserCard";
import { UserDataContext } from "../../context/UserData";
import { User } from "lucide-react";


function Navbar(props) {
  const [section, setSection] = useState("aboutus");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isUserCardVisible, setisUserCardVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchBoxOpen, setisSearchBoxOpen] = useState(false);
  const [searchkey, setsearchkey] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 500);

    
    return () => clearInterval(interval);
  }, []);
  const { cartData, isLoggedIn } = useContext(UserDataContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 70);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdownData = {
    aboutus: [
      {
        content: "About Us",
        ref: "/aboutus/about",
        level: 1,
      },
      {
        content: "Mission Values and Vision",
        ref: "/aboutus/missionvisionandvalues",
        level: 1,
      },
      {
        content: "Gallery",
        ref: "/aboutus/gallery",
        level: 1,
      },
      {
        content: "Awards",
        ref: "/aboutus/awards",
        level: 1,
      },
    ],
    services: [
      {
        content: "Counselling Services",
        level: 1,
        ref: "#",
      },
      {
        content: "Marital Counselling",
        level: 2,
        ref: "/services/counsellingservices/maritalcounselling",
      },
      {
        content: "Pre-Marital Counselling",
        level: 2,
        ref: "/services/counsellingservices/premaritalcounselling",
      },
      {
        content: "Post-Marital Counselling",
        level: 2,
        ref: "/services/counsellingservices/postmaritalcounselling",
      },
      {
        content: "Anxiety Counselling",
        level: 2,
        ref: "/services/counsellingservices/anxietycounselling",
      },
      {
        content: "Depression Counselling",
        level: 2,
        ref: "/services/counsellingservices/depressioncounselling",
      },
      {
        content: "Trauma Counselling",
        level: 2,
        ref: "/services/counsellingservices/traumacounselling",
      },
      // {
      //   content: "Substance Abuse or Addiction Counselling",
      //   level: 2,
      //   ref: "/services/counsellingservices/substanceabuseoraddictioncounselling",
      // },
      {
        content: "Grief Counselling",
        level: 2,
        ref: "/services/counsellingservices/griefcounselling",
      },
      {
        content: "Motivational Counselling",
        level: 2,
        ref: "/services/counsellingservices/motivationalcounselling",
      },
      {
        content: "Stress Management Counselling",
        level: 2,
        ref: "/services/counsellingservices/stressmanagementcounselling",
      },
      {
        content: "Mental Health Counselling",
        level: 2,
        ref: "/services/counsellingservices/mentalhealthcounselling",
      },
      {
        content: "Sleep Counselling",
        level: 2,
        ref: "/services/counsellingservices/sleepcounselling",
      },
      {
        content: "Psychotherapy Approaches",
        level: 1,
        ref: "#",
      },
      {
        content: "Interpersonal Psychotherapy",
        level: 2,
        ref: "/services/psychotherapyapproaches/interpersonalpsychotherapy",
      },
      {
        content: "Psychological Counselling",
        level: 2,
        ref: "/services/psychotherapyapproaches/psychologicalcounselling",
      },
      {
        content: "Assessment and Testing",
        level: 1,
        ref: "#",
      },
      {
        content: "Psychological Testing",
        level: 2,
        ref: "/services/assessmentandtesting/psychologicaltesting",
      },
      {
        content: "Psychometric Assessment",
        level: 2,
        ref: "/services/assessmentandtesting/psychometricassessment",
      },
      {
        content: "Career Suitability Test",
        level: 2,
        ref: "/services/assessmentandtesting/careersuitabilitytest",
      },
      {
        content: "Career and Skills Development",
        level: 1,
        ref: "#",
      },
      {
        content: "Career Counselling",
        level: 2,
        ref: "/services/careerandskillsdevelopment/careercounselling",
      },
      {
        content: "Soft Skills Development",
        level: 2,
        ref: "/services/careerandskillsdevelopment/softskillsdevelopment",
      },
      {
        content: "Unique Features",
        level: 1,
        ref: "#",
      },
      {
        content: "Comprehensive Mental Wellness Support",
        level: 2,
        ref: "/services/uniquefeatures/comprehensivementalwellnesssupport",
      },
      {
        content: "Personalized Therapy Plans",
        level: 2,
        ref: "/services/uniquefeatures/personalizedtherapyplans",
      },
      {
        content: "Evidence-Based Therapeutic Techniques",
        level: 2,
        ref: "/services/uniquefeatures/evidencebasedtherapeutictechniques",
      },
      {
        content: "Specialized Support",
        level: 2,
        ref: "/services/uniquefeatures/specializedsupport",
      },
      {
        content: "Career and Professional Development",
        level: 2,
        ref: "/services/uniquefeatures/careerandprofessionaldevelopment",
      },
      {
        content: "Family and Relationship Counselling",
        level: 2,
        ref: "/services/uniquefeatures/familyandrelationshipcounselling",
      },
      {
        content: "Stress and Sleep Management",
        level: 2,
        ref: "/services/uniquefeatures/stressandsleepmanagement",
      },
      {
        content: "Empathetic and Supportive Environment",
        level: 2,
        ref: "/services/uniquefeatures/empatheticandsupportiveenvironment",
      },
      {
        content: "Commitment to Confidentiality",
        level: 2,
        ref: "/services/uniquefeatures/commitmenttoconfidentiality",
      },
      {
        content: "Ethical and Professional Standards",
        level: 2,
        ref: "/services/uniquefeatures/ethicalandprofessionalstandards",
      },
      {
        content: "Educational Resources and Support",
        level: 2,
        ref: "/services/uniquefeatures/educationalresourcesandsupport",
      },
    ],
  };

  const handleMouseLeave = useCallback(() => {
    setIsDropdownActive(false);
  }, [setIsDropdownActive]);

  const DropdownArrow = () => {
    return <i className="fa-solid fa-angle-down"></i>;
  };

  const DropDownContent = React.memo(({ section }) => {
    return dropdownData[section].map((menu, index) => (
      <Link
        onClick={() => {
          setIsDropdownActive(false);
        }}
        key={index}
        to={menu.ref}
        style={{
          gridColumn: menu.ref === "#" ? "1 / span 3" : "",
          fontWeight:
            menu.level === 2 || section === "uniqueFeatures"
              ? "normal"
              : "bolder",
          fontSize: menu.level !== 2 ? "0.95em" : "",
        }}
      >
        {menu.content}
      </Link>
    ));
  });

  return (
    <>
      {!isScrolled && isUserCardVisible ? (
        <UserCard setisUserCardVisible={setisUserCardVisible} />
      ) : (
        <></>
      )}
      <div
        id="Navbar"
        style={{
          backgroundColor: location.pathname !== "/" ? "white" : "",
          color: location.pathname !== "/" ? "black" : "white",
        }}
      >
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/thebraintakeLogo.png`}
            alt=""
          />
        </Link>
        <div>
          <ul className="upperdiv" onMouseEnter={handleMouseLeave}>
            {" "}
            <a
              href="https://client.psycortex.in/"
              target="_blank"
              rel="noreferrer"
              className={`button ${isHovered ? "appbutton" : ""}`}
            >
              Book Appointment
              <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                <path
                  clipRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <Link to={"/user/mycart"} className="cart-container">
              <i className="fa-solid fa-cart-shopping" id={cartData.length}></i>
            </Link>
            <Link
              to={"/shop"}
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Shop
            </Link>
            <Link
              to="/contactus"
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Contact Us
            </Link>
            <div id="search-box-div">
              <input
                value={searchkey}
                placeholder="Search..."
                onChange={(e) => setsearchkey(e.target.value)}
                type="text"
                style={{
                  width: isSearchBoxOpen ? "fit-content" : "0px",
                  color: location.pathname !== "/" ? "black" : "white",
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
                className="fa-solid fa-magnifying-glass"
              ></i>{" "}
              <i
                onClick={() => setisSearchBoxOpen(false)}
                style={{
                  width: isSearchBoxOpen ? "fit-content" : "0px",
                }}
                className="fa-solid fa-xmark"
              ></i>
            </div>
            <Link
              class="button"
              to={!isLoggedIn ? "/user/login" : location.pathname}
              onClick={
                !isLoggedIn
                  ? () => {
                      return;
                    }
                  : () => {
                      setisUserCardVisible(!isUserCardVisible);
                    }
              }
            >
              {isLoggedIn ? <User /> : "Login"}
            </Link>
          </ul>
          <ul className={isScrolled ? "lowerscrolled" : "lowerdiv"}>
            <Link to="/" className="imglowerdiv">
              <img
                src={`${process.env.PUBLIC_URL}/assets/Images/thebraintakeLogo.png`}
                alt=""
              />
            </Link>
            <Link
              to={"/"}
              onMouseEnter={() => {
                setIsDropdownActive(false);
              }}
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Home
            </Link>
            <div
            
              onMouseEnter={() => {
                setSection("aboutus");
                setIsDropdownActive(true);
              }}
            >
              About Us <DropdownArrow />{" "}
            </div>
            <div
            
              onMouseEnter={() => {
                setIsDropdownActive(true);
                setSection("services");
              }}
            >
              Our Services <DropdownArrow />{" "}
            </div>
            <Link
              to={"/franchise"}
              onMouseEnter={() => {
                setIsDropdownActive(false);
              }}
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Franchise
            </Link>
            <Link
              to={"/blogs"}
              onMouseEnter={() => {
                setIsDropdownActive(false);
              }}
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Blogs
            </Link>
          </ul>
        </div>
      </div>
      {isDropdownActive && (
        <div
          id="dropdown"
          style={isScrolled ? { top: "9vh" } : { top: "18vh" }}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="level1dd">
            <DropDownContent section={section} />
          </ul>
        </div>
      )}
      {isScrolled ? <BottomtoTopBtn /> : null}
    </>
  );
}

export default Navbar;
