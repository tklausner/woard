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
import HelpIcon from "@mui/icons-material/Help";

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

  useEffect(() => {
    if (boardID === undefined) {
      let id = userID.substring(0, 6).toUpperCase();
      setBoardID(id);
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
      <AppBar position="fixed">
        <Toolbar>
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

          <IconButton color="inherit" onClick={handleZenMode}>
            {local ? <WifiOffIcon /> : <WifiIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <PublicIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleClickOpenHelp}>
            <HelpIcon />
          </IconButton>

          {/* <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton> */}
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
