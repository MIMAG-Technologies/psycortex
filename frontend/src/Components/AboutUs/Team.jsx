import React, { useEffect } from "react";

function Team() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const members = [
    {
      name: "DR. VIJAY DWIVEDI",
      role: "Managing Director | Psycortex Pvt. Ltd.",
      src: "/assets/Images/AboutUs/DirectorsMessage/dr. dwivedi.jpeg",
    },
    {
      name: "DR. RASHMI SHUKLA",
      role: "Director | Psycortex Pvt. Ltd.",
      src: "/assets/Images/AboutUs/DirectorsMessage/drshukla.jpeg",
    },
  ];

  const oneMember = (member) => {
    return members.map((member, index) => (
      <div className="onemember">
        <img src={process.env.PUBLIC_URL + member.src} alt="" />{" "}
        <div>
          <h2>{member.name}</h2>
          <p>{member.role}</p>
        </div>
      </div>
    ));
  };
  return (
    <div id="Team">
      <div className="breadcrumb">{" About Us > Team"} </div>
      <div id="teamdiv">{oneMember()}</div>
    </div>
  );
}

export default Team;
