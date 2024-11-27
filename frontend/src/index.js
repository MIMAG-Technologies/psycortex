import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { HelmetProvider } from "react-helmet-async";
import { UserDataProvider } from "./context/UserData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider
        domain="dev-u2zo0e7rnl1l7r1p.us.auth0.com"
        clientId="Tx87L1xQ3Hj8x699Q7pEcFW61ViwAwXq"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <BrowserRouter>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </BrowserRouter>
      </Auth0Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
