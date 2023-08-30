import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "../../common/Navbar/navbar";
import LoginForm from "../login/login";
import SignUp from "../signup/signup";
import Products from "../products/products"
import ProductDetails from "../products/productdetails";
import Protected from "../../protected";
import ProductForm from "../products/productsform";
import ConfirmOrder from "../order/confimOrder";
import SelectAddress from "../address/address";
const Home = () => {
  let isLogin = useSelector((state)=>state.login.isLogin);
  let signInData = useSelector((state)=>state.login.signInData);
  console.log(signInData);
  const navItems = isLogin && signInData.roles[0] === "ADMIN" ? ["Home", "Add Product", "LOGOUT"]:["Home", "LOGOUT"] ;
  const loginItems = ["Login", "SignUp"];
  return (
    <>
      <NavigationBar navItems={isLogin ? navItems: loginItems} heading="UpGrad E-Shop" />
      <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route exact path="/products/list" element={<Protected isLoggedIn={isLogin}><Products/></Protected>}/>
          <Route path="/products/:id"element={<Protected isLoggedIn={isLogin}><ProductDetails/></Protected>}/>
          <Route exact path="/products/edit/:id"element={<Protected isLoggedIn={isLogin}><ProductForm/></Protected>}/>
          <Route exact path="/products/add/"element={<Protected isLoggedIn={isLogin}><ProductForm/></Protected>}/>
          <Route exact path="/products/confirmOrder"element={<Protected isLoggedIn={isLogin}><ConfirmOrder/></Protected>}/>
          <Route exact path="/products/selectAddress"element={<Protected isLoggedIn={isLogin}><SelectAddress/></Protected>}/>

      </Routes>
    </>
  );
};

export default Home;
