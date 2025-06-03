import React, { useEffect, useRef, useState } from "react";
function SkilledIn() {
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

  const [index, setindex] = useState(0);
  const skilledInRef = useRef(null);
  const [isimgonscreen, setisimgonscreen] = useState(false);
  const [isOnbottom, setisOnbottom] = useState(false);
  const imgArr = [
    "/assets/Images/Home/skilledIn1.jpg",
    "/assets/Images/Home/skilledIn2.jpg",
    "/assets/Images/Home/skilledIn3.jpg",
    "/assets/Images/Home/skilledIn4.jpg",
    "/assets/Images/Home/skilledIn5.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const skilledIn = skilledInRef.current;
      if (skilledIn) {
        // Perform a null check
        const rect = skilledIn.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const maxBottompoint =
          -1 * (rect.height - windowHeight) - 0.1 * windowHeight;
        if (rect.top <= 0 && rect.top >= maxBottompoint) {
          if (rect.top > (maxBottompoint / 5) * 1) {
            setindex(0);
          } else if (rect.top > (maxBottompoint / 5) * 2) {
            setindex(1);
          } else if (rect.top > (maxBottompoint / 5) * 3) {
            setindex(2);
          } else if (rect.top > (maxBottompoint / 5) * 4) {
            setindex(3);
          } else if (rect.top > (maxBottompoint / 5) * 5) {
            setindex(4);
          }
          setisimgonscreen(true);
        } else {
          setisimgonscreen(false);
        }
        if (rect.top < -1 * (rect.height - windowHeight)) {
          setisOnbottom(true);
        } else {
          setisOnbottom(false);
        }
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="SkilledIn" ref={skilledInRef}>
      <div className="side-text">
        <div id="skill1">
          <h1>
            <h1
              id="specilizedIn"
              ref={(el) => el && observedElements.current.push(el)}
            >
              We Specialized in
            </h1>
            Adult Psychology
          </h1>
          <img
            ref={(el) => el && observedElements.current.push(el)}
            src={imgArr[0]}
            alt=""
            className="mobile-view-photo"
          />
          <p ref={(el) => el && observedElements.current.push(el)}>
            Adult Psychology focuses on how adults think, feel, and behave. It
            explores identity, relationships, career growth, and mental
            well-being throughout different stages of adulthood.
            {/* <Link
              ref={(el) => el && observedElements.current.push(el)}
              class="know-more-btn"
              to={""}
            >
              Know More
              <div class="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link> */}
          </p>
        </div>
        <div id="skill2" ref={(el) => el && observedElements.current.push(el)}>
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            {" "}
            Parenting Counselling
          </h1>
          <img
            ref={(el) => el && observedElements.current.push(el)}
            src={imgArr[1]}
            alt=""
            className="mobile-view-photo"
          />

          <p ref={(el) => el && observedElements.current.push(el)}>
            Parenting Counseling supports parents in managing the challenges of
            raising children, offering a safe space to explore concerns,
            frustrations, and parenting goals
            {/* <Link
              ref={(el) => el && observedElements.current.push(el)}
              class="know-more-btn"
              to={"/uniquefeature/parentingcounselling"}
            >
              Know More
              <div
                ref={(el) => el && observedElements.current.push(el)}
                class="icon"
              >
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link> */}
          </p>
        </div>
        <div ref={(el) => el && observedElements.current.push(el)} id="skill3">
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            Marital Counselling
          </h1>
          <img
            ref={(el) => el && observedElements.current.push(el)}
            src={imgArr[2]}
            alt=""
            className="mobile-view-photo"
          />

          <p ref={(el) => el && observedElements.current.push(el)}>
            Marital Counseling helps couples resolve conflicts, improve
            communication, and build stronger relationships in a supportive,
            neutral setting guided by trained therapists.
            {/* <Link
              ref={(el) => el && observedElements.current.push(el)}
              class="know-more-btn"
              to={"/uniquefeature/maritialcounselling"}
            >
              Know More
              <div class="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link> */}
          </p>
        </div>
        {/* <div ref={(el) => el && observedElements.current.push(el)} id="skill4">
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            Insomnia Counseling
          </h1>
          <img
            ref={(el) => el && observedElements.current.push(el)}
            src={imgArr[3]}
            alt=""
            className="mobile-view-photo"
          />
          <p>
            Insomnia counseling provides support and guidance to individuals
            experiencing difficulties with sleep. By exploring factors such as
            stress, anxiety, or lifestyle habits, counselors collaborate with
            clients to create personalized strategies for enhancing sleep
            quality. Using cognitive-behavioral techniques, relaxation
            exercises, and sleep hygiene practices, individuals can develop
            helpful ways to manage racing thoughts and bedtime concerns.
            <Link
              class="know-more-btn"
              to={"/uniquefeature/insomniacounselling"}
            >
              Know More
              <div
                class="icon"
                ref={(el) => el && observedElements.current.push(el)}
              >
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link>
          </p>
        </div> */}
        <div id="skill5" ref={(el) => el && observedElements.current.push(el)}>
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            {" "}
            Intelligence Building Program
          </h1>
          <img src={imgArr[4]} alt="" className="mobile-view-photo" />

          <p ref={(el) => el && observedElements.current.push(el)}>
            An intelligence-building program is designed to help individuals
            enhance cognitive abilities and develop intellectual potential
            through structured activities and exercises.
            {/* <Link
              ref={(el) => el && observedElements.current.push(el)}
              class="know-more-btn"
              to={"/services/psychologicaltesting/intelligencebuildingprogram"}
            >
              Know More
              <div class="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Link> */}
          </p>
        </div>
      </div>
      <img
        ref={(el) => el && observedElements.current.push(el)}
        src={process.env.PUBLIC_URL + imgArr[index]}
        alt=""
        id="skilledimg"
        style={
          isimgonscreen
            ? { position: "fixed", top: "15vh", right: "9vw" }
            : isOnbottom
            ? { alignSelf: "flex-end" }
            : {}
        }
      />
    </div>
  );
}

export default SkilledIn;
