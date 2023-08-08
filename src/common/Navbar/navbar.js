import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/search";
import "./navbar.css";
const NavigationBar = ({ navItems, heading }) => {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    navigate(`/${item}`);
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
              onClick={() => handleNavigation(item)}
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
