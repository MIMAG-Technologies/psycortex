import React, { useState } from "react";

function OneUser() {
  const [user, setuser] = useState({
    id: 3,
    name: "Aniket Raut",
    email: "rautan_1@rknec.edu",
    phoneNo: "9999999999",
    address: "Nagpur , Koradi",
    cart: '[{"id":"PSYIC1","quantity":1},{"id":"PSYGC3","quantity":4}]',
    purchasesItems: "[]",
  });
  return <div id="OneUser"></div>;
}

export default OneUser;
