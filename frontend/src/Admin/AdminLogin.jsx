import React, { useState } from "react";
import axios from "axios";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAnyProblem, setIsAnyProblem] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    const userObj = {
      username: userEmail,
      password: userPassword,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/adminlogin`,
        userObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Set token immediately after successful response
      localStorage.setItem("psycortexAdminTOKEN", response.data.token);

      // Navigate to admin page
      navigate("/admin");

      // Reset any previous error state
      setIsAnyProblem(false);
    } catch (error) {
      console.log(error);
      setIsAnyProblem(true);
    }
  };

  return (
    <div id="login">
      <form onSubmit={submitForm}>
        <h1>Psycortex Login for Admin</h1>

        {isAnyProblem && (
          <div id="user-warning">
            <AlertCircle size={24} strokeWidth={2.25} />
            <p>Oops! Something went wrong, please try again later!</p>
          </div>
        )}

        <section id="login-form">
          <label htmlFor="login-user-email-id">Username</label>
          <input
            type="text"
            name="login-user-email-id"
            id="login-user-email-id"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <div id="login-passwordcontainer">
            <label htmlFor="login-user-password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="login-user-password"
              id="login-user-password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
            <div
              id="login-password-visibility"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <Eye /> : <EyeOff />}
            </div>
          </div>

          <button type="submit" className="login-next-btn">
            Login
          </button>
        </section>
      </form>
    </div>
  );
}

export default AdminLogin;
