import React, { useState, useEffect } from "react";
import "./SignIn.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle, Eye, EyeOff } from "lucide-react";
import LoadingBar from "../Common Elements/LoadingBar";

function SignIn(props) {
  const [email, setemail] = useState("");
  const [currentstep, setcurrentstep] = useState(0);
  const [name, setname] = useState("");
  const [isNameOk, setisNameOk] = useState(true);
  const [otpRecived, setotpRecived] = useState(false);
  const [number, setnumber] = useState("");
  const [isValidPassword, setisValidPassword] = useState(true);
  const [isNumberOk, setisNumberOk] = useState(true);
  const [address, setaddress] = useState("");
  const [isAddressOk, setisAddressOk] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [userPassword, setuserPassword] = useState("");
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [userOTP, setuserOTP] = useState("");
  const [isValidEmail, setisValidEmail] = useState(true);
  const [isNewUser, setisNewUser] = useState(true);
  const [doesOTPmatch, setdoesOTPmatch] = useState(true);
  const navigate = useNavigate();
  const { fetchUser } = props;
  const sendOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setisValidEmail(true);
    if (emailRegex.test(email)) {
      setisLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/requestsignin`,
          { email: email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setisNewUser(true);
        setotpRecived(true);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // User already exists
          setisNewUser(false);
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

  const SubmitForm = async () => {
    const body = {
      email: email,
      name: name,
      address: address,
      password: userPassword,
      phoneNo: number,
    };
    setisLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set a value in local storage
      localStorage.setItem("psycortexTOKEN", response.data.token);
      fetchUser();
      navigate("/");
    } catch (error) {
      window.alert("Internal server Error");
    } finally {
      setisLoading(false);
    }
  };

  const checkOTP = async () => {
    // const isOTPValid = await bcrypt.compare(userOTP, hashedOTP);
    // if (isOTPValid) {
    //   setdoesOTPmatch(true);
    //   navigate("/user/signin#step1");
    // } else {
    //   setdoesOTPmatch(false);
    // }

    setisLoading(true);
    try {
      const currentDateTimeString = new Date().toString();
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/checkotp`,
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

  useEffect(() => {
    if (name.trim() === "") {
      setisNameOk(false);
    } else {
      setisNameOk(true);
    }
  }, [name]);
  useEffect(() => {
    let cleanNumber = number.replace(/\D/g, "");
    if (
      !(
        cleanNumber.length >= 10 &&
        cleanNumber.length <= 15 &&
        /^\d+$/.test(cleanNumber)
      )
    ) {
      setisNumberOk(false);
    } else {
      setisNumberOk(true);
    }
  }, [number]);
  useEffect(() => {
    if (address.trim() === "") {
      setisAddressOk(false);
    } else {
      setisAddressOk(true);
    }
  }, [address]);

  useEffect(() => {
    const token = localStorage.getItem("psycortexTOKEN");
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/fetchuser`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          navigate("/");
        } catch (error) {
          localStorage.removeItem("psycortexTOKEN");
        }
      }
    };
    fetchUser();
  }, []);

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
            <h1>Create Account </h1>
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
            {!isNewUser ? (
              <div className="user-new-email-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>
                  This address is already linked to an existing account. To
                  continue, <Link to={"/user/login"}>login</Link>.
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
            <p className="login-signin">
              Already have an Account?
              <Link to={"/user/login"}>login</Link>
            </p>
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
            <h3 className="sign-in-step-count">Step 1 of 3</h3>
            <h3 className="step-description">Create a password</h3>
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
                autoComplete="new-password"
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
              onClick={() => {
                if (isValidPassword) {
                  setcurrentstep(2);
                }
              }}
              className="sign-up-next-btn"
            >
              Next
            </a>
          </section>
        ) : (
          <></>
        )}
        {currentstep === 2 ? (
          <section id="step2">
            <div id="step2loadingbar"></div>
            <div className="totalloadingbar"></div>
            <a onClick={() => setcurrentstep(1)} className="sign-up-prev-btn">
              <ChevronLeft size={32} />
            </a>
            <h3 className="sign-in-step-count">Step 2 of 3</h3>
            <h3 className="step-description">Tell u about yourself</h3>
            <label htmlFor="sign-in-name">Name</label>
            <input
              type="text"
              name="sign-in-name"
              id="sign-in-name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            {!isNameOk ? (
              <div className="user-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>Please enter a valid name</p>
              </div>
            ) : (
              <></>
            )}
            <label htmlFor="sign-in-number">Phone Number</label>
            <input
              type="number"
              name="sign-in-number"
              id="sign-in-number"
              value={number}
              onChange={(e) => {
                setnumber(e.target.value);
              }}
            />
            {!isNumberOk ? (
              <div className="user-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>Please enter a valid Phone Number</p>
              </div>
            ) : (
              <></>
            )}
            <label htmlFor="sign-in-address">Address</label>
            <input
              type="text"
              name="sign-in-address"
              id="sign-in-address"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
            {!isAddressOk ? (
              <div className="user-warning">
                <AlertCircle size={24} strokeWidth={2.25} />
                <p>Please enter a valid Address</p>
              </div>
            ) : (
              <></>
            )}

            <a
              onClick={
                isAddressOk && isNameOk && isNumberOk
                  ? () => setcurrentstep(3)
                  : () => setcurrentstep(2)
              }
              className="sign-up-next-btn"
            >
              Next
            </a>
          </section>
        ) : (
          <></>
        )}
        {currentstep === 3 ? (
          <section id="step3">
            <div id="step3loadingbar"></div>
            <div className="totalloadingbar"></div>
            <a onClick={() => setcurrentstep(2)} className="sign-up-prev-btn">
              <ChevronLeft size={32} />
            </a>
            <h3 className="sign-in-step-count">Step 3 of 3</h3>
            <h3 className="step-description">Terms & Conditions</h3>
            <div className="term-and-conditions-checkbox">
              <input
                type="checkbox"
                name="term-and-conditions-checkbox"
                id="share-my-registration-data"
              />
              <span></span>
              <label htmlFor="share-my-registration-data">
                {" "}
                I Agree all the terms and conditions
              </label>
            </div>
            <p className="term-and-conditions-notes">
              By clicking on sign-up, you agree to Psycortex's{" "}
              <Link
                to={"/psycortex/termsandcondition"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions of Use
              </Link>
              .
            </p>
            <p className="term-and-conditions-notes">
              To learn more about how Psycortex collects, uses, shares and
              protects your personal data, please see{" "}
              <Link
                to={"/psycortex/privacypolicy"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Psycortex's Privacy Policy
              </Link>
              .
            </p>
            <a href="#" onClick={SubmitForm} className="sign-up-next-btn">
              Sign Up
            </a>
          </section>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default SignIn;
