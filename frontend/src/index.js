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
        domain={process.env.REACT_APP_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
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
