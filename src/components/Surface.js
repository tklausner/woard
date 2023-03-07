import { push, ref, set } from "firebase/database";
import React, { useRef, useEffect } from "react";
import { db } from "../util/firebase";

function Surface({ local, boardID }) {
  const newDivRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      const newDiv = document.createElement("div");
      newDiv.style.position = "absolute";
      newDiv.style.left = event.pageX + "px";
      newDiv.style.top = event.pageY + "px";
      newDiv.style.outline = "none";
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
            set(newTextRef, {
              text: text,
              px: parseInt(newDiv.style.left),
              py: parseInt(newDiv.style.top),
              size: parseInt(newDiv.style.fontSize),
            });
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
      });

      document.body.appendChild(newDiv);
      newDiv.focus();
    }
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [boardID, local]);

  return <div ref={newDivRef} />;
}

export default Surface;
