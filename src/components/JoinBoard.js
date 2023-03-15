import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinBoard() {
  const [boardID, setBoardID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardID) {
      navigate(`/${boardID}`);
    }
  };

  return (
    <div>
      <h2>Join a Board</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boardID">Enter the Board ID:</label>
        <input
          type="text"
          id="boardID"
          value={boardID}
          onChange={(e) => setBoardID(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinBoard;
