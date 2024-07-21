import React from "react";
import { Link } from "react-router-dom";
import "./Usercart.css";

function UserCard(props) {
  const { user, setisUserCardVisible, fetchUser } = props;

  const handleLogout = () => {
    localStorage.removeItem("psycortexTOKEN");
    fetchUser();
    setisUserCardVisible(false);
    window.location.reload();
  };

  return (
    <div id="UserCard">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link
        to={"/user/mycart"}
        onClick={() => {
          setisUserCardVisible(false);
        }}
      >
        <i className="fa-solid fa-cart-arrow-down"></i>View Cart
      </Link>
      <Link
        to={"/user/mypurchaseditems"}
        onClick={() => {
          setisUserCardVisible(false);
        }}
      >
        {" "}
        <i className="fa-solid fa-bag-shopping"></i> Purchased Items
      </Link>
      <Link id="logout" to={"/"} onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>LogOut
      </Link>
    </div>
  );
}

export default UserCard;
