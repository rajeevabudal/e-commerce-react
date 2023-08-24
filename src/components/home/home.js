import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "../../common/Navbar/navbar";
import LoginForm from "../login/login";
import SignUp from "../signup/signup";
import Products from "../products/products"
import ProductDetails from "../products/productdetails";
import Protected from "../../protected";
const Home = () => {
  let isLogin = useSelector((state)=>state.login.isLogin);
  let signInData = useSelector((state)=>state.login.signInData);

  const navItems = isLogin && signInData.role[0].authority === "ADMIN" ? ["Home", "Add Product", "LOGOUT"]:["Home", "LOGOUT"] ;
  const loginItems = ["Login", "SignUp"];
  return (
    <>
      <NavigationBar navItems={isLogin ? navItems: loginItems} heading="UpGrad E-Shop" />
      <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/products" element={<Protected isLoggedIn={isLogin}><Products/></Protected>}/>
          <Route path="/products/:id"element={<Protected isLoggedIn={isLogin}><ProductDetails/></Protected>}/>
      </Routes>
    </>
  );
};

export default Home;
