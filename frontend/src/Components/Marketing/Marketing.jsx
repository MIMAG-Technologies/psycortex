import React from 'react'
import "./Marketing.css";
import WhytoChoose from './Sections/WhytoChoose';
import FAQ from './Sections/FAQ';

export default function Marketing() {
  return <div className="Marketing">
    <WhytoChoose/>
    <FAQ/>
  </div>;
}
