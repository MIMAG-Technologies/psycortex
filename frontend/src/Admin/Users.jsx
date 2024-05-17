import { Link } from "react-router-dom";
import React, { useState } from "react";

function Users() {
  const [query, setquery] = useState("");
  const [users, setusers] = useState([
    {
      id: 2,
      name: "Monarch Sukla",
      email: "monarchshukla@gmail.com",
      phoneNo: "9999999999",
      address: "Nagpur",
      cart: '[{"id":"PSYIC1","quantity":2}]',
      purchasesItems: "[]",
    },
    {
      id: 3,
      name: "Aniket Raut",
      email: "rautan_1@rknec.edu",
      phoneNo: "9999999999",
      address: "Nagpur , Koradi",
      cart: '[{"id":"PSYIC1","quantity":1},{"id":"PSYGC3","quantity":4}]',
      purchasesItems: "[]",
    },
  ]);

  const oneUser = () => {
    return users.map((user, index) => {
      return (
        <div class="admin-userview-card" key={index}>
          <div class="admin-userview-card-details">
            <p class="admin-userview-text-title">{user.name}</p>
            <p class="admin-userview-text-body">{user.email}</p>
            <p class="admin-userview-text-body">{user.phoneNo}</p>
            <p class="admin-userview-text-body">
              Item Purchased:
              {JSON.stringify(JSON.parse(user.purchasesItems).length)}
            </p>
          </div>
          <Link class="admin-userview-card-button">More info</Link>
        </div>
      );
    });
  };
  return (
    <>
      <div className="search-div">
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div id="AdminViewUsers">{oneUser()}</div>;
    </>
  );
}

export default Users;
