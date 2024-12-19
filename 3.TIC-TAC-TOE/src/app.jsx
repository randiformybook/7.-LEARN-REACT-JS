import { useState } from "react";

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);

  // function HandleClick() {
  //   setValue("X");
  // }

  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Jika Kotak Tic Tac Toe sudah terisi X or O
    if (newSquares[i] === true) return; //ini membuat ketika kotak (array di dalam square bukan null) makan akan di return tanpa menjalanin coding yang di bawahnya

    const newSquares = [...squares];
    // if (xIsNext) newSquares[i] = "X";
    // else newSquares[i] = "O";
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="board">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  );
}

export default Board;
