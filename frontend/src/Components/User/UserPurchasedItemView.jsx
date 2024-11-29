import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, DollarSign, Calendar, Hash } from "lucide-react";
import axios from "axios";

const fetchUserPurchased = async () => {
  const token = localStorage.getItem("psycortexTOKEN");
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/getUserPurchasedItems`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

function UserPurchasedItemView() {
  const [purchasedItems, setPurchasedItems] = useState([]);

  const fetchItems = async () => {
    const items = await fetchUserPurchased();
    setPurchasedItems(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  const allItemsInCart = () => {
    return purchasedItems.map((item, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          marginBottom: "20px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)")
        }
      >
        <div style={{ marginBottom: "12px" }}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            <ShoppingCart size={20} style={{ marginRight: "8px" }} />
            {item.name}
          </h2>
          <p
            style={{ color: "#757575", fontSize: "14px", marginBottom: "8px" }}
          >
            {item.diffrentby}
          </p>
          <p>
            <strong>Sessions:</strong> {item.sessions}
          </p>
          <p>
            <DollarSign size={16} style={{ marginRight: "4px" }} />
            <strong>Cost/item:</strong> {item.cost}
          </p>
        </div>
        <div>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p>
            <Hash size={16} style={{ marginRight: "4px" }} />
            <strong>Transaction ID:</strong> {item.transactionId}
          </p>
          <p>
            <Calendar size={16} style={{ marginRight: "4px" }} />
            <strong>Date:</strong> {formatDate(item.date)}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        padding: "20vh 20px 20px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Your Purchased Items</title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet>
      {purchasedItems.length === 0 ? (
        <h1
          style={{
            textAlign: "center",
            color: "#757575",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          No Items to Display
        </h1>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {allItemsInCart()}
        </div>
      )}
    </div>
  );
}

export default UserPurchasedItemView;
