import React, { createContext, useEffect, useState } from "react";

// Create a Context
export const UserDataContext = createContext();

// Context Provider Component
export const UserDataProvider = ({ children }) => {
  // User data state
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : {
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
        };
  });

  // Cart data state
  const [cartData, setCartData] = useState(() => {
    return JSON.parse(localStorage.getItem("cartData")) || [];
  });

  const [isLoggedIn, setisLoggedIn] = useState(false);
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
