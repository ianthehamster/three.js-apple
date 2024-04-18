import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import SingleProductPage from "./components/products/SingleProductPage.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import PaymentSuccessPage from "./components/checkout/PaymentSuccessPage.jsx";
import CartPage from "./components/cart/CartPage.jsx";
import CheckoutPage from "./components/checkout/CheckoutPage.jsx";
import OrdersHistoryPage from "./components/orders/OrdersHistoryPage.jsx";
import ProductsPage from "./components/products/ProductsPage.jsx";

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
            <Route path="/:categoryName" element={<ProductsPage />} />
            <Route
              path="/products/:productId"
              element={<SingleProductPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/order/success" element={<PaymentSuccessPage />} />
            <Route path="/my-orders" element={<OrdersHistoryPage />} />
            <Route path="*" element={"Nothing here!"} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
