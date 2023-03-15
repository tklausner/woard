import { useState, useEffect } from "react";
import Login from "./components/Login";
import View from "./components/View";
import JoinBoard from "./components/JoinBoard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (user) => {
    setUser(user);
    console.log(user);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
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
            <button onClick={handleLogout}>Logout</button>
            <Routes>
              <Route
                path="/"
                element={<View userID={user.uid} email={user.email} />}
              />
              <Route
                path="/:_boardID"
                element={<View userID={user.uid} email={user.email} />}
              />
              <Route path="/join" element={<JoinBoard />} />
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
