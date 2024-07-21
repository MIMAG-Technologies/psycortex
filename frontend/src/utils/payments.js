// import axios from "axios";

$(document).ready(function () {
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
  const complete = async () => {
    const token = localStorage.getItem("psycortexTOKEN");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/transaction/complete`,
        {
          token: localStorage.getItem("transactionToken"),
          transactionState: "success",
          transactionIdentifier: res?.paymentTransaction?.identifier,
          dateTime: Date.now(),
          errorMessage: res?.paymentTransaction?.statusMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      alert("Something Went Wrong!");
    }
  };

  async function handleResponse(res) {
    if (
      typeof res != "undefined" &&
      typeof res.paymentMethod != "undefined" &&
      typeof res.paymentMethod.paymentTransaction != "undefined" &&
      typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" &&
      res.paymentMethod.paymentTransaction.statusCode == "0300"
    ) {
      // await complete();
      alert("success");
      console.log(res);
      return false;
      // success code
    } else {
      // await complete();
      alert("Error");
      console.log(res);
      return false;
      // error code
    }
  }

  async function getToken() {
    const algo = "SHA-512"; //sha256, sha512, md5
    const data =
      "T955031|TXN1140|4||c12345|9999999999|test@gmail.com||||||||||1025180466GPADTD";
    return await hashData(algo, data);
  }

  $(document)
    .off("click", "#btnSubmit")
    .on("click", "#btnSubmit", async function (e) {
      e.preventDefault();
      const token = await getToken();

      var configJson = {
        tarCall: false,
        features: {
          enableAbortResponse: true,
          enableExpressPay: true,
          enableInstrumentDeRegistration: true,
          enableMerTxnDetails: true,
          enableNewWindowFlow: true,
        },
        consumerData: {
          deviceId: "WEBSH2", //possible values 'WEBSH1', 'WEBSH2' and 'WEBMD5'
          token: token,
          responseHandler: handleResponse,
          paymentMode: "all",
          merchantLogoUrl:
            "https://psycortex.in/assets/Images/thebraintakeLogo.png", //provided merchant logo will be displayed
          merchantId: "T955031",
          consumerId: "c12345",
          consumerMobileNo: "9999999999",
          consumerEmailId: "test@gmail.com",
          txnId: "TXN1140", //Unique merchant transaction ID
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
        pnCheckoutShared.openNewWindow();
      }
    });
});
