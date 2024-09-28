import React, { useState, useEffect } from "react";
import "./LogIn.css";
import axios from "axios";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function LogIn(props) {
  const [userEmail, setuserEmail] = useState("");
  const [response, setresponse] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [isAnyProblem, setisAnyProblem] = useState(false);
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = props;

  const submitForm = async () => {
    const userObj = {
      email: userEmail,
      password: userPassword,
    };
    try {
      setresponse(
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          userObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      );
      localStorage.setItem("psycortexTOKEN", response.data.token);
      fetchUser();
      navigate("/");
      setisAnyProblem(false);
    } catch (error) {
      console.log(error);
      setisAnyProblem(true);
    }
  };
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

  return (
    <div id="login">
      <Helmet>
        <title>
          Login to Psycortex - Comprehensive Mental Health Solutions
        </title>
        <meta
          name="description"
          content="Explore comprehensive mental health services at Psycortex. Offering expert guidance and tailored solutions for mental well-being."
        />
      </Helmet>
      <form action="post">
        <h1>Login to Psycortex</h1>
        {isAnyProblem ? (
          <div id="user-warning">
            <AlertCircle size={24} strokeWidth={2.25} />
            <p>Oops! Something went wrong, please try again later!</p>
          </div>
        ) : (
          <></>
        )}
        <section id="login-form">
          <label htmlFor="login-user-email-id">Email</label>
          <input
            type="email"
            name="login-user-email-id"
            id="login-user-email-id"
            value={userEmail}
            onChange={(e) => {
              setuserEmail(e.target.value);
            }}
          />
          <div id="login-passwordcontainer">
            <label htmlFor="login-user-password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="login-user-password"
              id="login-user-password"
              value={userPassword}
              onChange={(e) => {
                setuserPassword(e.target.value);
              }}
            />
            <div
              id="login-password-visibility"
              onClick={() => {
                setisPasswordVisible(!isPasswordVisible);
              }}
            >
              {isPasswordVisible ? <Eye /> : <EyeOff />}
            </div>
          </div>
          <a className="login-next-btn" onClick={submitForm}>
            Login
          </a>
          <Link to={"/user/forgotpassword"} className="forgotpassword">
            Forgot Password?
          </Link>
          <p className="login-signin">
            Don't have an Account? <Link to={"/user/signin"}>Sign in</Link>
          </p>
        </section>
      </form>
    </div>
  );
}

export default LogIn;
