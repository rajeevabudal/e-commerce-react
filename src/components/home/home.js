import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "../../common/Navbar/navbar";
import LoginForm from "../login/login";
import SignUp from "../signup/signup";
import Products from "../products/products"
const Home = () => {
  const navItems = ["Home", "Add Product", "LOGOUT"];
  const loginItems = ["Login", "SignUp"];
  let isLogin = false;
  return (
    <>
      <NavigationBar navItems={isLogin ? navItems: loginItems} heading="UpGrad E-Shop" />
      <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/products" element={<Products/>}/>
      </Routes>
    </>
  );
};

export default Home;
