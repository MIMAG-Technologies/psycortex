import React, { useEffect, useState, useRef, useContext } from "react";
import { ShoppingCart, User, CreditCard, MapPin } from "lucide-react";
import "./OrderDetails.css"; // Importing the CSS file
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../context/UserData";

function OrderDetails() {
  const [userData, setUserData] = useState({});
  const [cartData, setcartdata] = useState([]);
      const { setCartData } = useContext(UserDataContext);
  const [transactionData, setTransactionData] = useState({});
  const invoiceRef = useRef();
  const { txdId } = useParams(); 

useEffect(() => {
  if (txdId) {
    // Fetch and parse necessary data
    const UserData = JSON.parse(localStorage.getItem("userData") || "{}");
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    // Initialize state
    setUserData(UserData);
    setcartdata(cartData);

    // Function to handle both transaction and email
    const initializeTransaction = async () => {
      try {
        // Avoid duplicate transaction calls
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/make-transaction`,
          { UserData, ProductData: cartData, txnId: atob(txdId) }
        );
        setTransactionData(response.data.data);

        // Check and send email if necessary
        if (
          localStorage.getItem("EmailSent") !== txdId &&
          UserData.email &&
          response.data.data.transactionState === "success"
        ) {
          const htmlContent = invoiceRef.current.innerHTML;
          await axios.post(
            `${process.env.REACT_APP_API_URL}/make-transaction/sendEmail`,
            { email: UserData.email, htmlContent }
          );
          console.log("Email sent successfully.");
          localStorage.setItem("EmailSent", txdId);
        } else {
          console.log("Email already sent or user email unavailable.");
        }
        
      } catch (error) {
        console.error(
          "Error initializing transaction or sending email:",
          error
        );
      }
    };

    // Execute the transaction
    initializeTransaction();

    // Clear localStorage and context
    localStorage.removeItem("cartData");
    setCartData([]);
    localStorage.removeItem("GrandTotal");
  }
}, [txdId]);





const printInvoice = () => {
  const printContents = invoiceRef.current.innerHTML;
  const printWindow = window.open("", "", "width=900,height=600");


  const style = `
    <style>
      body *{
        margin: 0%;
      }
         @media print {
        body {
          margin: 0;
        }
        .content-wrapper {
          transform: scale(0.95); /* Scale content to 80% */
          transform-origin: top left; /* Set the scale origin */
           width: 105.26%;
        }
      }
    </style>
  `;

  printWindow.document.write(
    `<html>
      <head>
        <title>Invoice</title>
        ${style}
      </head>
      <body>
        <div class="content-wrapper">
          ${printContents}
        </div>
      </body>
    </html>`
  );

  printWindow.document.close();
  printWindow.print();
};


  const calculateSubtotal = () => {
    return cartData.reduce(
      (acc, item) =>
        acc + parseInt(item.cost.replace(/,/g, ""), 10) * item.quantity,
      0
    );
  };

  return (
    <div
      style={{
        marginTop: "18vh",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    
    >
      <div
        ref={invoiceRef}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#c1c1c1",
            color: "black",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "20px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="https://psycortex.in/assets/Images/thebraintakeLogo.png"
              alt="Company Logo"
              style={{ width: "80px" }}
            />
            <div style={{ textAlign: "left" }}>
              <h4 style={{ margin: 0 }}>Psycortex Pvt. Limited</h4>
              <p style={{ margin: 0 }}>
                Block no. 101/102, 2nd floor, Shriram Tower, Sadar,
                Nagpur-440001, Maharashtra
              </p>
            </div>
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "28px",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            Invoice
          </h2>
        </header>
        <div style={{ padding: "20px" }}>
          {/* User Details Section */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <User style={{ marginRight: "10px" }} /> Customer Details
            </h3>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phoneNo}
            </p>
          </section>

          {/* Billing Address Section */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <MapPin style={{ marginRight: "10px" }} /> Billing Address
            </h3>
            <p>
              <strong>Street:</strong> {userData.address?.streetAddress}
            </p>
            <p>
              <strong>Apartment:</strong> {userData.address?.apartment}
            </p>
            <p>
              <strong>City:</strong> {userData.address?.city},{" "}
              {userData.address?.state}
            </p>
            <p>
              <strong>Country:</strong> {userData.address?.country}
            </p>
            <p>
              <strong>Pin Code:</strong> {userData.address?.pinCode}
            </p>
          </section>

          {/* Order Table */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <ShoppingCart style={{ marginRight: "10px" }} /> Order Details
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "right",
                      }}
                    >
                      ₹
                      {parseInt(item.cost.replace(/,/g, ""), 10) *
                        item.quantity}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    <strong>Subtotal:</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    ₹{calculateSubtotal()}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    <strong>Payment Mode:</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    Online Payment
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "rgb(85, 26, 139)",
                    }}
                  >
                    Total:
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "rgb(85, 26, 139)",
                    }}
                  >
                    ₹{transactionData.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Transaction Summary */}
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              <CreditCard style={{ marginRight: "10px" }} /> Transaction Summary
            </h3>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {transactionData.transactionIdentifier}
            </p>
            <p>
              <strong>Amount:</strong> ₹{transactionData.amount}
            </p>
            <p>
              <strong>Transaction Status:</strong>{" "}
              {transactionData.transactionState}
            </p>
          </section>
        </div>
        <div
          style={{
            padding: "0px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            paddingBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Thanks for the Purchase
          </h3>
          <p>
            Please read all the terms and conditions carefully before making
            your payment.
          </p>

          <p>
            ● You are eligible to apply for cancellation within 7 days of
            purchase.
          </p>
          <p>● No chargeback will be entertained after 7 days of payment.</p>
          <p>
            ● Within 10 days of your purchase, you will receive an email kindly
            acknowledge your purchase.
          </p>

          <p>
            Kindly proceed with the payment only after reviewing our terms and
            conditions.
          </p>
          <a href="https://psycortex.in/">psycortex.in</a>
        </div>
      </div>

      <button
        style={{
          display: "block",
          margin: "40px auto 0",
          padding: "10px 20px",
          backgroundColor: "rgb(85, 26, 139)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={printInvoice}
      >
        Print Invoice
      </button>
    </div>
  );
}

export default OrderDetails;
