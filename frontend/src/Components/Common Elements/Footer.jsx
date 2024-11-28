import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const FACEBOOK_LINK =
    "https://www.facebook.com/psycortex.bt?mibextid=rS40aB7S9Ucbxw6v";
  const X_LINK = "https://x.com/PPsycortex";
  const LINKED_IN_LINK =
    "http://www.linkedin.com/in/psycortex-private-limited-720289301";
  const INSTAGRAM_LINK = "https://www.instagram.com/psycortex_pvt_ltd/";
  const YOUTUBE_LINK = "https://www.youtube.com/@psycortex_private_limited";

  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [ismessageVisible, setismessageVisible] = useState(false);

  const handleSubmit = async (e) => {
    if (email === "") {
      window.alert("Please fill email before submitting.");
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/subscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }
        );
        if (response.ok) {
          console.log("Subscription Added successfully");
          // Store current time in local storage
          setmessage("Subscription Added Succesfully");
          setismessageVisible(true);
        } else {
          console.error("Failed to submit booking");
          setmessage("User Already Exists");
          setismessageVisible(true);
        }
      } catch (error) {
        console.error("Error submitting:", error);
      }
    }
  };
  return (
    <>
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
      <div id="Footer">
        <div id="newletter">
          <div id="lhs">
            <label htmlFor="newsletter-email">
              Subscribe to our Newsletter
            </label>
            <span>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <button onClick={handleSubmit}>Subscribe</button>
            </span>
          </div>
          <div id="rhs">
            <a href={FACEBOOK_LINK}>
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href={INSTAGRAM_LINK}>
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href={X_LINK}>
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href={LINKED_IN_LINK}>
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href={YOUTUBE_LINK}>
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
        <div id="lower-footer-div">
          <h4>About Us</h4>
          <div>
            <Link to="/aboutus/about">About Us</Link>
            <Link to="/aboutus/missionvisionandvalues">
              Mission Values and Vision
            </Link>
            {/* <Link to="/aboutus/team">Our Team</Link> */}
            <Link to="/aboutus/gallery">Gallery</Link>
            {/* <Link to="/aboutus/offices">Offices</Link> */}
            <Link to="/aboutus/awards">Awards</Link>
          </div>

          <h4>Our Services</h4>

          <h4 className="uniqfooter">Counselling Services</h4>
          <div>
            <Link to="/services/counsellingservices/maritalcounselling">
              Marital Counselling
            </Link>
            <Link to="/services/counsellingservices/premaritalcounselling">
              Pre-Marital Counselling
            </Link>
            <Link to="/services/counsellingservices/postmaritalcounselling">
              Post-Marital Counselling
            </Link>
            <Link to="/services/counsellingservices/anxietycounselling">
              Anxiety Counselling
            </Link>
            <Link to="/services/counsellingservices/depressioncounselling">
              Depression Counselling
            </Link>
            <Link to="/services/counsellingservices/traumacounselling">
              Trauma Counselling
            </Link>
            {/* <Link to="/services/counsellingservices/substanceabuseoraddictioncounselling">
              Substance Abuse or Addiction Counselling
            </Link> */}
            <Link to="/services/counsellingservices/griefcounselling">
              Grief Counselling
            </Link>
            <Link to="/services/counsellingservices/motivationalcounselling">
              Motivational Counselling
            </Link>
            <Link to="/services/counsellingservices/stressmanagementcounselling">
              Stress Management Counselling
            </Link>
            <Link to="/services/counsellingservices/mentalhealthcounselling">
              Mental Health Counselling
            </Link>
            <Link to="/services/counsellingservices/sleepcounselling">
              Sleep Counselling
            </Link>
          </div>

          <h4 className="uniqfooter">Psychotherapy Approaches</h4>
          <div>
            <Link to="/services/psychotherapyapproaches/interpersonalpsychotherapy">
              Interpersonal Psychotherapy
            </Link>
            <Link to="/services/psychotherapyapproaches/psychologicalcounselling">
              Psychological Counselling
            </Link>
          </div>

          <h4 className="uniqfooter">Assessment and Testing</h4>
          <div>
            <Link to="/services/assessmentandtesting/psychologicaltesting">
              Psychological Testing
            </Link>
            <Link to="/services/assessmentandtesting/psychometricassessment">
              Psychometric Assessment
            </Link>
            <Link to="/services/assessmentandtesting/careersuitabilitytest">
              Career Suitability Test
            </Link>
          </div>

          <h4 className="uniqfooter">Career and Skills Development</h4>
          <div>
            <Link to="/services/careerandskillsdevelopment/careercounselling">
              Career Counselling
            </Link>
            <Link to="/services/careerandskillsdevelopment/softskillsdevelopment">
              Soft Skills Development
            </Link>
          </div>

          <h4 className="uniqfooter">Unique Features</h4>
          <div>
            <Link to="/services/uniquefeatures/comprehensivementalwellnesssupport">
              Comprehensive Mental Wellness Support
            </Link>
            <Link to="/services/uniquefeatures/personalizedtherapyplans">
              Personalized Therapy Plans
            </Link>
            <Link to="/services/uniquefeatures/evidencebasedtherapeutictechniques">
              Evidence-Based Therapeutic Techniques
            </Link>
            <Link to="/services/uniquefeatures/specializedsupport">
              Specialized Support
            </Link>
            <Link to="/services/uniquefeatures/careerandprofessionaldevelopment">
              Career and Professional Development
            </Link>
            <Link to="/services/uniquefeatures/familyandrelationshipcounselling">
              Family and Relationship Counselling
            </Link>
            <Link to="/services/uniquefeatures/stressandsleepmanagement">
              Stress and Sleep Management
            </Link>
            <Link to="/services/uniquefeatures/empatheticandsupportiveenvironment">
              Empathetic and Supportive Environment
            </Link>
            <Link to="/services/uniquefeatures/commitmenttoconfidentiality">
              Commitment to Confidentiality
            </Link>
            <Link to="/services/uniquefeatures/ethicalandprofessionalstandards">
              Ethical and Professional Standards
            </Link>
            <Link to="/services/uniquefeatures/educationalresourcesandsupport">
              Educational Resources and Support
            </Link>
          </div>

          <div>
            <h4>
              <Link to="/blogs">Blogs </Link>
            </h4>
            <h4>
              <Link to="/franchise">Franchise </Link>
            </h4>
          </div>
        </div>
        <div id="right-reserved">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/thebraintakeLogo.png`}
            alt=""
          />
          <p>
            © {new Date().getFullYear()} Psycortex Pvt. Ltd. All rights
            reserved.
          </p>
          <ul>
            <Link to={"/psycortex/privacypolicy"}>Privacy Policy</Link>
            <Link to={"/psycortex/termsandcondition"}>Terms & Conditions</Link>
            <Link to={"/psycortex/returnpolicy"}>Refund Policy</Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
