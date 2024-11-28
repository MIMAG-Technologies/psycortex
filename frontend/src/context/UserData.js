import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { encrypt } from "../utils/cryptoUtils";

// Create a Context
export const UserDataContext = createContext();

// Context Provider Component
export const UserDataProvider = ({ children }) => {
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
  const [cartData, setCartData] = useState(() => {
    const storedCartData = localStorage.getItem("cartData");
    return storedCartData
      ? JSON.parse(storedCartData)
      :[]
  });


  const { isAuthenticated, user, isLoading } = useAuth0();
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // Fetch user from the server using token
  const fetchUser = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/getUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.data);
      setisLoggedIn(true);
    } catch (error) {
      console.error("Fetch user failed:", error.message);
      localStorage.removeItem("psycortexTOKEN");
      setisLoggedIn(false);
    }
  };

  // Handle OAuth Login
const handleOAuthLogin = async () => {
  try {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // Validate if user data exists
    if (!user || !user.name || !user.email) {
      throw new Error("Invalid user data provided.");
    }

    const data = { name: user.name, email: user.email };

    // Encrypt user data
    const encryptedData = encrypt(JSON.stringify(data), encryptionKey);

    // Send encrypted data to the backend
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/googleLogin`,
      { encryptedData }
    );

    // Handle backend response
    if (res.data.success) {
      const token = res.data.token;

      // Save token and fetch user info
      localStorage.setItem("psycortexTOKEN", token);
      await fetchUser(token);
    } else {
      console.error("OAuth login error:", res.data.error);
      setisLoggedIn(false);
    }
  } catch (error) {
    console.error("OAuth login failed:", error.message);
    setisLoggedIn(false);
  }
};


  // Check authentication status
  const checkAuthentication = async () => {
    const token = localStorage.getItem("psycortexTOKEN");

    if (token) {
      await fetchUser(token);
    } else if (!isLoading && isAuthenticated && user) {
      await handleOAuthLogin();
    } else {
      setisLoggedIn(false);
    }
  };

  useEffect(() => {
localStorage.setItem("cartData", JSON.stringify(cartData))
  }, [cartData])
  

  // Run authentication check on mount and updates
  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated, isLoading, user]);

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
