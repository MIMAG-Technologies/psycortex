import React, { useState, useEffect, useRef } from "react";
function BrainTakeForWho() {
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
  const titleArr = [
    "Psycortex for Children",
    "Psycortex for Adolescents",
    "Psycortex for Adults",
    "Psycortex for Elders",
  ];
  const p1Arr = [
    "Neuropsychiatric disorders in children include developmental conditions such as ADHD, Autism Spectrum Disorder, and Epilepsy, as well as acquired issues like Anxiety, Depression, and those following head injuries. At Psycortex, our integrative “Beyond Medication” approach offers comprehensive care focused on healing, rehabilitation, and renewal—for both the child and their family.",
    "Neuropsychiatric disorders in adolescents may reveal conditions like ADHD or socialization disorders, often triggered by life transitions or stressors such as academic pressure or bullying. These challenges can lead to anxiety, mood swings, and unstable relationships.",
    "Neuropsychiatric disorders in adults arise from both biological and psychosocial factors. Conditions like epilepsy, head injuries, brain tumors, and movement disorders can lead to memory, mood, and anxiety issues. Mental illnesses such as anxiety, bipolar disorder, depression, OCD, and schizophrenia also present unique challenges",
    "Neuropsychiatric disorders in the elderly often arise from degenerative brain conditions like Alzheimer’s, Parkinson’s, and cerebrovascular disease. These may lead to strokes, memory loss, mood issues, anxiety, and overall cognitive decline. Contributing factors include poor health, disability, grief, and social isolation.",
  ];
  const p2Arr = [
    "Recognizing the vital role of caregivers, we provide structured guidance and support tailored to their needs. We also collaborate closely with the child’s educational setting—be it a mainstream school, special school, junior college, or vocational center—to foster holistic growth and development",
    "At Psycortex, we go beyond medication, addressing adolescents' unique bio-psycho-social needs. Our use of multiple intelligences and positive psychology also helps guide them toward clarity in education and career choices.",
    "Many adults also face unexplained symptoms, chronic pain, and fibromyalgia, often without clear solutions. Our holistic care goes beyond medication, focusing on restoring daily functioning and improving overall quality of life.",
    "Our interdisciplinary approach combines modern science with ancient wisdom to create personalized, holistic care plans that meet each patient's unique needs.",
  ];
  const imgArr = [
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor4.mp4`,
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor3.mp4`,
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor2.mp4`,
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor1.mp4`,
  ];

  return (
    <div id="BrainTakeForWho">
      <div
        className="btfw-navbae"
        ref={(el) => el && observedElements.current.push(el)}
      >
        <span
          onClick={() => {
            setindex(0);
          }}
          style={index === 0 ? { borderTopColor: "#501a77" } : {}}
        >
          {window.innerWidth > 500 ? "Psycortex for " : ""}
          Children
        </span>
        <span
          onClick={() => {
            setindex(1);
          }}
          style={index === 1 ? { borderTopColor: "#501a77" } : {}}
        >
          {window.innerWidth > 500 ? "Psycortex for " : ""} Adolescents
        </span>
        <span
          onClick={() => {
            setindex(2);
          }}
          style={index === 2 ? { borderTopColor: "#501a77" } : {}}
        >
          {window.innerWidth > 500 ? "Psycortex for " : ""} Adults
        </span>
        <span
          onClick={() => {
            setindex(3);
          }}
          style={index === 3 ? { borderTopColor: "#501a77" } : {}}
        >
          {window.innerWidth > 500 ? "Psycortex for " : ""} Elders
        </span>
      </div>
      <div className="btfw-infotab">
        <div>
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            {titleArr[index]}
          </h1>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {p1Arr[index]}
          </p>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {p2Arr[index]}
          </p>
        </div>
        <video
          ref={(el) => el && observedElements.current.push(el)}
          key={index}
          id="videoPlayer"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={imgArr[index]}
            type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default BrainTakeForWho;
