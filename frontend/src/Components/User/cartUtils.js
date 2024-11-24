// cartUtils.js
import axios from "axios";

export const getProductIds = (array) => {
  let productIds = [];
  array.forEach((item) => {
    const oneProduct = {
      productId: item.productId,
      quantity: item.quantity,
    };
    productIds.push(JSON.stringify(oneProduct));
  });
  return productIds;
};

export const fetchCart = async (setCart, calculateGrandTotal) => {
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
    console.error(error);
  }
};
export const fetchUserPurchased = async () => {
  const token = localStorage.getItem("psycortexTOKEN");
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getUserPurchased`,
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

export const updateCart = (
  productId,
  cartData,
  setCartData,
  quantity,
  calculateGrandTotal
) => {
  const updatedCart = cartData.map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  setCartData(updatedCart);
  calculateGrandTotal();
};

export const updateUser = async (user, fetchUser) => {
  const token = localStorage.getItem("psycortexTOKEN");
  const { cart, purchasesItems, ...userWithoutCartAndPurchases } = user;
  if (token) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/user/updateuser`,
        userWithoutCartAndPurchases,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User Updated Succesfully");
      fetchUser();
      return true;
    } catch (error) {
      console.log(error);
      alert("Internal Server Error! Please try again after some time.");
      return false;
    }
  } else {
    alert("Please login to access these services.");
    return false;
  }
};

export const decrementQuantity = (cart, setCart, index) => {
  const updatedCart = [...cart];
  if (updatedCart[index].quantity > 0) {
    updatedCart[index].quantity--;
    setCart(updatedCart);
  }
};

export const incrementQuantity = (cart, setCart, index) => {
  const updatedCart = [...cart];
  updatedCart[index].quantity++;
  setCart(updatedCart);
};

export const calculateGrandTotal = (cart, setGrandTotal) => {
  let total = 0;
  cart.forEach((item) => {
    total += parseInt(item.cost.replace(/,/g, "")) * item.quantity;
  });
  setGrandTotal(total);
};

export const calculateTotal = (item) => {
  const cost = parseInt(item.cost.replace(/,/g, ""));
  const total = item.quantity * cost;
  return total.toLocaleString();
};

export const initiateTransaction = async (
  data,
  setisLoading,
  setconfirmcard,
  grandTotal
) => {
  setisLoading(true);
  const token = localStorage.getItem("psycortexTOKEN");
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction/initiate`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const transactionToken = res.data.token;
    localStorage.setItem("transactionToken", transactionToken);
    localStorage.setItem("transactionPaymentAmount", grandTotal);
    setconfirmcard(true);
  } catch (error) {
    alert("Something Went Wrong!");
  } finally {
    setisLoading(false);
  }
};
