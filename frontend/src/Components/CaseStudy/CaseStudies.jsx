import React, { useEffect } from "react";
import "./CaseStudy.css";
import studies from "./CaseStudy.json";
import { Link } from "react-router-dom";
function CaseStudies() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const onecasestudy = (casestudy) => {
    return (
      <Link className="onecase" to={`/casestudy/${casestudy.searchkey}`}>
        <img src={casestudy.img} alt="" />
        <h1>{`${casestudy.title.substring(0, 80)}...`}</h1>
        <p>{casestudy.by}</p>
      </Link>
    );
  };

  return (
    <div id="CaseStudies">
      <div className="casestudiescontainers">
        {studies.map((casestudy, index) => onecasestudy(casestudy))}
      </div>
    </div>
  );
}

export default CaseStudies;
