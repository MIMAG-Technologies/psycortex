import React, { useState, useEffect, useContext } from "react";
import "./LogIn.css";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBar from "../Common Elements/LoadingBar";
import { UserDataContext } from "../../context/UserData";
import { useAuth0 } from "@auth0/auth0-react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [hashedOTP, setHashedOTP] = useState("");
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [timer, setTimer] = useState(45); // Timer for 45 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();
  const { setisLoggedIn } = useContext(UserDataContext);
  const { loginWithRedirect } = useAuth0();

  // Effect to handle timer countdown
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it hits 0
    }

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [isTimerActive, timer]);

  const sendOTP = async () => {
    setisLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setHashedOTP(response.data.hashedOTP);
        setIsOTPRequested(true);
        setError("");
        setTimer(45); // Reset timer to 45 seconds on new OTP request
        setIsTimerActive(true); // Start the timer
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  const resendOTP = async () => {
    setTimer(45); // Reset timer for resend
    setIsTimerActive(true); // Start the timer again
    sendOTP(); // Send OTP again
  };

  const verifyOTP = async () => {
    setisLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/checkOTP`,
        { email, otp, hashedOTP },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        localStorage.setItem("psycortexTOKEN", response.data.token);
        setisLoggedIn(true);
        navigate("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div id="login">
      {isLoading && <LoadingBar />}
      <Helmet>
        <title>
          Login to Psycortex - Comprehensive Mental Health Solutions
        </title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet>
      <form>
        <h1>Login to Psycortex</h1>
        {error && (
          <div id="user-warning">
            <AlertCircle size={24} strokeWidth={2.25} />
            <p>{error}</p>
          </div>
        )}

        <section id="login-form">
          <label htmlFor="login-user-email-id">Email</label>
          <input
            type="email"
            name="login-user-email-id"
            id="login-user-email-id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isOTPRequested && (
            <>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}

          <button
            type="button"
            className="login-next-btn"
            onClick={isOTPRequested ? verifyOTP : sendOTP}
          >
            {isOTPRequested ? "Verify OTP" : "Send OTP"}
          </button>

          {/* Resend OTP link appears after timer ends */}
          {isOTPRequested && !isTimerActive && (
            <p>
              <button
                className="login-next-btn"
                type="button"
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </p>
          )}

          {/* Timer display */}
          {isTimerActive && <p>Resend OTP in: {timer}s</p>}
        </section>
        <>
          <div className="separatorggl">
            <hr className="lineggl" />
            <span>Or</span>
            <hr className="lineggl" />
          </div>
          <button
            onClick={() => loginWithRedirect()}
            title="Sign In"
            className="login-next-btn2"
          >
            <i className="fa-brands fa-google"></i>
            <span>Sign In with Google</span>
          </button>
          <button
            onClick={() => loginWithRedirect()}
            title="Sign In"
            className="login-next-btn2"
          >
            <i className="fa-brands fa-microsoft"></i>
            <span>Sign In with Microsoft</span>
          </button>
        </>
      </form>
    </div>
  );
}

export default LogIn;
