import { useEffect, useState } from "react";
import Surface from "./components/Surface";
import { query } from "firebase/firestore";
import { db } from "./util/firebase";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
  remove,
} from "firebase/database";

function App() {
  const [texts, setTexts] = useState([]);
  const [loading, handleLoading] = useState(true);
  const [local, setLocal] = useState(true);

  const delete_data = () => {
    const confirmation = window.confirm(
      "Are you sure you want to erase your board?"
    );
    if (confirmation) {
      handleLoading(true);
      const textsRef = ref(db, "texts");
      remove(textsRef)
        .then(() => {
          console.log("Data erased");
          handleLoading(false);
        })
        .catch((error) => {
          console.error("Error erasing data: ", error);
          handleLoading(false);
        });
    }
  };

  const set_local = () => {
    localStorage.setItem("local", !local);
    setLocal(!local);
  };

  useEffect(() => {
    handleLoading(true);
    if (localStorage.getItem("local")) {
      if (localStorage.getItem("local") === "true") {
        setLocal(true);
      } else if (localStorage.getItem("local") === "false") {
        setLocal(false);
      }
    } else {
      setLocal(true);
      localStorage.setItem("local", true);
    }
    handleLoading(false);
  }, [local]);

  useEffect(() => {
    const textsRef = ref(db, "texts");
    const newTextsQuery = query(textsRef);

    onChildRemoved(newTextsQuery, (snapshot) => {
      const removedTextId = snapshot.key;
      const removedTextDiv = document.getElementById(removedTextId);
      if (removedTextDiv) {
        removedTextDiv.remove();
      }
      setTexts((prevTexts) => {
        return prevTexts.filter((text) => text.id !== removedTextId);
      });
    });

    onChildAdded(newTextsQuery, (snapshot) => {
      const newText = { id: snapshot.key, ...snapshot.val() };
      setTexts((prevTexts) => {
        const existingText = prevTexts.find((text) => text.id === newText.id);
        if (existingText) {
          const updatedTexts = prevTexts.map((text) =>
            text.id === existingText.id ? newText : text
          );
          return updatedTexts;
        } else {
          return [...prevTexts, newText];
        }
      });
    });

    onChildChanged(newTextsQuery, (snapshot) => {
      setTexts((prevTexts) => {
        const updatedText = { id: snapshot.key, ...snapshot.val() };
        const updatedTexts = prevTexts.map((text) =>
          text.id === updatedText.id ? updatedText : text
        );
        return updatedTexts;
      });
    });
  }, []);

  return loading ? null : (
    <div style={style.container} id="container">
      <h1>
        {local} {local ? "LOCAL" : "ONLINE"}
      </h1>
      <div style={style.buttonContainer}>
        <button style={style.button} onClick={delete_data}>
          Erase
        </button>
        <button style={style.button} onClick={set_local}>
          {local ? "Go online" : "Go local"}
        </button>
      </div>
      <Surface local={local} />
      {local ? null : (
        <div>
          {texts.map((text) => (
            <div
              id={text.id}
              key={text.id}
              style={{
                position: "absolute",
                left: text.px + "px",
                top: text.py + "px",
                fontSize: text.size + "px",
              }}
            >
              {text.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const style = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    position: "absolute",
    right: 5,
    top: 15,
    flexDirection: "column",
  },
  button: {
    marginBottom: "10%",
  },
};

export default App;
