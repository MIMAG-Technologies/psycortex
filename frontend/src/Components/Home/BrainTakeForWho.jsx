import React, { useState, useEffect, useRef } from "react";
import v1 from "./Videos/psycortexfor1.mp4";

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
    'Neuropsychiatric disorders in children encompass a broad spectrum, spanning from developmental conditions like ADHD, Autistic Spectrum Disorder, and Epilepsy to acquired ones such as Anxiety, Depression, and post Head Injury conditions. Our integrative "Beyond Medication" approach ensures comprehensive care for the affected child and family, facilitating restoration, rehabilitation, and rejuvenation, marking a new chapter.',
    "Neuropsychiatric disorders in adolescents may unveil previously unrecognized conditions like Attention Deficit Disorder or Socialization Disorder. They might also manifest as temperamental changes linked to life transitions from childhood to adulthood, or reactions to environmental stressors such as academic pressure or bullying. Anxiety, mood swings, and turbulent relationships often result from these challenges.",
    "Neuropsychiatric disorders in adults can stem from both biological factors and various psychosocial influences. Adults grappling with neurological conditions such as epilepsy, head injuries, brain tumors, and movement disorders often experience challenges related to memory, mood, and anxiety. Concurrently, mental health issues like anxiety disorders, bipolar disorder, depression, obsessive-compulsive disorder, and schizophrenia present distinct mental health needs in adulthood.",
    "Neuropsychiatric disorders among the elderly frequently stem from degenerative brain conditions such as Alzheimer's dementia, Parkinson's disease, and various movement disorders. Additionally, progressive cerebrovascular disease often results in minor strokes that disrupt brain pathways. Mental health issues can also manifest in seniors due to declining health, disability, bereavement, and social isolation.",
  ];
  const p2Arr = [
    "Family caregivers of children facing these challenges require support and guidance, along with a structured plan, all of which are integral components of our care process. Additionally, Psycortex collaborates with the child's educational institution, whether it be a school, special school, junior college, or vocational center, to promote the holistic development of the affected child.",
    "At Psycortex, our comprehensive care approach extends beyond medication to cater to adolescents' distinct bio-psycho-social requirements, equipping them for the journey ahead. Additionally, our innovative utilization of multiple intelligences and positive psychology empowers young individuals by offering clarity regarding higher education and future career paths.",
    "In the nexus between these realms lie patients encountering unexplained medical symptoms, fibromyalgia, chronic pain, and similar conditions, seeking solutions that remain elusive. Our holistic care approach transcends mere medication, aiming to restore everyday activities and enhance overall life quality for individuals facing these complex challenges.",
    "Memory loss, mood disorders, anxiety, and progressive neurological decline commonly accompany the aging brain. Our interdisciplinary approach transcends conventional medicine, blending modern scientific advancements with ancient wisdom. This allows us to craft personalized plans tailored to each patient's unique needs, ensuring comprehensive care and holistic support.",
  ];
  const imgArr = [
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor4.mp4`,
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor3.mp4`,
    `${process.env.PUBLIC_URL}/assets/Videos/Home/psycortexfor2.mp4`,
    v1,
  ];
  const extLinkArr = ["#", "#", "#", "#"];

  // useEffect(() => {
  //   const video = document.getElementById("videoPlayer");
  //   video.play();
  // }, [index]);

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
          preload
          playsInline
        >
          <source src={imgArr[index]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default BrainTakeForWho;
