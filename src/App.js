import { useState, useEffect } from "react";
import Login from "./components/Login";
import View from "./components/View";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState(true);

  const handleLogin = (user) => {
    setUser(user);
    console.log(user);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
  };

  const handleZenMode = () => {
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
          <p>Loading...</p>
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
      </div>
    </Router>
  );
}

export default App;
