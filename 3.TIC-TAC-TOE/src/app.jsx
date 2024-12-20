import { useState } from "react";
import PropTypes from "prop-types";

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
Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const newSquares = [...squares];
    // Jika Kotak Tic Tac Toe sudah terisi X or O
    if (newSquares[i] || calculateTheWinner(squares)) return; //ini membuat ketika kotak (array di dalam square bukan null) makan akan di return tanpa menjalanin coding yang di bawahnya

    // if (xIsNext) newSquares[i] = "X";
    // else newSquares[i] = "O";
    // Logika, apabila Kondisi xIsNext === true, maka giliran X, dan apabila xIsNext === false, maka giliran O
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    // Stelah Giliran X atau O, waktu merubah setXIsNext dari false ke true, atau sebaliknya dari True ke False
    setXIsNext(!xIsNext);
    calculateTheWinner(newSquares);
  }

  return (
    <div className="board">
      {squares.map((squares, i) => (
        <Square key={i} value={squares} onSquareClick={() => handleClick(i)} />
      ))}
      {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} /> */}
    </div>
  );
}

export default Board;

function calculateTheWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Kondisi =>
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Jika [a] dan squares [a] sama dengan squares[b] dan squares [a] sama dengan squares[c] maka ini adalah pemenangnya
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(`Winner is: ${squares[a]}`);
      return squares[a];
    }
  }
  // Jika Kondisi tidak Sesuai=>
  console.log("No Winner yet");
  return false;
}
