import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [userEmail, setuserEmail] = useState("");
  const [response, setresponse] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [isAnyProblem, setisAnyProblem] = useState(false);
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const submitForm = async () => {
    const userObj = {
      username: userEmail,
      password: userPassword,
    };
    try {
      setresponse(
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/adminlogin`,
          userObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      );
      localStorage.setItem("psycortexAdminTOKEN", response.data.token);
      navigate("/admin");
      setisAnyProblem(false);
    } catch (error) {
      console.log(error);
      setisAnyProblem(true);
    }
  };

  return (
    <div id="login">
      <form action="post">
        <h1>Psycortex Login for Psycortex</h1>
        {isAnyProblem ? (
          <div id="user-warning">
            <AlertCircle size={24} strokeWidth={2.25} />
            <p>Oops! Something went wrong, please try again later!</p>
          </div>
        ) : (
          <></>
        )}
        <section id="login-form">
          <label htmlFor="login-user-email-id">Username</label>
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
        </section>
      </form>
    </div>
  );
}

export default AdminLogin;
