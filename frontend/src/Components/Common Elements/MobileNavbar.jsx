import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserCard from "../User/UserCard";
function MobileNavbar(props) {
  const [isBurgerActive, setisBurgerActive] = useState(false);
  const [isLevel2Active, setisLevel2Active] = useState(false);
  const [dropdownContent, setDropdownContent] = useState(null);
  const [isUserCardVisible, setisUserCardVisible] = useState(false);

  const [isSearchBoxOpen, setisSearchBoxOpen] = useState(false);
  const [searchkey, setsearchkey] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser, user, login, cartlenght } = props;
  useEffect(() => {
    fetchUser();
  }, []);
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
          Psychological Counselling
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/substanceabuseoraddictioncounselling"
          >
            Substance Abuse or Addiction Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/interpersonalpsychotherapy"
          >
            Interpersonal Psychotherapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/overthinkingcounselling"
          >
            Overthinking Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/motivationalcounselling"
          >
            Motivational Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/sexcounselling"
          >
            Sex Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/personcenteredtherapy"
          >
            Person Centered Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/griefcounselling"
          >
            Grief Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/dialecticalbehaviourcounselling"
          >
            Dialectical Behaviour Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/solutionfocusedbrieftherapy"
          >
            Solution-Focused Brief Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/narrativetherapy"
          >
            Narrative Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/rationalemotivetherapy"
          >
            Rational Emotive Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/emotionallyfocusedtherapy"
          >
            Emotionally Focused Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/playtherapy"
          >
            Play Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/arttherapy"
          >
            Art Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/rehabilitationcounselling"
          >
            Rehabilitation Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/humanisticpsychology"
          >
            Humanistic Psychology
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicalcounselling/gestalttherapy"
          >
            Gestalt Therapy
          </Link>
        </div>
        <span className="accordion" onClick={handleAccordionClick}>
          Sexology Counselling
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/erectiledysfunction"
          >
            Erectile Dysfunction
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/lowlibido"
          >
            Low Libido
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/lackofinterest"
          >
            Lack of Interest
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/prematureejaculation"
          >
            Premature Ejaculation
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/lowconfidence"
          >
            Low Confidence
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/lackofresponsetosexualstimulus"
          >
            Lack of Response to Sexual Stimulus
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/inabilitytoreachorgasm"
          >
            Inability to Reach Orgasm
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/excessivelibido"
          >
            Excessive Libido
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/distressingsexualthoughtsunwanted"
          >
            Distressing Sexual Thoughts Unwanted
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/inabilitytocontrolsexualbehaviour"
          >
            Inability to Control Sexual Behavior
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/issuesrelatingtosexualtrauma"
          >
            Issues relating to Sexual Trauma
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/somaticsextherapy"
          >
            Somatic Sex Therapy
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/sexologycounselling/pelvicfloorphysicaltherapy"
          >
            Pelvic Floor Physical Therapy
          </Link>
        </div>

        <span className="accordion" onClick={handleAccordionClick}>
          Psychological Testing
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/basiccounselling"
          >
            Basic Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/personalcounselling"
          >
            Personal Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/dmittest"
          >
            DMIT Test
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/psychometricassessment"
          >
            Psychometric Assessment
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/careersuitabilitytest"
          >
            Career Suitability Test
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/intelligencebuildingprogram"
          >
            Intelligence Building Program
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/psychologicaltesting/midbrainactivation"
          >
            MidBrain Activation
          </Link>
        </div>
        <span className="accordion" onClick={handleAccordionClick}>
          Corporate
        </span>
        <div className="accordion-content">
          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/corporate/psychologicalemployeecounselling"
          >
            Psychological Employee Counselling
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/corporate/worklifeservices"
          >
            Work-Life Service
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/corporate/stresscontrolforcorporates"
          >
            Stress Control for Corporates
          </Link>

          <Link
            onClick={() => {
              setisBurgerActive(!isBurgerActive);
              setisLevel2Active(false);
            }}
            to="/services/corporate/hrqol"
          >
            Health-related Quality of Life
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
          About{" "}
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
          to="/aboutus/team"
        >
          Our Team
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
          to="/aboutus/offices"
        >
          Offices
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
  const UniqueFeatureDropdown = () => {
    return (
      <>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/maritialcounselling"
        >
          Marital Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/premaritalcounselling"
        >
          Pre-Marital Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/postmaritalcounselling"
        >
          Post-Marital Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/careercounselling"
        >
          Career Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/anxietycounselling"
        >
          Anxiety Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/depressioncounselling"
        >
          Depression Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/insomniacounselling"
        >
          Insomnia/Sleep Problem Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/traumaticcounselling"
        >
          Traumatic Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/cbt"
        >
          Cognitive Behavioral Therapy
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/parentingcounselling"
        >
          Parenting Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/familycounselling"
        >
          Family Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/childcounselling"
        >
          Child Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/groupcounselling"
        >
          Group Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/stressmanagementcounselling"
        >
          Stress Management Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/mentalhealthcounselling"
        >
          Mental Health Counselling
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/aptitudetest"
        >
          Aptitude Test
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/softskills"
        >
          Soft Skills Devlopement
        </Link>
        <Link
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
            setisLevel2Active(false);
          }}
          to="/uniquefeature/garbhsanskar"
        >
          Garbh Sanskar
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
      case 3:
        setDropdownContent(<UniqueFeatureDropdown />);
        setisLevel2Active(true);

        break;
      default:
        setDropdownContent(null);
    }
  };

  return (
    <>
      {isUserCardVisible ? (
        <UserCard
          fetchUser={fetchUser}
          user={user}
          setisUserCardVisible={setisUserCardVisible}
        />
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
          <Link to={"/user/mycart"} className="cart-container">
            <i className="fa-solid fa-cart-shopping" id={cartlenght}></i>
          </Link>
          <Link
            class="button"
            style={{
              height: login === "Login" ? "fit-content" : "4vh",
              width: login === "Login" ? "fit-content" : "4vh",
              padding: login === "Login" ? "" : "0px",

              textDecoration: "none",
            }}
            to={login === "Login" ? "/user/login" : location.pathname}
            onClick={
              login === "Login"
                ? () => {
                    return;
                  }
                : () => {
                    setisUserCardVisible(!isUserCardVisible);
                  }
            }
          >
            {login}
          </Link>
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
              handleNavHover(3);
            }}
          >
            Unique Features
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
            to="/testimonials"
          >
            Testimonials
          </Link>
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
            to="/casestudies"
          >
            Case Studies
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
            to="/booking"
          >
            Book Appointment
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
