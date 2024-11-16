import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

import LoadingBar from "../Common Elements/LoadingBar";

function OneProductPage(props) {
  const { fetchUser } = props;
  const [quantity, setquantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { pid } = useParams();
  const [products, setproducts] = useState({});

  const [allproducts, setallproducts] = useState([]);

  const addtocart = async () => {
    const token = localStorage.getItem("psycortexTOKEN");
    if (token) {
      try {
        setisLoading(true);
        const res = axios.put(
          `${process.env.REACT_APP_API_URL}/additemtocart`,
          {
            productId: selectedVariants.productId,
            quantity: quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product Added to Cart!");
        setquantity(1);
        fetchUser();
      } catch (error) {
        console.log(error);
        alert("Internal Server Error ! Please try again After Some time");
      } finally {
        setisLoading(false);
      }
    } else {
      alert("Please Login to Access these services.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const responce = await axios.get(
        //   `${process.env.REACT_APP_API_URL}/getproducts`
        // );
        // setallproducts(responce.data);
        // console.log(responce.data);
        setallproducts([
          {
            name: "Individual Counselling",
            imgsrc: "individualCounselling.jpg",
            description:
              "# Psycortex Individual Counselling Services\n\nAt Psycortex, we offer individual counselling services designed to provide personalized support and guidance to help you navigate life's challenges with confidence and clarity. Our experienced counsellors create a safe and non-judgmental space where you can explore your feelings, thoughts, and concerns in a supportive environment.\n\n## What to Expect\n\n1. **Personalized Approach:** Our counsellors understand that each individual is unique, so we tailor our approach to meet your specific needs and goals.\n\n2. **Confidentiality:** Your privacy is our priority. We adhere to strict confidentiality guidelines to ensure your comfort and trust throughout the counselling process.\n\n3. **Emotional Support:** Whether you're dealing with anxiety, depression, relationship issues, or simply seeking personal growth, our counsellors provide empathetic support to help you navigate your emotions.\n\n4. **Skill Development:** We equip you with practical tools and techniques to manage stress, improve communication, and enhance coping strategies.\n\n5. **Goal Setting:** Together, we establish achievable goals that align with your aspirations and empower you to make positive changes in your life.\n\n## Our Approach\n\n- **Cognitive Behavioral Therapy (CBT):** We often use CBT techniques to identify and modify unhelpful thought patterns and behaviors.\n\n- **Mindfulness Practices:** Integrating mindfulness can cultivate greater self-awareness and emotional regulation.\n\n- **Person-Centered Therapy:** Our counselling sessions are client-centered, focusing on your unique needs and perspectives.\n\n## Who Can Benefit\n\n- **Individuals Seeking Growth:** Whether you're looking to enhance personal development or gain clarity on life decisions, our counselling can support your journey.\n\n- **Mental Health Support:** From managing symptoms of anxiety and depression to coping with trauma, we offer professional guidance and strategies.\n\n- **Relationship Challenges:** Our counsellors provide insights and tools to navigate relationship difficulties, fostering healthier connections.\n\n## Why Psycortex\n\n- **Professional Expertise:** Our counsellors are trained professionals with extensive experience in individual therapy.\n\n- **Compassionate Care:** We prioritize empathy, respect, and understanding in every session.\n\n- **Flexible Scheduling:** We offer convenient appointment times to accommodate your schedule.\n\nTake the first step towards personal growth and emotional well-being. Contact Psycortex today to schedule an individual counselling session tailored to your needs. Let us support you on your journey towards a happier and more fulfilling life.",
            variants: [
              {
                productId: "PSYIC1",
                diffrentby: "3 months",
                sessions: "12",
                cost: "60,000",
              },
              {
                productId: "PSYIC2",
                diffrentby: "6 months",
                sessions: "24",
                cost: "1,20,000",
              },
              {
                productId: "PSYIC3",
                diffrentby: "12 months",
                sessions: "48",
                cost: "2,40,000",
              },
            ],
          },
          {
            name: "Group Counselling",
            imgsrc: "groupCounselling.jpg",
            description:
              "# Psycortex Group Counselling Service\n\nDiscover Psycortex's expert-led Group Counselling service for corporations seeking to enhance employee well-being and team dynamics. Our innovative program is designed to foster a supportive environment where employees can openly address challenges, build resilience, and strengthen interpersonal skills.\n\n## Key Features\n\n- **Customized Sessions:** Tailored to address specific corporate challenges and goals.\n- **Experienced Facilitators:** Led by certified psychologists skilled in corporate psychology.\n- **Interactive Workshops:** Engaging activities and discussions to promote team bonding.\n- **Confidential Environment:** Ensures privacy and trust for participants.\n- **Holistic Approach:** Integrates mental health insights with corporate culture.\n\n## Benefits\n\n- **Improved Team Communication:** Enhance workplace relationships and communication skills.\n- **Stress Reduction:** Equip employees with strategies to manage stress effectively.\n- **Boosted Morale:** Foster a positive and supportive work atmosphere.\n- **Increased Productivity:** Addressing mental health issues can positively impact performance.\n\nWhether your aim is to improve employee morale, address workplace conflicts, or promote mental well-being, Psycortex's Group Counselling service offers a comprehensive solution. Contact us today to discover how our corporate counselling can benefit your organization.",
            variants: [
              {
                productId: "PSYGC1",
                diffrentby: "50 people",
                sessions: "1",
                cost: "2,50,000",
              },
              {
                productId: "PSYGC2",
                diffrentby: "100 people",
                sessions: "1",
                cost: "5,00,000",
              },
              {
                productId: "PSYGC3",
                diffrentby: "200 people",
                sessions: "1",
                cost: "10,00,000",
              },
            ],
          },
          {
            name: "Test Product",
            imgsrc: "groupCounselling.jpg",
            description:
              "# Test Product\n\nThis is a test product designed to demonstrate functionality. The product is available with a single variant and is priced affordably for testing purposes.\n\n## Features\n\n1. **Simple Setup:** Easy to integrate into your product catalog.\n2. **Affordable Price:** Perfect for testing purposes.\n3. **Single Variant:** Streamlined configuration for simplicity.\n\nTake this test product for a spin and explore how your system handles it effectively.",
            variants: [
              {
                productId: "TEST01",
                diffrentby: "Single Variant",
                sessions: "1",
                cost: "200",
              },
            ],
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const product = allproducts[parseInt(pid)];
    if (product) {
      setproducts(product);
      setSelectedVariants(product.variants[0]); // Set default selected variant
    }
  }, [pid, allproducts]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };
  const incrementQuantity = () => {
    setquantity(quantity + 1);
  };
  const handleVariantChange = (variant) => {
    setSelectedVariants(variant);
  };
  return (
    <div className="CounsellingProduct">
      {isLoading ? <LoadingBar /> : <></>}
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>
        {` > Shop > ${products.name}`}
      </div>
      <div className="mainProduct">
        <img
          src={
            process.env.PUBLIC_URL + "/assets/Images/Shop/" + products.imgsrc
          }
          alt=""
        />
        <div className="details">
          <h1>{products.name}</h1>
          <h2>Rs {selectedVariants.cost}</h2>
          <div className="CartBtns">
            <div id="Quantifier">
              <span onClick={decrementQuantity}>
                <i className="fa-solid fa-minus"></i>
              </span>
              <span>{quantity}</span>
              <span onClick={incrementQuantity}>
                <i className="fa-solid fa-plus"></i>
              </span>
            </div>
            <i
              className="fa-solid fa-repeat"
              style={{
                marginRight: "2em",
              }}
              onClick={() => {
                setquantity(1);
              }}
            >
              {" "}
            </i>
            <button type="button" className="shopbutton" onClick={addtocart}>
              <span className="shopbutton__text">Add to Cart</span>
              <span className="shopbutton__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
          <div>
            {products.variants && ( // Add conditional rendering here
              <div className="radio-inputs">
                {products.variants.map((variant, variantIndex) => (
                  <label className="radio" key={variantIndex}>
                    <input
                      type="radio"
                      name={products.name}
                      onChange={() => handleVariantChange(variant)}
                    />
                    <span className="name">{variant.diffrentby}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <p>No of Sessions: {selectedVariants.sessions}</p>
          </div>
        </div>
        <h1>Description</h1>
        <p>
          <Markdown>{products.description}</Markdown>
        </p>
      </div>
    </div>
  );
}

export default OneProductPage;
