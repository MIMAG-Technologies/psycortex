import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Admin.css";

function AdminNavbar() {
  const path = useLocation();
  return (
    <div id="AdminNavbar">
      <nav>
        <h1>Admin Panel</h1>
        <button>Logout</button>
      </nav>
      <Outlet />
      <div className="adminMenubar">
        <Link
          className={
            path.pathname === "/admin/user-management" ? "admin-active" : ""
          }
          to={"user-management"}
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
          className={
            path.pathname === "/admin/admin-management" ? "admin-active" : ""
          }
          to={"admin-management"}
        >
          Change Password
        </Link>
        <Link
          className={path.pathname === "/admin/media" ? "admin-active" : ""}
          to={"media"}
        >
          Media
        </Link>
      </div>
    </div>
  );
}

export default AdminNavbar;
