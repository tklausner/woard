import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";

import { useParams } from "react-router-dom";

function Navbar({
  handleClickOpenHelp,
  local,
  userID,
  handleZenMode,
  handleLogout,
}) {
  const [open, setOpen] = useState(false);
  const [joinBoardID, setJoinBoardID] = useState("");
  const { _boardID } = useParams();
  const [boardID, setBoardID] = useState(_boardID);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [navbarColor, setNavbarColor] = useState("#3f51b5");

  useEffect(() => {
    if (boardID === undefined) {
      let id = userID.substring(0, 6).toUpperCase();
      setBoardID(id);
    }
  }, [boardID, userID]);

  const handleClickOpen = (event) => {
    event.stopPropagation(); // Add this line to stop event
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoin = () => {
    if (joinBoardID || joinBoardID === "") {
      handleClose();
      window.location.href = `/${joinBoardID}`;
    }
  };

  const handleJoinBoardIDChange = (event) => {
    setJoinBoardID(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation(); // Add this line to stop event
  };

  const handleMenuClose = (e) => {
    e.stopPropagation(); // Add this line to stop event
    setAnchorEl(null);
  };

  const handleNavbarColorChange = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setNavbarColor(randomColor);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: navbarColor }}>
        <Toolbar onClick={handleNavbarColorChange}>
          {_boardID === undefined ? null : (
            <IconButton color="inherit" aria-label="home" onClick={handleJoin}>
              <HomeIcon />
            </IconButton>
          )}
          <Typography
            edge="start"
            style={{
              flexGrow: 1,
            }}
            variant="h6"
          >
            | #{boardID} |
          </Typography>

          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <MenuItem
              onClick={handleZenMode}
              style={hoveredButton === "zenMode" ? hoverMenuStyle : menuStyle}
            >
              <IconButton
                color="inherit"
                style={
                  hoveredButton === "zenMode" ? hoverButtonStyle : buttonStyle
                }
                onMouseEnter={() => setHoveredButton("zenMode")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {local ? <WifiOffIcon /> : <WifiIcon />}
              </IconButton>
            </MenuItem>
            <MenuItem
              onClick={handleClickOpen}
              style={hoveredButton === "public" ? hoverMenuStyle : menuStyle}
            >
              <IconButton
                color="inherit"
                style={
                  hoveredButton === "public" ? hoverButtonStyle : buttonStyle
                }
                onMouseEnter={() => setHoveredButton("public")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <PublicIcon />
              </IconButton>
            </MenuItem>
            <MenuItem
              onClick={handleClickOpenHelp}
              style={hoveredButton === "help" ? hoverMenuStyle : menuStyle}
            >
              <IconButton
                color="inherit"
                style={
                  hoveredButton === "help" ? hoverButtonStyle : buttonStyle
                }
                onMouseEnter={() => setHoveredButton("help")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <HelpIcon />
              </IconButton>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              style={hoveredButton === "logout" ? hoverMenuStyle : menuStyle}
            >
              <IconButton
                color="inherit"
                style={
                  hoveredButton === "logout" ? hoverButtonStyle : buttonStyle
                }
                onMouseEnter={() => setHoveredButton("logout")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <LogoutIcon />
              </IconButton>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join a Board</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              id="join-board-id"
              label="Board ID"
              variant="filled"
              size="small"
              onChange={handleJoinBoardIDChange}
              value={joinBoardID}
              style={{ flexGrow: 1, marginRight: 8 }}
            />
            <Button
              onClick={() => {
                handleJoin();
                handleClose();
              }}
              color="primary"
              variant="contained"
            >
              Join
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const buttonStyle = {
  borderRadius: "50%",
  border: "2px solid #fff",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.8)",
  transition: "background-color 0.2s, box-shadow 0.2s",
};

const hoverButtonStyle = {
  ...buttonStyle,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 3px 5px rgba(0, 0, 0, 0.3)",
};

const menuStyle = {
  padding: 0,
  paddingLeft: 5,
  paddingRight: 5,
  marginTop: 15,
  background: "transparent",
};

const hoverMenuStyle = {
  ...menuStyle,
  background: "transparent",
};

export default Navbar;
