import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Usercart.css";
import { UserDataContext } from "../../context/UserData";

function UserCard(props) {
  const { setisUserCardVisible } = props;
  const navi = useNavigate();
  const { userData, setisLoggedIn } = useContext(UserDataContext);
  const handleLogout = () => {
    localStorage.removeItem("psycortexTOKEN");
    setisLoggedIn(false);
    setisUserCardVisible(false);

    navi("/");
    window.location.reload();
  };

  return (
    <div
      className="UserCardWrapper"
      onClick={() => {
        setisUserCardVisible(false);
      }}
    >
      <div id="UserCard">
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
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
    </div>
  );
}

export default UserCard;
