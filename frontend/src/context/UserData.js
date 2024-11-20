import React, { createContext, useEffect, useState } from "react";

// Create a Context
export const UserDataContext = createContext();

// Context Provider Component
export const UserDataProvider = ({ children }) => {
  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    companyName: "",
    purchasesItems: [],
    address: {
      country: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  // Cart data state
  const [cartData, setCartData] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartData(storedCartData);
  }, []);
  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        cartData,
        setCartData,
        isLoggedIn,
        setisLoggedIn,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
