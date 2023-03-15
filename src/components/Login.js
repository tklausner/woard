import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Grid, Typography } from "@mui/material";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLogin(userCredential.user);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      onLogin(userCredential.user);
    } catch (error) {
      console.error("Error signing up: ", error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" sx={style.container} onSubmit={handleLogin}>
      <Typography m={5} variant="h1">
        BOARD
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {showSignUp && (
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
        />
      )}

      <Grid container spacing={2} marginTop={2}>
        <Grid columns={2} item xs={showSignUp ? 4 : 8}>
          {showSignUp ? (
            <Button
              onClick={() => setShowSignUp(false)}
              variant="outlined"
              fullWidth
            >
              Back
            </Button>
          ) : (
            <Button onClick={handleLogin} variant="contained" fullWidth>
              Log In
            </Button>
          )}
        </Grid>
        {showSignUp ? (
          <Grid item xs={8}>
            <Button
              onClick={handleSignup}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Create Account
            </Button>
          </Grid>
        ) : (
          <Grid item xs={4}>
            <Button
              onClick={() => setShowSignUp(true)}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Sign Up
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    margin: "auto",
    padding: 2,
    height: "70vh",
    minHeight: 420,
  },
};

export default Login;
