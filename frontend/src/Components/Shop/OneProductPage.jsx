import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

import LoadingBar from "../Common Elements/LoadingBar";
import { UserDataContext } from "../../context/UserData";

function OneProductPage(props) {
  const { fetchUser } = props;
  const [quantity, setquantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { pid } = useParams();
  const [products, setproducts] = useState({});

  const [allproducts, setallproducts] = useState([]);
  const { setCartData } = useContext(UserDataContext);

  const addtocart = async () => {
    try {
      // Fetch the cart data from local storage (if available)
      const existingCart = JSON.parse(localStorage.getItem("cartData")) || [];

      // Prepare the cart item with all details
      const cartItem = {
        productId: products._id,
        name: products.name,
        differentby: selectedVariants.diffrentby, // Variant specific property
        sessions: selectedVariants.sessions, // Variant specific property
        cost: selectedVariants.cost, // Variant specific property
        quantity, // Current selected quantity
      };

      // Check if the product is already in the cart
      const productIndex = existingCart.findIndex(
        (item) =>
          item.productId === products._id &&
          item.differentby === selectedVariants.diffrentby
      );

      if (productIndex !== -1) {
        // Update quantity if the product with the same variant already exists
        existingCart[productIndex].quantity += quantity;
      } else {
        // Add a new product to the cart
        existingCart.push(cartItem);
      }

      // Update the cart in context
      setCartData(existingCart);

      // Store the updated cart in local storage
      localStorage.setItem("cartData", JSON.stringify(existingCart));

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responce = await axios.get(
          `${process.env.REACT_APP_API_URL}/product/${pid}`
        );
        setproducts(responce.data.data);
        setSelectedVariants(responce.data.data.variants[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
