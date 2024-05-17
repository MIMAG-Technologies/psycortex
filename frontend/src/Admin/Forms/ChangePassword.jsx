import React, { useState } from "react";
import axios from "axios"; // Add axios import

function ChangePassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("psycortexAdminTOKEN");
    if (token) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/admin/passwordChange`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Password Succesfully Updated !");
        props.setisChangePassVisisble(!props.isChangePassVisisble);
        // Password changed successfully, do something if needed
      } catch (error) {
        console.error("Error changing password:", error);
        alert("Please Check Your Password!");
      }
    }
  };

  return (
    <div className="AdminForms">
      <form onSubmit={handleSubmit}>
        <span
          id="x-mark"
          onClick={() =>
            props.setisChangePassVisisble(!props.isChangePassVisisble)
          }
        >
          X
        </span>

        <label htmlFor="">Old Password</label>
        <input
          type="text"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="">New Password</label>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit"> Change Password </button>
      </form>
    </div>
  );
}

export default ChangePassword;
