import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomtoTopBtn from "./BottomtoTopBtn";

function Navbar() {
  const [section, setSection] = useState("aboutus");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
        content: "Directors Message",
        ref: "/aboutus/directorsmessage",
        level: 1,
      },
      {
        content: "Mission Values and Vision",
        ref: "/aboutus/missionvisionandvalues",
        level: 1,
      },
      {
        content: "Our Team",
        ref: "/aboutus/team",
        level: 1,
      },
      {
        content: "Offices",
        ref: "/aboutus/offices",
        level: 1,
      },
      {
        content: "Awards",
        ref: "/aboutus/awards",
        level: 1,
      },
    ],
    uniqueFeatures: [
      {
        content: "Marital Counseling",
        ref: "/uniquefeature/maritialcounselling",
        level: 1,
      },
      {
        content: "Pre-Marital Counseling ",
        ref: "/uniquefeature/premaritalcounseling",
        level: 1,
      },
      {
        content: "Post-Marital Counseling ",
        ref: "/uniquefeature/postmaritalcounselling",
        level: 1,
      },
      {
        content: "Career Counseling",
        ref: "/uniquefeature/careercounseling",
        level: 1,
      },
      {
        content: "Anxiety Counseling",
        ref: "/uniquefeature/anxietycounseling",
        level: 1,
      },
      {
        content: "Depression Counseling",
        ref: "/uniquefeature/depressioncounseling",
        level: 1,
      },
      {
        content: "Traumatic Counseling",
        ref: "/uniquefeature/traumaticcounseling",
        level: 1,
      },
      {
        content: "Cognitive Behavioral Therapy",
        level: 1,
        ref: "/uniquefeature/cbt",
      },
      {
        content: "Parenting Counseling",
        ref: "/uniquefeature/parentingcounselling",
        level: 1,
      },
      {
        content: "Family Counseling",
        ref: "/uniquefeature/familycounselling",
        level: 1,
      },
      {
        content: "Child Counseling",
        ref: "/uniquefeature/childcounselling",
        level: 1,
      },
      {
        content: "Group Counseling",
        ref: "/uniquefeature/groupcounselling",
        level: 1,
      },
      {
        content: "Stress Management Counseling",
        ref: "/uniquefeature/stressmanagementcounselling",
        level: 1,
      },
      {
        content: "Mental Health Counseling",
        ref: "/uniquefeature/mentalhealthcounselling",
        level: 1,
      },
      {
        content: "Insomnia/Sleep Problem Counseling",
        ref: "/uniquefeature/insomniacounseling",
        level: 1,
      },
    ],
    services: [
      {
        content: "Psychological Counseling",
        level: 1,
        ref: "#",
      },
      {
        content: "Substance Abuse or Addiction Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/substanceabuseoraddictioncounselling",
      },
      {
        content: "Interpersonal Psychotherapy",
        level: 2,
        ref: "/services/psychologicalcounselling/interpersonalpsychotherapy",
      },
      {
        content: "Overthinking Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/overthinkingcounselling",
      },
      {
        content: "Motivational Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/motivationalcounselling",
      },
      {
        content: "Sex Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/sexcounselling",
      },
      {
        content: "Person Centered Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/personcenteredtherapy",
      },
      {
        content: "Grief Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/griefcounselling",
      },
      {
        content: "Dialectical Behaviour Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/dialecticalbehaviourcounselling",
      },
      {
        content: "Solution-Focused Brief Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/solutionfocusedbrieftherapy",
      },
      {
        content: "Narrative Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/narrativetherapy",
      },
      {
        content: "Rational Emotive Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/rationalemotivetherapy",
      },
      {
        content: "Emotionally Focused Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/emotionallyfocusedtherapy",
      },
      {
        content: "Play Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/playtherapy",
      },
      {
        content: "Art Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/arttherapy",
      },
      {
        content: "Rehabilitation Counseling",
        level: 2,
        ref: "/services/psychologicalcounselling/rehabilitationcounselling",
      },
      {
        content: "Humanistic Psychology",
        level: 2,
        ref: "/services/psychologicalcounselling/humanisticpsychology",
      },
      {
        content: "Gestalt Therapy",
        level: 2,
        ref: "/services/psychologicalcounselling/gestalttherapy",
      },
      {
        content: "Sexology Counseling",
        level: 1,
        ref: "#",
      },

      {
        content: "Erectile Dysfunction",
        level: 2,
        ref: "/services/sexologycounselling/erectiledysfunction",
      },
      {
        content: "Low Libido",
        level: 2,
        ref: "/services/sexologycounselling/lowlibido",
      },
      {
        content: "Lack of Interest",
        level: 2,
        ref: "/services/sexologycounselling/lackofinterest",
      },
      {
        content: "Premature Ejaculation",
        level: 2,
        ref: "/services/sexologycounselling/prematureejaculation",
      },
      {
        content: "Low Confidence",
        level: 2,
        ref: "/services/sexologycounselling/lowconfidence",
      },
      {
        content: "Lack of Response to Sexual Stimulus",
        level: 2,
        ref: "/services/sexologycounselling/lackofresponsetosexualstimulus",
      },
      {
        content: "Inability to Reach Orgasm",
        level: 2,
        ref: "/services/sexologycounselling/inabilitytoreachorgasm",
      },
      {
        content: "Excessive Libido",
        level: 2,
        ref: "/services/sexologycounselling/excessivelibido",
      },
      {
        content: "Distressing Sexual Thoughts Unwanted",
        level: 2,
        ref: "/services/sexologycounselling/distressingsexualthoughtsunwanted",
      },
      {
        content: "Inability to Control Sexual Behavior",
        level: 2,
        ref: "/services/sexologycounselling/inabilitytocontrolsexualbehaviour",
      },
      {
        content: "Issues relating to Sexual Trauma",
        level: 2,
        ref: "/services/sexologycounselling/issuesrelatingtosexualtrauma",
      },
      {
        content: "Somatic Sex Therapy",
        level: 2,
        ref: "/services/sexologycounselling/somaticsextherapy",
      },
      {
        content: "Pelvic Floor Physical Therapy",
        level: 2,
        ref: "/services/sexologycounselling/pelvicfloorphysicaltherapy",
      },
      {
        content: "Psychological Testing",
        level: 1,
        ref: "#",
      },
      {
        content: "Basic Counseling",
        level: 2,
        ref: "/services/psychologicaltesting/basiccounselling",
      },
      {
        content: "Personal Counseling",
        level: 2,
        ref: "/services/psychologicaltesting/personalcounselling",
      },
      {
        content: "DMIT Test",
        level: 2,
        ref: "/services/psychologicaltesting/dmittest",
      },
      {
        content: "Psychometric Assessment",
        level: 2,
        ref: "/services/psychologicaltesting/psychometricassessment",
      },
      {
        content: "Career Suitability Test",
        level: 2,
        ref: "/services/psychologicaltesting/careersuitabilitytest",
      },
      {
        content: "Intelligence Building Program",
        level: 2,
        ref: "/services/psychologicaltesting/intelligencebuildingprogram",
      },
      {
        content: "MidBrain Activation",
        level: 2,
        ref: "/services/psychologicaltesting/midbrainactivation",
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
            <Link to={"/booking"} class="button">
              Book Appointment
              <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                <path
                  clip-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </Link>
            {/* <a>
              <i className="fa-solid fa-cart-shopping"></i>
            </a>
            <a>Shop</a> */}
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
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
          </ul>
          <ul className={isScrolled ? "lowerscrolled" : "lowerdiv"}>
            <Link to="/" className="imglowerdiv">
              <img
                src={`${process.env.PUBLIC_URL}/assets/Images/thebraintakeLogo.png`}
                alt=""
              />
            </Link>
            <a
              onMouseEnter={() => {
                setSection("aboutus");
                setIsDropdownActive(true);
              }}
            >
              About Us <DropdownArrow />{" "}
            </a>
            <a
              onMouseEnter={() => {
                setSection("uniqueFeatures");
                setIsDropdownActive(true);
              }}
            >
              Unique features <DropdownArrow />{" "}
            </a>
            <a
              onMouseEnter={() => {
                setIsDropdownActive(true);
                setSection("services");
              }}
            >
              Services <DropdownArrow />{" "}
            </a>
            <Link
              onMouseEnter={() => {
                setIsDropdownActive(false);
              }}
              to="/testimonials"
              style={{
                color:
                  location.pathname === "/"
                    ? isScrolled
                      ? "black"
                      : "white"
                    : "black",
              }}
            >
              Testimonials
            </Link>
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
              to={"/casestudies"}
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
              Case Studies
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
