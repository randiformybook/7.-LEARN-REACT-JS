import { useState } from "react";

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);

  // function HandleClick() {
  //   setValue("X");
  // or setValue("O")depending on whose turn it is
  // }

  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}
//! JANGAN LUPA SELALU MEMULAI HURUF KAPITAL UNTUK NAMA FUNCTION DI REACTJS

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function HandleClick(i) {
    const newSquares = [...squares];
    newSquares[i] = "X";
    setSquares(newSquares);
  }

  return (
    <div className="board">
      <Square value={squares[0]} onSquareClick={() => HandleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => HandleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => HandleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => HandleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => HandleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => HandleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => HandleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => HandleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => HandleClick(8)} />
    </div>
  );
}

export default Board;
