import React, { useState, useEffect, useRef } from "react";

function Stats() {
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(0);
  const finalStat1 = 10000;
  const finalStat2 = 8000;
  const finalStat3 = 10;

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const interval = setInterval(() => {
          setStat1((prevCount) => {
            if (prevCount >= finalStat1) {
              clearInterval(interval);
              return finalStat1;
            }
            return prevCount + finalStat1 / 1000;
          });

          setStat2((prevCount) => {
            if (prevCount >= finalStat2) {
              clearInterval(interval);
              return finalStat2;
            }
            return prevCount + finalStat2 / 1000;
          });

          setStat3((prevCount) => {
            if (prevCount >= finalStat3) {
              clearInterval(interval);
              return finalStat3;
            }
            return prevCount + finalStat3 / 1000;
          });
        }, 1);

        // Clean up the interval when the component unmounts or the section goes out of viewport
        return () => {
          clearInterval(interval);
          if (statsRef.current) {
            observer.unobserve(statsRef.current);
          }
        };
      }
    });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [finalStat1, finalStat2, finalStat3]);
  return (
    <div id="Stats">
      <h1>
        Psycortex has helped thousands of people in spite of a mental health
        challenge.
      </h1>
      <div id="stats-cards" ref={statsRef}>
        <div>
          <h1>{Math.floor(stat1)}+</h1>
          <h2>Total Client Served</h2>
        </div>

        <div>
          <h1>{Math.floor(stat3)}+</h1>
          <h2>Experienced Doctors</h2>
        </div>
        <div>
          <h1>{Math.floor(stat2)}+</h1>
          <h2>Satisfied Members</h2>
        </div>
      </div>
    </div>
  );
}

export default Stats;
