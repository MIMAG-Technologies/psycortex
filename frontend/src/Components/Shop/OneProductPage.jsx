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
        const responce = await axios.get(
          `${process.env.REACT_APP_API_URL}/getproducts`
        );
        setallproducts(responce.data);
        console.log(responce.data);
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
