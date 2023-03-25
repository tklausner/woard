import { useState, useEffect } from "react";
import Login from "./components/Login";
import View from "./components/View";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WifiIcon from "@mui/icons-material/Wifi";
import PublicIcon from "@mui/icons-material/Public";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState(true);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false);

  const handleClickOpenHelp = (event) => {
    event.stopPropagation();
    setWelcomeDialogOpen(true);
  };

  const handleLogin = (user) => {
    setUser(user);
    setWelcomeDialogOpen(true);
  };

  const handleCloseWelcomeDialog = () => {
    setWelcomeDialogOpen(false);
  };

  const handleLogout = (event) => {
    event.stopPropagation();
    const auth = getAuth();
    auth.signOut();
  };

  const handleZenMode = (event) => {
    event.stopPropagation();
    localStorage.setItem("local", !local);
    setLocal(!local);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {loading ? (
          <div style={styles.loadingContainer}>
            <CircularProgress />
          </div>
        ) : user ? (
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar
                      userID={user.uid}
                      name={user.displayName}
                      handleZenMode={handleZenMode}
                      local={local}
                      handleLogout={handleLogout}
                      handleClickOpenHelp={handleClickOpenHelp}
                    />
                    <View
                      local={local}
                      setLocal={setLocal}
                      userID={user.uid}
                      name={user.displayName}
                    />
                  </>
                }
              />
              <Route
                path="/:_boardID"
                element={
                  <>
                    <Navbar
                      userID={user.uid}
                      name={user.displayName}
                      handleZenMode={handleZenMode}
                      handleLogout={handleLogout}
                      local={local}
                      handleClickOpenHelp={handleClickOpenHelp}
                    />
                    <View
                      local={local}
                      setLocal={setLocal}
                      userID={user.uid}
                      name={user.displayName}
                    />
                  </>
                }
              />
            </Routes>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <Dialog
          open={welcomeDialogOpen}
          onClose={handleCloseWelcomeDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Welcome to Board</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              <strong>Post a message:</strong> Click anywhere and start typing.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Change font size:</strong> Use the up and down arrow keys.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Invite others:</strong> Share your 6 character code.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Join other boards:</strong> <PublicIcon /> Click the globe
              icon.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Go offline:</strong> <WifiIcon /> Click the Wi-Fi icon.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWelcomeDialog} color="primary">
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Router>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

export default App;
