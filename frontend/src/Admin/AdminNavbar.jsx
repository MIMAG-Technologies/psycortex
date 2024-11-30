import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";
import ChangePassword from "./Forms/ChangePassword";

function AdminNavbar() {
  const path = useLocation();
  const navigate = useNavigate();
  const [isChangePassVisisble, setisChangePassVisisble] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("psycortexAdminTOKEN"); // Change the key to remove the correct token
    navigate("/");
  };

  return (
    <div id="AdminNavbar">
      <nav>
        <h1>Admin Panel</h1>
        <button onClick={() => setisChangePassVisisble(!isChangePassVisisble)}>
          Change Password
        </button>
        {isChangePassVisisble ? (
          <ChangePassword
            isChangePassVisisble={isChangePassVisisble}
            setisChangePassVisisble={setisChangePassVisisble}
          />
        ) : (
          <></>
        )}
        <button onClick={handleLogout}>Logout</button>{" "}
      </nav>
      <Outlet />
      <div className="adminMenubar">
        <Link
          className={path.pathname === "/admin" ? "admin-active" : ""}
          to={""}
        >
          Users
        </Link>
        <Link
          className={
            path.pathname === "/admin/product-management" ? "admin-active" : ""
          }
          to={"product-management"}
        >
          Products
        </Link>
        <Link
          className={path.pathname === "/admin/contact" ? "admin-active" : ""}
          to={"contact"}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

export default AdminNavbar;
