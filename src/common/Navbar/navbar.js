import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoginData } from "../../redux/loginSlice";
import { productAddtion } from "../../redux/productSlice";
import SearchBar from "../Search/search";
import "./navbar.css";
const NavigationBar = ({ navItems, heading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.signInData);

  const handleNavigation = (item) => {
    if (item === "LOGOUT") {
      navigate("/login");
      dispatch(isLoginData(false));
      dispatch(productAddtion(false))
    } else if (item === "Add Product") {
      navigate("/products");
      dispatch(productAddtion(true));
    } else if (item === "Home") {
      navigate("/products");
      dispatch(productAddtion(false));
    } else {
      navigate(`/${item}`);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar className="navbar-header">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
        <SearchBar />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button
              key={item}
              sx={{ color: "#fff" }}
              color={item === "LOGOUT" ? "error" : "none"}
              onClick={() => handleNavigation(item)}
              variant={item === "LOGOUT" && "contained"}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
