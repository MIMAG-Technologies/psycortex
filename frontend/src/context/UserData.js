import axios from "axios";
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

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/getUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
      setisLoggedIn(false);
      localStorage.removeItem("psycortexTOKEN");
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("psycortexTOKEN");
      if (!token) {
        setisLoggedIn(false);
        return;
      }
      fetchUser(token);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("psycortexTOKEN");
    if (token) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  });

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
