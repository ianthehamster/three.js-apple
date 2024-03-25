import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import Categories from "./components/Categories.jsx";
import LaptopsProductPage from "./components/productLists/LaptopsProductPage.jsx";
import PhonesProductPage from "./components/productLists/PhonesProductPage.jsx";
import AccessoriesProductPage from "./components/productLists/AccessoriesProductPage.jsx";
import TabletsProductPage from "./components/productLists/TabletsProductPage.jsx";
import AboutUs from "./components/AboutUs.jsx";
import SingleProductPage from "./components/SingleProductPage.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope:
          "read:current_user update:current_user_metadata openid profile email read:user_metadata",
      }}
    >
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/laptopPage" element={<LaptopsProductPage />} />
            <Route path="/phonesPage" element={<PhonesProductPage />} />
            <Route
              path="/accessoriesPage"
              element={<AccessoriesProductPage />}
            />
            <Route path="/tabletsPage" element={<TabletsProductPage />} />
            <Route
              path="/products/:productId"
              element={<SingleProductPage />}
            />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="*" element={"Nothing here!"} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
