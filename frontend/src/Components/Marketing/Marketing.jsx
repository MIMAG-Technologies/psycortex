import React from 'react'
import "./Marketing.css";
import WhytoChoose from './Sections/WhytoChoose';
import FAQ from './Sections/FAQ';
import Landing from './Sections/Landing';
import NewTestimonials from './Sections/Testimonials';

export default function Marketing() {
  return <div className="Marketing">
    <Landing/>
    <WhytoChoose/>
    <NewTestimonials/>
    <FAQ/>
  </div>;
}
