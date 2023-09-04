import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoginData } from "../../redux/loginSlice";
import {
  productAddtion,
  productEdit,
  getProductDetails,
  getSearchValue,
  isSearch,
  getSearchedDetails,
} from "../../redux/productSlice";
import SearchBar from "../Search/search";
import "./navbar.css";
const NavigationBar = ({ navItems, heading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const loginData = useSelector((state) => state.login.signInData);
  const prodData = useSelector((state) => state.product.prodData);
  React.useEffect(() => {

  }, []);
  const handleNavigation = (item) => {
    if (item === "LOGOUT") {
      navigate("/login");
      dispatch(isLoginData(false));
      dispatch(productAddtion(false));
      dispatch(productEdit(false));
    } else if (item === "Add Product") {
      navigate("/products/add");
      dispatch(productAddtion(true));
      dispatch(productEdit(false));
    } else if (item === "Home") {
      navigate("/products/list");
      dispatch(productAddtion(false));
      dispatch(productEdit(false));
    } else {
      navigate(`/${item}`);
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    console.log(prodData)
    let unSearchedData = [...prodData];
    console.log(unSearchedData);
    let resEarched = unSearchedData.filter((data) =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    console.log(resEarched);
    dispatch(getSearchedDetails(resEarched));
    dispatch(isSearch(true))
    dispatch(getSearchValue(searchValue));
    setSearchValue(e.target.value);

  };

  const handleKeyPressSearch = () => {
    // let unSearchedData = [...prodData];

    // let resEarched = unSearchedData.filter((data) =>
    //   data.name.toLowerCase().includes(searchValue.toLowerCase())
    // );

    // console.log(resEarched);
    // dispatch(getProductDetails(resEarched));
    // dispatch(isSearch(true))
    // dispatch(getSearchValue(searchValue));
    
  };
  return (
    <AppBar position="static">
      <Toolbar className="navbar-header">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
        <SearchBar
          onChange={(e) => handleSearch(e)}
          searchText={searchValue}
          onKeyPress={handleKeyPressSearch}
        />
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
