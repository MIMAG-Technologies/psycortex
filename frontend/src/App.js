import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common Elements/Footer";
import Navbar from "./Components/Common Elements/Navbar";
import MobileNavbar from "./Components/Common Elements/MobileNavbar";
import UniqueFeature from "./Components/Unique Features/UniqueFeature";
import Services from "./Components/Services/Services.jsx";
import Testimonials from "./Components/Testimonials/Testimonials.jsx";
import Contact from "./Components/Contact Us/Contact.jsx";
import Team from "./Components/AboutUs/Team.jsx";
import DirectorsMessage from "./Components/AboutUs/DirectorsMessage.jsx";
import MissionVissionValues from "./Components/AboutUs/MissionVissionValues.jsx";
import Awards from "./Components/AboutUs/Awards.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Blog from "./Components/Blogs/Blog.jsx";
import CaseStudies from "./Components/CaseStudy/CaseStudies.jsx";
import CaseStudytemplate from "./Components/CaseStudy/CaseStudytemplate.jsx";
import PolicyTemplate from "./Components/Policy/PolicyTemplate.jsx";
import Franchise from "./Components/Common Elements/Franchise.jsx";
import Booking from "./Components/Contact Us/Booking.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <MobileNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus/team" element={<Team />} />
        <Route
          path="/aboutus/directorsmessage"
          element={<DirectorsMessage />}
        />
        <Route
          path="/aboutus/missionvisionandvalues"
          element={<MissionVissionValues />}
        />
        <Route path="/aboutus/awards" element={<Awards />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:section" element={<Blog />} />
        <Route path="/psycortex/:section" element={<PolicyTemplate />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        <Route path="/casestudy/:section" element={<CaseStudytemplate />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/aboutus/offices" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/uniquefeature/:section" element={<UniqueFeature />} />
        <Route path="/services/:section/:subsection" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
