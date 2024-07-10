import React, { useEffect } from "react";
import $ from "jquery";

const PaymentButton = () => {
  useEffect(() => {
    // Function to load the external script dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Function to initialize the payment button logic
    const initializePaymentButton = () => {
      if (!window.pnCheckout || !window.pnCheckoutShared) {
        console.error("Required objects are not available.");
        return;
      }

      function hashData(algo, data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);

        return crypto.subtle.digest(algo, dataBuffer).then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
        });
      }

      async function handleResponse(res) {
        if (
          typeof res !== "undefined" &&
          typeof res.paymentMethod !== "undefined" &&
          typeof res.paymentMethod.paymentTransaction !== "undefined" &&
          typeof res.paymentMethod.paymentTransaction.statusCode !==
            "undefined" &&
          res.paymentMethod.paymentTransaction.statusCode === "0300"
        ) {
          alert("success");
          // success code
        } else {
          alert("Error");
          // error code
        }
      }

      async function getToken() {
        const algo = "SHA-512";
        const data =
          "T955031|TXN1140|4||c12345|9999999999|test@gmail.com||||||||||1025180466GPADTD";
        return await hashData(algo, data);
      }

      $("#btnSubmit").on("click", async (e) => {
        e.preventDefault();
        const token = await getToken();

        const configJson = {
          tarCall: false,
          features: {
            enableAbortResponse: true,
            enableExpressPay: true,
            enableInstrumentDeRegistration: true,
            enableMerTxnDetails: true,
          },
          consumerData: {
            deviceId: "WEBSH2", // possible values 'WEBSH1', 'WEBSH2' and 'WEBMD5'
            token: token,
            returnUrl:
              "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",
            responseHandler: handleResponse,
            paymentMode: "all",
            merchantLogoUrl:
              "https://www.paynimo.com/CompanyDocs/company-logo-md.png", // provided merchant logo will be displayed
            merchantId: "T955031",
            consumerId: "c12345",
            consumerMobileNo: "9999999999",
            consumerEmailId: "test@gmail.com",
            txnId: "TXN1140", // Unique merchant transaction ID
            items: [
              {
                itemId: "first",
                amount: "4",
                comAmt: "0",
              },
            ],
            customStyle: {
              PRIMARY_COLOR_CODE: "#3977b7",
              SECONDARY_COLOR_CODE: "#FFFFFF",
              BUTTON_COLOR_CODE_1: "#1969bb",
              BUTTON_COLOR_CODE_2: "#FFFFFF",
            },
          },
        };

        $.pnCheckout(configJson);
        if (configJson.features.enableNewWindowFlow) {
          window.pnCheckoutShared.openNewWindow();
        }
      });
    };

    // Load the external script and initialize the payment button
    loadScript("https://www.paynimo.com/Paynimocheckout/server/lib/checkout.js")
      .then(() => {
        console.log("Checkout script loaded successfully.");
        initializePaymentButton();
      })
      .catch((error) => {
        console.error("Error loading the checkout script.", error);
      });

    return () => {
      $("#btnSubmit").off("click");
      const script = document.querySelector(
        'script[src="https://www.paynimo.com/Paynimocheckout/server/lib/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <button id="btnSubmit">Make a Payment</button>
    </div>
  );
};

export default PaymentButton;
