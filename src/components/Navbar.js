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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from "@mui/icons-material/Public";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";

import { useParams } from "react-router-dom";

function Navbar({ local, userID, handleZenMode, handleLogout }) {
  const [open, setOpen] = useState(false);
  const [joinBoardID, setJoinBoardID] = useState("");
  const { _boardID } = useParams();
  const [boardID, setBoardID] = useState(_boardID);

  useEffect(() => {
    if (boardID === undefined) {
      // let id = name.substring(0, name.indexOf("@"));
      setBoardID(userID);
    }
  }, [boardID, userID]);

  const handleClickOpen = () => {
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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            edge="start"
            style={{
              flexGrow: 1,
            }}
            variant="h6"
          >
            @{boardID}'s Board
          </Typography>
          <IconButton color="inherit" aria-label="home" onClick={handleJoin}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleZenMode}>
            {local ? <WifiOffIcon /> : <WifiIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <PublicIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
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

export default Navbar;
