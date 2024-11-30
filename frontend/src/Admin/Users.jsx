import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserRound, Mail, Earth, ShoppingBag } from "lucide-react";

function Users() {
  const [query, setquery] = useState("");
  const [users, setusers] = useState([
    { "_id": "6745f7671aba984a57132873", "name": "fsfsfs", "email": "ddsds", "purchasesItemsCount": 0, "country": "fsds" },
    { "_id": "6745f8151aba984a57132883", "name": "Aniket", "email": "rautan_1@rknec.edu", "purchasesItemsCount": 5, "country": "India" },
    { "_id": "674608c489e04c2bf4a9b075", "name": "Ultra Factechz", "email": "rautnaniket@gmail.com", "purchasesItemsCount": 1, "country": "India" },
    { "_id": "67474eb7a273eda5ed1ea75b", "name": "Aniket Raut", "email": "rautnaniket@outlook.com", "purchasesItemsCount": 0, "country": "" }
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("psycortexAdminTOKEN");
      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/fetchUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setusers(res.data.data);
      setFilteredUsers(res.data.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setquery(searchValue);

    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      )
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="search-div">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search users..."
        />
      </div>
      <div className="users-grid">
        <div className="grid-header">
          <span
           
          > Sr.No</span>
          <span><UserRound /> Name</span>
          <span><Mail /> Email</span>
          <span><Earth /> Country</span>
          <span><ShoppingBag /> Items Purchased</span>
          <span>Actions</span>
        </div>
        {filteredUsers.map((user,index) => (
          <div className="grid-row" key={user._id}>
            <span 
            style={{
              backgroundColor:"#fafafa",
              height:"100%",
             
            }}
            >{index + 1}</span>  {/* For numbering the users */}
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.country || "Not Specified"}</span>
            <span>{user.purchasesItemsCount}</span>
            <span>
              <Link to={`userTransaction/${user._id}`} className="view-btn">View Transactions</Link>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
