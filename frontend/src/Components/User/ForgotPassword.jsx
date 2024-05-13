import React, { useState, useEffect } from "react";
import "./SignIn.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle, Eye, EyeOff } from "lucide-react";
import LoadingBar from "../Common Elements/LoadingBar";

function ForgotPassword() {
  const [email, setemail] = useState("");
  const [currentstep, setcurrentstep] = useState(0);
  const [otpRecived, setotpRecived] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userPassword, setuserPassword] = useState("");
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [userOTP, setuserOTP] = useState("");
  const [isValidEmail, setisValidEmail] = useState(true);
  const [isValidPassword, setisValidPassword] = useState(true);
  const [isNewUser, setisNewUser] = useState(false);
  const [doesOTPmatch, setdoesOTPmatch] = useState(true);
  const navigate = useNavigate();
  const sendOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setisValidEmail(true);
    if (emailRegex.test(email)) {
      setisLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/forgotpassword",
          { email: email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setisNewUser(false);
        setotpRecived(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // User already exists
          setisNewUser(true);
        } else {
          // Internal server error or backend not reachable
          window.alert("Internal Server Error, Please try again later");
        }
      } finally {
        setisLoading(false);
      }
    } else {
      setisValidEmail(false);
    }
  };

  const checkOTP = async () => {
    setisLoading(true);
    try {
      const currentDateTimeString = new Date().toString();
      const res = await axios.post(
        "http://localhost:8080/auth/checkotp",
        {
          otp: userOTP,
          email: email,
          datetime: currentDateTimeString,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setdoesOTPmatch(true);
      setcurrentstep(1);
    } catch (error) {
      setdoesOTPmatch(false);
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const changepassword = async () => {
    setisLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:8080/auth/changepassword",
        { email, newPassword: userPassword }
      );
      if (response.data.message === "Password changed successfully") {
        alert("Password Changed Successfully!");
        navigate("/user/login");
      }
    } catch (error) {
      alert("There is some error, please try again");
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setuserPassword(e.target.value);
    setisValidPassword(userPassword.length >= 8 && userPassword.trim() !== "");
  };
  return (
    <div id="signin">
      {isLoading ? <LoadingBar /> : <></>}
      <form>
        {currentstep === 0 ? (
          <section id="step0">
            <h1>Find Your Account</h1>
            <label htmlFor="user-email-id">Email address</label>
            <input
              type="email"
              name="user-email-id"
              id="user-email-id"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            {!isValidEmail ? (
              <div className="user-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>
                  This email is invalid. Make sure it's written like
                  example@email.com
                </p>
              </div>
            ) : (
              <></>
            )}
            {isNewUser ? (
              <div className="user-new-email-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>
                  Account don't exists , instead create a account{" "}
                  <Link to={"/user/signin"}>signin</Link>.
                </p>
              </div>
            ) : (
              <></>
            )}
            {otpRecived ? (
              <>
                <label htmlFor="user-otp">Enter OTP</label>
                <input
                  type="text"
                  id="user-otp"
                  value={userOTP}
                  onChange={(e) => {
                    setuserOTP(e.target.value);
                  }}
                />
                {!doesOTPmatch ? (
                  <div className="user-new-email-warning">
                    <AlertCircle size={24} strokeWidth={2.25} />
                    <p>OTP Doesn't Matching!!</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <a
              className="sign-up-next-btn"
              onClick={otpRecived ? checkOTP : sendOTP}
            >
              {otpRecived ? "Verify OTP" : " Send OPT"}
            </a>
          </section>
        ) : (
          <></>
        )}
        {currentstep === 1 ? (
          <section id="step1">
            <div id="step1loadingbar"></div>
            <a onClick={() => setcurrentstep(0)} className="sign-up-prev-btn">
              <ChevronLeft size={32} />
            </a>
            <div className="totalloadingbar"></div>
            <h3 className="sign-in-step-count">Step 2 of 2</h3>
            <h3 className="step-description">Change Password</h3>
            <label htmlFor="sign-in-password">Password</label>
            <div id="password-input-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="sign-in-password"
                id="sign-in-password"
                value={userPassword}
                onChange={handlePasswordChange}
                style={
                  !isValidPassword ? { border: "2px solid #f15e6c" } : null
                }
              />

              <div
                id="password-visibility"
                onClick={() => {
                  setisPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? <Eye /> : <EyeOff />}
              </div>

              {!isValidPassword ? (
                <div className="user-warning">
                  <AlertCircle size={24} strokeWidth={2.25} />
                  <p>Password should contain at least 8 characters.</p>
                </div>
              ) : (
                <></>
              )}
              <p className="steps-field-description">
                The password must contain at least 8 characters. We recommend
                including at least 1 number and 1 special character.
              </p>
            </div>
            <a
              onClick={isValidPassword ? changepassword : () => {}}
              className="sign-up-next-btn"
            >
              Change Password
            </a>
          </section>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
