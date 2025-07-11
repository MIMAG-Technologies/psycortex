import React, { useEffect, useRef } from "react";
import { MapPin, Building, Phone, Mail, Clock } from "lucide-react";

function AllContacts() {
  const allContacts = [
    {
      City: "Pune",
      Address:
        "Block No. 234, 2nd Floor, 93 Avenue Mall, Bhagwan Tatyasaheb Kawade Road, Fatima Nagar, RSPF, Wanowrie, Pune, Maharashtra 411022.",
    },
    {
      City: "Indore",
      Address:
        "114, AB Road, Near PATEL MOTORS, Part II, Scheme No 114, Indore, Madhya Pradesh 452010",
    },
    {
      City: "Udaipur",
      Address: "Opp. Devendra Dham, Pulla Bhuwana, Udaipur, Rajasthan 313004.",
    },
    {
      City: "Hyderabad",
      Address:
        "No. 64, Inorbit Mall Road, APIIC Software Layout, Madhapur, Hyderabad, Telangana 500081.",
    },
    {
      City: "Visakhapatnam",
      Address:
        "10-2-33, GNT Road, Old Gajuwaka, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026.",
    },
    {
      City: "Guwahati",
      Address:
        "GS Road, Rajdhani Nursery, Christian Basti, Guwahati, Assam 781006.",
    },
    {
      City: "Patna",
      Address:
        "LIC Building, Fraser Road, Old Jakkanpur, Chajju Bagh, Patna, Bihar 800001.",
    },
    {
      City: "Raipur",
      Address:
        "Magneto The Mall, Beside Signature Homes 2, Jivan Vihar, Labhandih, Raipur, Chhattisgarh 492001.",
    },
    {
      City: "Bilaspur",
      Address:
        "Srikant Verma Marg, Tarbahar Chowk, Bilaspur, Chhattisgarh 495004.",
    },
    {
      City: "Panaji",
      Address: "NH 66, Alto Porvorim, Penha de Franca, Goa 403521.",
    },
    {
      City: "Gandhinagar",
      Address:
        "Swagat Holiday Mall Road, Opp. Swagat Flamingo, Sargasan, Gandhinagar, Gujarat 382421.",
    },
    {
      City: "Gurugram",
      Address:
        "NH-8, Ambience Island, DLF Phase 3, Sector 24, Gurugram, Haryana 122002.",
    },
    {
      City: "Chandigarh",
      Address:
        "DT City Centre Mall, IT Park Road, Phase-I, Sector 13, Chandigarh, Panchkula, Chandigarh 160101.",
    },
    {
      City: "Surat",
      Address: "Dumas Road, Magdalla, Surat, Gujarat 395007.",
    },
    {
      City: "Ahmedabad",
      Address:
        "Panchavati Road, Beside Kaivanna Complex, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006.",
    },
    {
      City: "Dispur",
      Address:
        "Aurus Mall, Assam Tea Warehousing Corporation, GS Road, Dispur, Sarumotoria, Guwahati, Assam 781006.",
    },
    {
      City: "Shimla",
      Address:
        "35X2+998, ISBT Tutikandi, Tutikandi, Shimla, Himachal Pradesh 171004.",
    },
    {
      City: "Ranchi",
      Address: "98GJ+VHW, Circular Road, Lalpur, Ranchi, Jharkhand 834001.",
    },
    {
      City: "Thiruvananthapuram",
      Address:
        "Lulu International Shopping Mall Pvt. Ltd, TC 91/270, Akkulam Bridge, Anayara Post, Thiruvananthapuram, Kerala 695029.",
    },
    {
      City: "Ernakulam",
      Address:
        "34/1000, Old NH 47, Edappally Junction, Nethaji Nagar, Edappally, Kochi, Ernakulam, Kerala 682024.",
    },
    {
      City: "Kota",
      Address: "DCM Road, Ramchandrapura, Dhanmandi, Kota, Rajasthan 324007.",
    },
    {
      City: "Bhopal",
      Address:
        "6CMJ+435, DB Mall Square, DB City Mall, Zone-I, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011.",
    },
    {
      City: "Imphal",
      Address:
        "RW9Q+4JW, DM College Road, Khoyathong, Thangmeiband, Imphal, Manipur 795001.",
    },
    {
      City: "Shillong",
      Address:
        "2nd Floor, Crescens Building, MG Road, Secretariat Hills, Shillong, Meghalaya 793001.",
    },
    {
      City: "Aizawl",
      Address: "Babutlang, Zarkawt, Aizawl, Mizoram 796001.",
    },
    {
      City: "Kohima",
      Address: "M4W3+7PJ, New Secretariat Road, Kohima, Nagaland 797004.",
    },
    {
      City: "Bhubaneswar",
      Address:
        "Unit No. 32, 721, Puri - Cuttack Road, Rasulgarh Industrial Estate, Industrial Area Estate, Rasulgarh, Bhubaneswar, Odisha 751010.",
    },
    {
      City: "Gangtok",
      Address:
        "Kanchanjunga Shopping Complex, New Market - Lal Market Road, Vishal Gaon, Gangtok, Sikkim 737102.",
    },
    {
      City: "Chennai",
      Address:
        "17, Pattullos Road, Express Estate, Thousand Lights, Chennai, Tamil Nadu 600002.",
    },
    {
      City: "Agartala",
      Address: "Orient Chowmuhani, Dhaleswar, Agartala, Tripura 799001.",
    },
    {
      City: "Lucknow",
      Address:
        "Kanpur Road, Sector B, Bargawan, Alambagh, Lucknow, Uttar Pradesh 226005.",
    },
    {
      City: "Dehradun",
      Address:
        "Pacific Mall, Rajpur Road, Jakhan, Dehradun, Uttarakhand 248001",
    },
    {
      City: "Kolkata",
      Address:
        "Sector 1, 1858/1, Rajdanga Main Road, East Kolkata Township, Kolkata, West Bengal 700107",
    },
    {
      City: "Mumbai",
      Address:
        "Shop No. 22, Mahakali Caves Road, Sunder Nagar, Andheri East, Mumbai, Maharashtra 400093",
    },
    {
      City: "Bangalore",
      Address:
        "World Trade Center Bengaluru. Brigade Gateway Campus 26/1, Dr. Rajkumar Road, Malleswaram, Rajajinagar, Bengaluru, Karnataka 560055",
    },
    {
      City: "Jaipur",
      Address:
        "Gandhi Path W, B Block, Vaishali Nagar,Jaipur, Rajasthan 302021",
    },
    {
      City: "Thane",
      Address:
        "Korum Mall, Eastern Express Hwy, Samata Nagar, Thane West, Thane, Maharashtra 400606",
    },
  ];

  const contactDetails = {
    Pune: { email: "care@psycortex.in", phone: "8767027078" },
    Indore: { email: "care@psycortex.in", phone: "8767027078" },
    Udaipur: { email: "care@psycortex.in", phone: "8767027078" },
    Hyderabad: { email: "care@psycortex.in", phone: "8767027078" },
    Visakhapatnam: { email: "care@psycortex.in", phone: "8767027078" },
    Guwahati: { email: "care@psycortex.in", phone: "8767027078" },
    Patna: { email: "care@psycortex.in", phone: "8767027078" },
    Raipur: { email: "care@psycortex.in", phone: "8767027078" },
    Bilaspur: { email: "care@psycortex.in", phone: "8767027078" },
    Panaji: { email: "care@psycortex.in", phone: "8767027078" },
    Gandhinagar: { email: "care@psycortex.in", phone: "8767027078" },
    Gurugram: { email: "care@psycortex.in", phone: "8767027078" },
    Chandigarh: { email: "care@psycortex.in", phone: "8767027078" },
    Surat: { email: "care@psycortex.in", phone: "8767027078" },
    Ahmedabad: { email: "care@psycortex.in", phone: "8767027078" },
    Dispur: { email: "care@psycortex.in", phone: "8767027078" },
    Shimla: { email: "care@psycortex.in", phone: "8767027078" },
    Ranchi: { email: "care@psycortex.in", phone: "8767027078" },
    Thiruvananthapuram: { email: "care@psycortex.in", phone: "8767027078" },
    Ernakulam: { email: "care@psycortex.in", phone: "8767027078" },
    Kota: { email: "care@psycortex.in", phone: "8767027078" },
    Bhopal: { email: "care@psycortex.in", phone: "8767027078" },
    Imphal: { email: "care@psycortex.in", phone: "8767027078" },
    Shillong: { email: "care@psycortex.in", phone: "8767027078" },
    Aizawl: { email: "care@psycortex.in", phone: "8767027078" },
    Kohima: { email: "care@psycortex.in", phone: "8767027078" },
    Bhubaneswar: { email: "care@psycortex.in", phone: "8767027078" },
    Gangtok: { email: "care@psycortex.in", phone: "8767027078" },
    Chennai: { email: "care@psycortex.in", phone: "8767027078" },
    Agartala: { email: "care@psycortex.in", phone: "8767027078" },
    Lucknow: { email: "care@psycortex.in", phone: "8767027078" },
    Dehradun: { email: "care@psycortex.in", phone: "8767027078" },
    Kolkata: { email: "care@psycortex.in", phone: "8767027078" },
    Mumbai: { email: "care@psycortex.in", phone: "8767027078" },
    Bangalore: { email: "care@psycortex.in", phone: "8767027078" },
    Jaipur: { email: "care@psycortex.in", phone: "8767027078" },
    Thane: { email: "care@psycortex.in", phone: "8767027078" },
  };

  // Function to get placeholder image URL with city name
  const getCityImageUrl = (city) => {
    return `/assets/Images/Branches/${city.toLowerCase()}.jpg`;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      cardRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="branches-container">
      <div className="branches-grid">
        {allContacts.map((contact, index) => {
          const details = contactDetails[contact.City] || {
            email: "care@psycortex.in",
            phone: "N/A",
          };

          return (
            <div
              key={index}
              className="branch-card"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="card-image">
                <img
                  src={getCityImageUrl(contact.City)}
                  alt={`${contact.City} branch`}
                />
              </div>

              <div className="card-content">
                <div className="card-title">
                  <Building size={20} />
                  <h2>{contact.City}</h2>
                </div>

                <div className="card-contact-details">
                  <div className="card-address">
                    <MapPin size={16} />
                    <p>{contact.Address}</p>
                  </div>

                  <div className="card-contact-info">
                    <div
                      className="contact-item"
                      style={{
                        flexWrap: "wrap",
                      }}
                    >
                      <Mail size={16} />
                      <span>Customer Care:</span>
                      <a
                        href={`mailto:${details.email}`}
                        className="contact-link"
                      >
                        {details.email}
                      </a>
                    </div>

                    <div className="contact-item">
                      <Phone size={16} />
                      <span>Customer Care No. :</span>
                      <a href={`tel:${details.phone}`} className="contact-link">
                        {details.phone}
                      </a>
                    </div>

                    <div className="contact-item">
                      <Clock size={16} />
                      <span className="timing">10 AM - 6 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllContacts;
