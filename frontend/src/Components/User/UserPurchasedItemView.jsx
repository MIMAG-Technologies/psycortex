import React, { useEffect, useState } from "react";
import { fetchUserPurchased } from "./cartUtils";

function UserPurchasedItemView(props) {
  const [purchasedItems, setpurchasedItems] = useState([]);
  const fetchitems = async () => {
    setpurchasedItems(await fetchUserPurchased());
  };
  useEffect(() => {
    fetchitems();
  }, []);
  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, options);
  };
  const allItemsInCart = () => {
    return purchasedItems.map((item, index) => (
      <div className="oneCartItem" key={index}>
        <div>
          <h1>{item.name}</h1>
          <p>{item.diffrentby}</p>
          <p>
            {" "}
            <strong style={{ fontWeight: "bold" }}>
              {" "}
              No of Sessions:
            </strong>{" "}
            {item.sessions}
          </p>
          <p>
            <strong style={{ fontWeight: "bold" }}> Cost/item:</strong>{" "}
            {item.cost}
          </p>
        </div>
        <div>
          <p>
            {" "}
            <strong style={{ fontWeight: "bold" }}> Quantity :</strong>{" "}
            {item.quantity}
          </p>
          <p>
            <strong style={{ fontWeight: "bold" }}>Transaction Id:</strong>{" "}
            {item.transactionId}
          </p>
          <p>
            <strong style={{ fontWeight: "bold" }}> Date: </strong>{" "}
            {formatDate(item.date)}
          </p>
        </div>
      </div>
    ));
  };
  if (!purchasedItems || purchasedItems.length === 0) {
    return (
      <div className="UserCartView">
        <h1>No Item to Display</h1>
      </div>
    );
  }
  return <div className="UserCartView">{allItemsInCart()}</div>;
}

export default UserPurchasedItemView;
