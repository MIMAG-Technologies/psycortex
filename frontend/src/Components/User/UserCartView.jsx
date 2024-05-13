import axios from "axios";
import React, { useEffect, useState } from "react";

function UserCartView(props) {
  const { fetchUser } = props;
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("psycortexTOKEN");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getUserCart`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
      calculateGrandTotal();
    } catch (error) {
      alert("Internal Server Error fail to Load Cart!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCart = async (productId, quantity) => {
    const token = localStorage.getItem("psycortexTOKEN");
    if (token) {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/updatecart`,
          {
            productId: productId,
            quantity: quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Cart Updated Succesfully !");
        fetchCart();
        fetchUser();
        calculateGrandTotal();
      } catch (error) {
        console.log(error);
        alert("Internal Server Error! Please try again after some time.");
      }
    } else {
      alert("Please login to access these services.");
    }
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 0) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
    }
  };

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
  };

  const calculateGrandTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += parseInt(item.cost.replace(/,/g, "")) * item.quantity;
    });
    setGrandTotal(total);
  };

  const calculateTotal = (item) => {
    const cost = parseInt(item.cost.replace(/,/g, "")); // Remove commas and parse to integer
    const total = item.quantity * cost;
    return total.toLocaleString(); // Return total as a string with proper comma formatting
  };

  const allItemsInCart = () => {
    return cart.map((item, index) => (
      <div className="oneCartItem" key={index}>
        <div>
          <h1>{item.name}</h1>
          <p>{item.diffrentby}</p>
          <p>No of Sessions: {item.sessions}</p>
          <p>Cost/item : {item.cost}</p>
        </div>
        <div>
          <div id="Quantifier">
            <span onClick={() => decrementQuantity(index)}>
              <i className="fa-solid fa-minus"></i>
            </span>
            <span>{item.quantity}</span>
            <span onClick={() => incrementQuantity(index)}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          <button
            className="editcartbtn"
            onClick={() => updateCart(item.productId, item.quantity)}
          >
            <i className="fa-solid fa-cart-arrow-down"></i> Update Cart
          </button>
        </div>
        <div>
          <p
            style={{
              fontWeight: "bolder",
            }}
          >
            Total : {calculateTotal(item)}
          </p>
        </div>
      </div>
    ));
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="UserCartView">
        <h1>Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="UserCartView">
      {allItemsInCart()}
      <span>
        <h1>Grand Total: Rs {grandTotal.toLocaleString()}</h1>
        <div class="check-out-container">
          <div class="check-out-left-side">
            <div class="check-out-card">
              <div class="check-out-card-line"></div>
              <div class="check-out-buttons"></div>
            </div>
            <div class="check-out-post">
              <div class="check-out-post-line"></div>
              <div class="check-out-screen">
                <div class="check-out-dollar">$</div>
              </div>
              <div class="check-out-numbers"></div>
              <div class="check-out-numbers-line2"></div>
            </div>
          </div>
          <div class="check-out-right-side">
            <div class="check-out-new">Checkout</div>
          </div>
        </div>
      </span>
    </div>
  );
}

export default UserCartView;
