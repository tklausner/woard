import { push, ref, set } from "firebase/database";
import { useEffect } from "react";
import { db } from "../util/firebase";

function Surface({ local, boardID, userID, name }) {
  useEffect(() => {
    function handleDocumentClick(event) {
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "BUTTON" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }
      const newDiv = document.createElement("div");

      newDiv.style.position = "absolute";
      newDiv.style.left = event.pageX + 10 + "px";
      newDiv.style.top = event.pageY + 10 + "px";
      newDiv.style.outline = "none";
      newDiv.style.border = "1px solid transparent";
      newDiv.style.cursor = "Default";
      newDiv.contentEditable = true;

      let fontSize = 16;
      if (localStorage.getItem("fontSize")) {
        fontSize = parseInt(localStorage.getItem("fontSize"));
      }
      newDiv.style.fontSize = fontSize + "px";

      const addText = async () => {
        const text = newDiv.textContent.trim();
        if (text) {
          try {
            const newTextRef = push(ref(db, boardID));
            const textData = {
              id: newTextRef.key, // Add the 'id' property to the textData object
              text: text,
              px: parseInt(newDiv.style.left),
              py: parseInt(newDiv.style.top),
              size: parseInt(newDiv.style.fontSize),
              user: userID,
              username: name,
            };
            set(newTextRef, textData);
          } catch (e) {
            console.error("Error adding text: ", e);
          }
        }
      };

      newDiv.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          newDiv.contentEditable = false;
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          fontSize += 2;
          newDiv.style.fontSize = fontSize + "px";
          localStorage.setItem("fontSize", fontSize);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          fontSize -= 2;
          newDiv.style.fontSize = fontSize + "px";
          localStorage.setItem("fontSize", fontSize);
        }
      });

      newDiv.addEventListener("blur", () => {
        newDiv.contentEditable = false;
        if (!local) {
          addText();
        }
        document.body.removeChild(newDiv);
      });

      document.body.appendChild(newDiv);

      newDiv.focus();
    }
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [boardID, local, name, userID]);

  return;
}

export default Surface;
