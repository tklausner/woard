import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

function Element({ text, deleteElement }) {
  const [hover, handleHover] = useState(false);

  const styles = {
    container: {
      position: "absolute",
      left: text.px + "px",
      top: text.py + "px",
      fontSize: text.size + "px",
      border: "1px solid",
      display: "flex",
      flexDirection: "column",
      borderColor: "transparent",
    },
    text: {
      margin: 0,
    },
    label: {
      fontSize: ".4em",
      margin: 0,
      color: "#3874CB",
    },
    trashIcon: {
      position: "absolute",
      top: -20.5,
      right: -20.5,
      color: "#ccc",
      cursor: "pointer",
    },
  };

  const hoverStyles = {
    ...styles.container,
    borderColor: "#ccc",
    cursor: "Default",
    padding: 10,
    paddingTop: 1,
    backgroundColor: "#eeea",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10,
  };

  return (
    <div
      id={text.id}
      key={text.id}
      style={hover ? hoverStyles : styles.container}
      onMouseEnter={() => {
        handleHover(true);
      }}
      onMouseLeave={() => {
        handleHover(false);
      }}
    >
      <IconButton
        style={hover ? styles.trashIcon : { display: "none" }}
        onClick={() => deleteElement(text.id)}
        disableRipple
      >
        <ClearIcon />
      </IconButton>

      <p style={styles.text}> {text.text}</p>
      <p style={styles.label}> {hover ? `@${text.username}` : null}</p>
    </div>
  );
}

export default Element;
