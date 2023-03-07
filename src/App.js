import { useState } from "react";
import Login from "./components/Login";
import View from "./components/View";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
  };

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
    setLoading(false);
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <View boardID={user.uid} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
