import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);

  function HandleClick() {
    setValue("X");
  }

  return (
    <button onClick={HandleClick} className="square">
      {value}
    </button>
  );
}

function Board() {
  return (
    <div className="board">
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}

export default Board;
