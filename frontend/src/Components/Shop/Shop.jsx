import React, { useState, useEffect } from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Shop() {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getproducts");
        setProduct(response.data);

        // Set the default selected variant for each product
        const defaultSelectedVariants = {};
        response.data.forEach((item) => {
          defaultSelectedVariants[item.name] = item.variants[0];
        });
        setSelectedVariants(defaultSelectedVariants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleVariantChange = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [product[productIndex].name]: variant,
    }));
  };

  const oneitem = () => {
    return product.map((item, index) => (
      <div className="oneitem" key={index}>
        <Link to={`/shop/products/${index}`} className="imgtoLink">
          <img
            src={process.env.PUBLIC_URL + "/assets/Images/Shop/" + item.imgsrc}
            alt=""
          />
        </Link>
        <h1>{item.name}</h1>
        <p>
          Select{" "}
          {item.variants[0].diffrentby.includes("people")
            ? "Size:"
            : "Duration:"}
        </p>
        <div className="radio-inputs">
          {item.variants.map((variant, variantIndex) => (
            <label className="radio" key={variantIndex}>
              <input
                type="radio"
                name={item.name}
                onChange={() => handleVariantChange(index, variant)}
                checked={selectedVariants[item.name] === variant}
              />
              <span className="name">{variant.diffrentby}</span>
            </label>
          ))}
        </div>
        <p>
          Price : Rs{" "}
          {selectedVariants[item.name] ? selectedVariants[item.name].cost : ""}
        </p>
        <p>
          Number of Sessions:{" "}
          {selectedVariants[item.name]
            ? selectedVariants[item.name].sessions
            : ""}
        </p>

        <Link className="shop-know-more-btn" to={`/shop/products/${index}`}>
          Know More
        </Link>
      </div>
    ));
  };

  return (
    <div id="Shop">
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>
        {" > Shop"}
      </div>
      <div className="itemscontainer">{oneitem()}</div>
    </div>
  );
}

export default Shop;
