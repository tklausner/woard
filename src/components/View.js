import { useEffect, useState } from "react";
import Surface from "./Surface";
import { query } from "firebase/firestore";
import { db } from "../util/firebase";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
  remove,
} from "firebase/database";
import { useParams } from "react-router-dom";
import Element from "./Element";

function View({ userID, name, local, setLocal }) {
  const { _boardID } = useParams();
  const [texts, setTexts] = useState([]);
  const [loading, handleLoading] = useState(true);
  const [boardID, setBoardID] = useState(_boardID);

  useEffect(() => {
    if (boardID === undefined) {
      setBoardID(userID);
    }
  }, [boardID, userID]);

  const deleteElement = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this?"
    );
    if (confirmation) {
      handleLoading(true);
      const textsRef = ref(db, `${boardID}/${id}`);
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
  }, [local, setLocal]);

  useEffect(() => {
    const textsRef = ref(db, boardID);
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
  }, [boardID]);

  return loading ? null : (
    <div style={style.container} id="container">
      <Surface
        deleteElement={deleteElement}
        name={name}
        local={local}
        boardID={boardID}
        userID={userID}
      />
      {local ? null : (
        <div>
          {texts.map((text) => (
            <Element deleteElement={deleteElement} text={text} />
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

export default View;
