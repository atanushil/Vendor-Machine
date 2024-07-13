import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ isLoggedIn, setIsLoggedIn, menuItems, activeMenuItem, setActiveMenuItem }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (label) => {
    setActiveMenuItem(label);
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
        [
          <MenuItem key="profile" onClick={handleProfileClick}>Profile</MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>Log out</MenuItem>
        ]
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

  const renderMobileMenuItems = menuItems.map((item) => (
    <ListItem
      button
      key={item.label}
      component={Link}
      to={item.link}
      onClick={() => { handleMenuItemClick(item.label); setDrawerOpen(!drawerOpen) }}
      sx={{
        color: activeMenuItem === item.label ? "red" : "inherit",
        background: activeMenuItem === item.label ? "blue" : "inherit",
      }}
    >
      <ListItemText primary={item.label} />
    </ListItem>
  ));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <p className="sm:text-4xl text-2xl">Vendor Machine</p>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <>
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
                {/* account icon for profile  */}
                <AccountCircle />
              </IconButton>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
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
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {renderMobileMenuItems}
            {isLoggedIn && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    handleLogout();
                    handleDrawerToggle();
                  }}
                >
                  <ListItemText primary="Log out" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
