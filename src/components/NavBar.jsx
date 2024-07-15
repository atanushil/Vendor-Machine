import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function NavBar({
  isLoggedIn,
  setIsLoggedIn,
  menuItems,
  activeMenuItem,
  setActiveMenuItem,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      setIsHomeActive(false);
      setActiveMenuItem("Profile");
    } else if (location.pathname === "/dashboard") {
      setIsHomeActive(true);
      setActiveMenuItem("Dashboard");
    } else {
      setIsHomeActive(false);
      setActiveMenuItem("");
    }
  }, [location, setActiveMenuItem]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose();
    setActiveMenuItem(menuItems[0]?.label || "Dashboard");
  };

  const handleMenuItemClick = (label) => {
    setActiveMenuItem(label);
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
    setActiveMenuItem("Dashboard");
    setIsHomeActive(true);
  };

  const menuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem key="profile" onClick={handleProfileClick}>
            Profile
          </MenuItem>
          <MenuItem key="logout" onClick={handleLogout}>
            Log out
          </MenuItem>
        </>
      ) : null}
    </Menu>
  );

  const renderMenuItems = menuItems.map((item) => (
    <div className="mx-2" key={item.label}>
      <Button
        color="inherit"
        component={Link}
        to={item.link}
        onClick={() => handleMenuItemClick(item.label)}
        style={{
          color: activeMenuItem === item.label ? "red" : "inherit",
          background: activeMenuItem === item.label ? "blue" : "inherit",
        }}
      >
        {item.label}
      </Button>
    </div>
  ));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <p className="sm:text-4xl text-2xl">Vendor Machine</p>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleHomeClick}
                  color={isHomeActive ? "black" : "inherit"} // Change color based on state
                >
                  <HomeIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {renderMenuItems}
              </Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => alert("Log in clicked")}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </>
  );
}
