import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct/AddProduct";
import CartPage from "./Components/CartPage/CartPage";
import Checkout from "./Components/Checkout/Checkout";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignInPage from "./Components/SignInPage/SignInPage";
import SingleProduct from "./Components/SingleProduct/SingleProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/CartPage" element={<CartPage />} />
      <Route path="/SignInPage" element={<SignInPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/SingleProduct/:name" element={<SingleProduct />} />
      <Route path="/Checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
